import connect from "next-connect";

import { getLocationIdFromPlaceId, db } from "../../../lib/app/data-schema";
import { validateDriverSettings } from "../../../lib/app/util-validation";
import { sessionMiddleware } from "../../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    const {
      make = "",
      model = "",
      year = "",
      placeId = "",
      tags = [],
      maxDistance,
      status = 0,
    } = request.body;

    if (!request.user || !request.user.id) {
      return response
        .status(200)
        .json({ formError: "Authentication is required" });
    }

    const errors = validateDriverSettings({
      make,
      model,
      year,
      placeId,
      maxDistance,
    });

    if (Object.keys(errors).length) {
      response.status(200).json({ errors });
    }

    try {
      const locationId = await getLocationIdFromPlaceId(placeId);

      if (locationId === null) {
        response.status(200).json({
          errors: { placeIdError: "Service location seems to be invalid" },
        });
        return;
      }

      const existing = await db("driver_settings")
        .first("user_id")
        .where({ user_id: request.user.id });

      const data = {
        make,
        model,
        year,
        service_location: locationId,
        max_distance: maxDistance,
        status,
      };

      if (!existing) {
        await db("driver_settings").insert({
          ...data,
          user_id: request.user.id,
        });
      } else {
        await db("driver_settings")
          .update({ ...data })
          .where({ user_id: request.user.id });
      }

      response.status(200).json({ success: "Settings have been saved" });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: "An error has occured while attempting to save driver settings",
      });
    }
  })
  .get(async (request, response) => {
    if (!request.user || !request.user.id) {
      return response
        .status(200)
        .json({ formError: "Authentication is required" });
    }

    try {
      const settings = await db("driver_settings")
        .first(
          "make",
          "model",
          "year",
          "place_id as placeId",
          "city",
          "state",
          "max_distance as maxDistance"
        )
        .join("location", "service_location", "=", "location.id")
        .where({ user_id: request.user.id });

      console.log(settings);

      if (!settings) {
        return response.status(200).json({
          make: "",
          model: "",
          year: "",
          placeId: "",
          city: "",
          state: "",
          maxDistance: 0,
        });
      }
      return response.status(200).json({ ...settings });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: "An error has occured while attempting to fetch driver settings",
      });
    }
  });

import connect from "next-connect";
import moment from "moment";

import { db, getLocationFromPlaceId } from "../../../lib/app/data-schema";
import { getDrivingDistance } from "../../../lib/shared/util-google";
import { sessionMiddleware } from "../../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .get(async (request, response) => {
    if (!request.user || !request.user.id) {
      response.status(200).json({ formError: "Authentication is required" });
      return;
    }

    const { rideFrom, rideTo, rideTime, rideDate } = request.query;

    const day = moment(rideDate).day();
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    try {
      const rideFromLocation = await getLocationFromPlaceId(rideFrom);
      const rideToLocation = await getLocationFromPlaceId(rideTo);
      const rideLength = await getDrivingDistance(rideFrom, rideTo);

      const formattedTime = moment(`01/01/1970 ${rideTime}`).format("HH:mm:ss");

      const fetchedDrivers = await db("driver_settings")
        .select(
          "user.id as driverId",
          "first_name as firstName",
          "last_name as lastName",
          "make",
          "model",
          "year",
          "driver_fee as driverFee",
          "city",
          "state",
          "zip_code as zipCode"
        )
        .join(
          "driver_schedule",
          "driver_settings.user_id",
          "=",
          "driver_schedule.user_id"
        )
        .join("user", "driver_settings.user_id", "=", "user.id")
        .join("location", "service_location", "=", "location.id")
        .where(days[day], true)
        .andWhere("start_time", "<=", formattedTime)
        .andWhere("end_time", ">=", formattedTime)
        .andWhereNot("driver_settings.user_id", "=", request.user.id);

      const drivers = fetchedDrivers.map((driver) => ({
        driverId: driver.driverId,
        driverName: `${driver.firstName} ${driver.lastName}`,
        driverFee: driver.driverFee,
        driverVehicle: {
          make: driver.make,
          model: driver.model,
          year: driver.year,
        },
        driverLocation: {
          city: driver.city,
          state: driver.state,
          zipCode: driver.zipCode,
        },
      }));

      response.status(200).json({
        rideFrom: { ...rideFromLocation, placeId: rideFrom },
        rideTo: { ...rideToLocation, placeId: rideTo },
        rideTime,
        rideDate,
        rideLength,
        drivers,
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "An error has occurred while location drivers" });
    }
  });

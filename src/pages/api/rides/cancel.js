import connect from "next-connect";

import { sessionMiddleware } from "../../../lib/shared/util-session";
import { db } from "../../../lib/app/data-schema";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    if (!request.user || !request.user.id) {
      response.status(200).json({ error: "Authentication is required" });
      return;
    }

    const { rideId = 0 } = request.body;

    try {
      const ride = await db("ride")
        .first("user_id as userId", "driver_id as driverId")
        .where({ id: rideId });

      if (!ride) {
        response
          .status(200)
          .json({ error: "The specified ride does not exist" });
        return;
      }

      const cancelType =
        ride.userId === request.user.id
          ? { ride_status: -1 }
          : ride.driverId === request.user.id
          ? { ride_status: -2 }
          : null;

      if (cancelType === null) {
        response.status(200).json({
          error: "You do not have permission to perform this action",
        });
        return;
      }

      await db("ride").update(cancelType).where({ id: rideId });
      response.status(200).json({
        success:
          cancelType.ride_status === -1
            ? "Ride has been canceled"
            : "Ride has been rejected",
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "An error has occurred while processing your request" });
    }
  });

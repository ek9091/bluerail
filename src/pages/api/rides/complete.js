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
        .first("id")
        .where({ id: rideId, driver_id: request.user.id });

      if (!ride) {
        response
          .status(200)
          .json({ error: "The specified ride does not exist" });
        return;
      }

      await db("ride")
        .update({ ride_status: 1, payment_status: 1 })
        .where({ id: rideId });
      response.status(200).json({
        success: "Ride has been marked as completed",
      });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "An error has occurred while processing your request" });
    }
  });

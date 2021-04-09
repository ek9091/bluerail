import connect from "next-connect";
import moment from "moment";

import { sessionMiddleware } from "../../../lib/shared/util-session";
import { db } from "../../../lib/app/data-schema";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    if (!request.user || !request.user.id) {
      response.status(200).json({ formError: "Authentication is required" });
      return;
    }

    const {
      driverId,
      driverFee,
      fromId,
      toId,
      rideTime,
      rideDate,
      rideLength,
      amount,
    } = request.body;

    try {
      await db("ride").insert({
        user_id: request.user.id,
        driver_id: driverId,
        driver_fee: driverFee,
        from_id: fromId,
        to_id: toId,
        ride_time: moment(`01/01/1970 ${rideTime}`).format("hh:ss:mm"),
        ride_date: moment(rideDate).format("YYYY-MM-DD"),
        ride_length: rideLength,
        amount,
      });

      response
        .status(200)
        .json({ success: "Your ride request has been submitted" });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ error: "An error has occurred while processing request" });
    }
  });

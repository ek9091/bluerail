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
        ride_time: moment(`01/01/1970 ${rideTime}`).format("HH:ss:mm"),
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
  })
  .get(async (request, response) => {
    if (!request.user || !request.user.id) {
      response.status(200).json({ formError: "Authentication is required" });
      return;
    }

    const { driver = 0, history = 0 } = request.query;

    const as = driver === "true" ? "driver_id" : "user_id";

    try {
      const data = await db("ride")
        .select(
          "ride.id as rideId",
          "user.id as userId",
          "user.first_name as userFirstName",
          "user.last_name as userLastName",
          "driver.id as driverId",
          "driver.first_name as driverFirstName",
          "driver.last_name as driverLastName",
          "from.street as fromStreet",
          "from.city as fromCity",
          "from.state as fromState",
          "from.zip_code as fromZipCode",
          "to.street as toStreet",
          "to.city as toCity",
          "to.state as toState",
          "to.zip_code as toZipCode",
          "ride_length as rideLength",
          "driver_fee as driverFee",
          "ride_date as rideDate",
          "ride_time as rideTime",
          "amount",
          "ride_status as rideStatus",
          "payment_status as paymentStatus"
        )
        .join("user", "ride.user_id", "=", "user.id")
        .join("user as driver", "ride.driver_id", "=", "driver.id")
        .join("location as to", "ride.to_id", "=", "to.id")
        .join("location as from", "ride.from_id", "=", "from.id")
        .where(as, "=", request.user.id)
        .where("ride_status", history === "false" ? "=" : "!=", 0)
        .orderBy("ride.updated_at", "desc");

      const rides = data.map((ride) => ({
        rideId: ride.rideId,
        userName: `${ride.userFirstName} ${ride.userLastName}`,
        driver: {
          driverName: `${ride.driverFirstName} ${ride.driverLastName}`,
          driverFee: ride.driverFee,
        },
        rideFrom: {
          street: ride.fromStreet,
          city: ride.fromCity,
          state: ride.fromState,
          zipCode: ride.fromZipCode,
        },
        rideTo: {
          street: ride.toStreet,
          city: ride.toCity,
          state: ride.toCity,
          zipCode: ride.toZipCode,
        },
        rideDate: ride.rideDate,
        rideTime: ride.rideTime,
        rideLength: ride.rideLength,
        amount: ride.amount,
      }));

      response.status(200).json([...rides]);
    } catch (error) {
      console.error(error);
      response.json(500).json();
    }
  });

import connect from "next-connect";
import moment from "moment";

import { db } from "../../../lib/app/data-schema";
import { validateSchedule } from "../../../lib/app/util-validation";
import { sessionMiddleware } from "../../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    const { startTime, endTime, days } = request.body;

    if (!request.user || !request.user.id) {
      return response
        .status(200)
        .json({ formError: "Authentication is required" });
    }

    const errors = validateSchedule({
      startTime,
      endTime,
      days,
    });

    if (Object.keys(errors).length) {
      response.status(200).json({ errors });
      return;
    }

    const formattedStartTime = moment(`01/01/1970 ${startTime}`).format(
      "HH:mm:ss"
    );
    const formattedEndTime = moment(`01/01/1970 ${endTime}`).format("HH:mm:ss");

    let scheduledDays = {};

    Object.keys(days).forEach((day) => {
      if (days[day]) {
        scheduledDays[day] = true;
      }
    });

    const conflicts = await db("driver_schedule")
      .select("id")
      .where(function () {
        Object.keys(scheduledDays).forEach((day) => {
          this.orWhere(day, "=", true);
        });
      })
      .where(function () {
        this.where(function () {
          this.where("start_time", "<=", formattedStartTime).andWhere(
            "end_time",
            ">=",
            formattedStartTime
          );
        }).orWhere(function () {
          this.where("start_time", "<=", formattedEndTime).andWhere(
            "end_time",
            ">=",
            formattedEndTime
          );
        });
      });

    if (conflicts && conflicts.length > 0) {
      response.status(200).json({
        errors: {
          formError: "The provided updates conflict with your current schedule",
        },
      });
      return;
    }

    try {
      await db("driver_schedule").insert({
        user_id: request.user.id,
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        ...days,
      });

      response.status(200).json({ success: "Your schedule has been updated" });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: "An error has occured while attempting to update schedule",
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
      const schedule = await db("driver_schedule")
        .select(
          "id",
          "start_time as startTime",
          "end_time as endTime",
          "sunday",
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday"
        )
        .where({ user_id: request.user.id });

      if (!schedule || schedule.length === 0) {
        response.status(200).json([]);
        return;
      }

      response.status(200).json(
        schedule.map((row) => ({
          ...row,
          startTime: moment(`01/01/1970 ${row.startTime}`).format("h:mm a"),
          endTime: moment(`01/01/1970 ${row.endTime}`).format("h:mm a"),
        }))
      );
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error: "An error has occured while attempting to fetch driver schedule",
      });
    }
  })
  .delete(async (request, response) => {
    if (!request.user || !request.user.id) {
      return response
        .status(200)
        .json({ formError: "Authentication is required" });
    }

    try {
      const { scheduleId } = request.body;

      await db("driver_schedule")
        .where({ user_id: request.user.id, id: scheduleId })
        .del();

      response.status(200).json({
        success: "schedule has been deleted",
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({
        error:
          "An error has occured while attempting to delete driver schedule",
      });
    }
  });

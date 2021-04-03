import connect from "next-connect";

import { db } from "../../../lib/app/data-schema";
import { sessionMiddleware } from "../../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .get(async (request, response) => {
    const { error, id } = request.user;

    if (error !== undefined) {
      response.status(200).json({ error });
      return;
    }

    const application = await db("application")
      .first("id", "status")
      .where({ user_id: id });

    if (application) {
      const { status } = application;

      response.status(200).json({
        status:
          status === 1 ? "APPROVED" : status === -1 ? "REJECTED" : "PENDING",
      });
      return;
    }

    response.status(200).json({ status: "NO_APPLICATION" });
  });

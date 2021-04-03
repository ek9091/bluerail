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

    const existing = await db("application").first("id").where({ user_id: id });

    if (existing) {
      response.status(200).json({ exists: true });
      return;
    }

    response.status(200).json({ exists: false });
  });

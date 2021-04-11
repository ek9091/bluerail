import connect from "next-connect";

import { db } from "../../../lib/app/data-schema";
import { sessionMiddleware } from "../../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    const {
      license,
      history,
      background,
      firstRefName,
      firstRefPhone,
      firstRefEmail,
      secRefName,
      secRefPhone,
      secRefEmail,
    } = request.body;

    const { error, id } = request.user;

    if (error !== undefined) {
      return response.status(200).json({ error });
    }

    const existing = await db("application").first("id").where({ user_id: id });

    if (existing) {
      response
        .status(200)
        .json({ error: "An application has already been received" });
      return;
    }

    await db("application").insert({
      user_id: id,
      license,
      history,
      background,
      ref1_name: firstRefName,
      ref1_phone: firstRefPhone.replace(/[^\d]/g, ""),
      ref1_email: firstRefEmail,
      ref2_name: secRefName,
      ref2_phone: secRefPhone.replace(/[^\d]/g, ""),
      ref2_email: secRefEmail,
    });

    response.status(200).json({ message: "Application has been received" });
  });

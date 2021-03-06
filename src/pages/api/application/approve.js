import connect from "next-connect";

import { db } from "../../../lib/app/data-schema";

export default connect().post(async (request, response) => {
  const { userId } = request.body;

  await db("application").update({ status: 1 }).where({ user_id: userId });

  const role = await db("role")
    .first("id")
    .where({ user_id: userId, role: "driver" });

  if (!role) {
    await db("role").insert({ user_id: userId, role: "driver" });
  }

  response.status(200).json({ message: "application has been approved" });
});

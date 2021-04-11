import connect from "next-connect";

import { db } from "../../../lib/app/data-schema";

export default connect().post(async (request, response) => {
  const { userId } = request.body;

  await db("application").update({ status: -1 }).where({ user_id: userId });
  await db("role").where({ user_id: userId, role: "driver" }).del();

  response.status(200).json({ message: "application has been rejected" });
});

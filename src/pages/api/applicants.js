import connect from "next-connect";

import { db } from "../../lib/app/data-schema";

export default connect().get(async (_, response) => {
  const applicants = await db("user")
    .select(
      "first_name as firstName",
      "last_name as lastName",
      "application.id as applicationId"
    )
    .join("application", "user.id", "=", "user_id");

  response.status(200).json([...applicants]);
});

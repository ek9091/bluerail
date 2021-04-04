import connect from "next-connect";

import { db } from "../../../../lib/app/data-schema";

export default connect().get(async (request, response) => {
  const { query = "" } = request.query;

  if (query === "") {
    response.status(200).json([]);
    return;
  }

  if (query.match(/^\S+@\S+\.\S+$/)) {
    const users = await db("user")
      .select("id", "first_name as firstName", "last_name as lastName")
      .where({ email: query });

    response.status(200).json([...users]);
    return;
  }

  const users = await db("user")
    .select("id", "first_name as firstName", "last_name as lastName")
    .whereRaw("concat(first_name, ' ', last_name) like ?", `%${query}%`);

  response.status(200).json([...users]);
});

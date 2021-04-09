import connect from "next-connect";
import bcrypt from "bcrypt";

import { db } from "../../lib/app/data-schema";
d;

export default connect().post(async (request, response) => {
  const {
    firstName: first_name,
    lastName: last_name,
    email,
    password,
  } = request.body;

  try {
    const existing = await db("user").select("id").where({ email });

    if (existing.length) {
      response
        .status(200)
        .json({ error: "Provided email address already exist" });
      return;
    }

    const hash = await bcrypt.hash(password, 10);
    await db("user").insert({ first_name, last_name, email, hash });

    response.status(200).json({});
  } catch (error) {
    console.error(error);

    response.status(500).json({
      error: "An error has occurred while trying to process your request",
    });
  }
});

import connect from "next-connect";
import bcrypt from "bcrypt";

import { createSessionMiddleware } from "../../lib/shared/util-session";
import { db } from "../../lib/app/data";

const invalidError = { error: "Invalid email/password combination" };

async function authenticate(request) {
  const { email, password } = request.body;

  if (!email || !password) {
    return invalidError;
  }

  const user = await db("user")
    .first("id", "email", "hash", "first_name", "last_name")
    .where({ email });

  if (user && (await bcrypt.compare(password, user["hash"]))) {
    delete user.hash;
    return {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
      },
    };
  }

  return invalidError;
}

export default connect()
  .use(createSessionMiddleware(authenticate))
  .post((request, response) => {
    const { error = null } = request.user;
    response.status(200).json(error !== null ? { error } : { ...request.user });
  });

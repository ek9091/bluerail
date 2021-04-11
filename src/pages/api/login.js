import connect from "next-connect";
import bcrypt from "bcrypt";

import { createSessionMiddleware } from "../../lib/shared/util-session";
import { db } from "../../lib/app/data-schema";

const invalidError = { error: "Invalid email/password combination" };

async function authenticate(request) {
  const { email, password } = request.body;

  if (!email || !password) {
    return invalidError;
  }

  try {
    const userData = await db("user")
      .select(
        "user.id as userId",
        "email",
        "hash",
        "first_name",
        "last_name",
        "role"
      )
      .leftJoin("role", "role.user_id", "=", "user.id")
      .where({ email });

    if (!userData || userData.length === 0) {
      return invalidError;
    }

    const user = userData.reduce((user, current, index) => {
      if (index === 0) {
        return {
          id: current.userId,
          firstName: current.first_name,
          lastName: current.last_name,
          email: current.email,
          hash: current.hash,
          roles: current.role ? [current.role] : [],
        };
      }

      user.roles.push(current.role);
      return user;
    }, {});

    if (user && (await bcrypt.compare(password, user["hash"]))) {
      delete user.hash;
      return { user };
    }

    return invalidError;
  } catch (error) {
    console.error(error);
    response
      .status(500)
      .json({ error: "An error has occurred while processing your request." });
  }
}

export default connect()
  .use(createSessionMiddleware(authenticate))
  .post((request, response) => {
    const { error = null } = request.user;

    response
      .status(200)
      .json(error !== null ? { error } : { user: request.user });
  });

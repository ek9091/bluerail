import connect from "next-connect";

import { sessionMiddleware } from "../../../lib/shared/util-session";
import { db } from "../../../lib/app/data-schema";

export default connect()
  .use(sessionMiddleware())
  .post(async (request, response) => {
    const { userId, isDriver, isEmployee, isAdministrator } = request.body;

    console.log(request);

    if (!request.user || !request.user.id) {
      return response
        .status(200)
        .json({ formError: "Authentication is required" });
    }

    await db("role").where({ user_id: userId }).del();

    const rolesMap = {
      administrator: isAdministrator,
      employee: isEmployee,
      driver: isDriver,
    };

    try {
      let roles = [];

      Object.keys(rolesMap).forEach((role) => {
        if (!rolesMap[role]) return;

        roles.push({
          user_id: userId,
          role,
        });
      });

      if (roles.length) {
        await db("role").insert(roles);
      }

      response.status(200).json({ success: "User has been saved" });
    } catch (error) {
      console.error(error);
      response
        .status(500)
        .json({ formError: "An error has occurred while saving user" });
    }
  });

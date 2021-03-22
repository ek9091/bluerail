import connect from "next-connect";

import { createSessionMiddleware } from "../../lib/shared/util-session";

async function authenticate(request) {
  return {
    error: "invalid username/password combintation",
  };
}

export default connect()
  .use(createSessionMiddleware(authenticate))
  .post(function (request, response) {
    const { user } = request;

    if (Boolean(user) && user.error === undefined) {
      response.status(200).json({ user });
      return;
    }

    response.status(401).json({
      error: user.error !== undefined ? user.error : "unauthorized access",
    });
  });

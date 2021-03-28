import connect from "next-connect";

import { sessionMiddleware } from "../../lib/shared/util-session";

export default connect()
  .use(sessionMiddleware())
  .get((request, response) => {
    const { error = null } = request.user;

    response.status(200).json(error !== null ? { error } : { ...request.user });
  });

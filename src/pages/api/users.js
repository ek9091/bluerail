import connect from "next-connect";

import users from "../../../data/users.json";

export default connect().get((request, response) => {
  response.status(200).json(users);
});

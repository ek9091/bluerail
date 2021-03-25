import connect from "next-connect";

import rides from "../../../data/rides.json";

export default connect().post((request, response) => {
  response.json(rides);
});

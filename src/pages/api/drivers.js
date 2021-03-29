import connect from "next-connect";

import drivers from "../../../data/drivers.json";

export default connect().post((request, response) => {
  response.status(200).json(drivers);
});

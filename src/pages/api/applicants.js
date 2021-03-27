import connect from "next-connect";

import applicants from "../../../data/applications.json";

export default connect().get((request, response) => {
  response.json(applicants);
});

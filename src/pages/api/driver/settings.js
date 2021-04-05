import connect from "next-connect";

import { getLocationIdFromPlaceId } from "../../../lib/app/data-schema";

export default connect().post(async (request, response) => {
  const { placeId } = request.body;

  const locationId = await getLocationIdFromPlaceId(placeId);

  response.status(200).json({ locationId });
});

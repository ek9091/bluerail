import { db } from "./";
import {
  fetchPlaceDetails,
  getLocationFromAddressComponents,
} from "../../shared/util-google";

export async function getLocationIdFromPlaceId(placeId) {
  const storedLocation = await db("location")
    .first("id")
    .where({ place_id: placeId });

  if (storedLocation) {
    return storedLocation.id;
  } else {
    const details = await fetchPlaceDetails(placeId);

    if (
      !details.result ||
      !details.result.address_components ||
      !details.result.geometry
    ) {
      return null;
    }

    const { street, city, state, zipCode } = getLocationFromAddressComponents(
      details.result.address_components
    );

    const { lat: latitude, lng: longitude } = details.result.geometry.location;

    const [id] = await db("location").insert({
      place_id: placeId,
      street,
      city,
      state,
      zip_code: zipCode,
      latitude,
      longitude,
    });

    return id;
  }
}

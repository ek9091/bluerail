import axios from "axios";

const url = "https://maps.googleapis.com/maps/api";
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API;

export const fetchPlaceDetails = async (placeId) => {
  const response = await axios.get(
    `${url}/place/details/json?place_id=${placeId}&fields=address_components,geometry&key=${apiKey}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch google maps data");
  }

  return response.data;
};

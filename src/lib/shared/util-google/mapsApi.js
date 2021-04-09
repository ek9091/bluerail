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

export const getDrivingDistance = async (pointA, pointB) => {
  const response = await axios.get(
    `${url}/directions/json?origin=place_id:${pointA}&destination=place_id:${pointB}&key=${apiKey}`
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data for driving distance");
  }

  if (
    response.data.routes &&
    response.data.routes.length > 0 &&
    response.data.routes[0].legs &&
    response.data.routes[0].legs.length > 0 &&
    response.data.routes[0].legs[0]
  ) {
    return parseFloat(
      parseFloat(
        response.data.routes[0].legs[0].distance.value * 0.000621371
      ).toFixed(2)
    );
  }

  return 0;
};

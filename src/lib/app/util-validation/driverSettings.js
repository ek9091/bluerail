export function validateDriverSettings(settings) {
  const { make, model, year, placeId, maxDistance } = settings;
  let errors = {};

  if (make === "") {
    errors.makeError = "The make is required";
  } else if (!make.match(/^[\w\s-]+$/i)) {
    errors.makeError = "Make can only contain letters";
  } else if (make.length > 30) {
    errors.makeError = "Make can be at most 30 characters";
  }

  if (model === "") {
    errors.modelError = "The model is requird";
  } else if (!model.match(/^[\w\s-]+$/i)) {
    errors.modelError = "Model can only contain letters, numbers, -, or _";
  } else if (model.length > 30) {
    errors.modelError = "Model can be at most 30 characters";
  }

  if (year === "") {
    errors.yearError = "The year is required";
  } else if (!year.match(/^\d{4}$/)) {
    errors.yearError = "Year appear to be invalid.  IE: 2021";
  }

  if (placeId === "") {
    errors.placeIdError = "A service location is required";
  } else if (!placeId.match(/^[\w\d-]+$/i)) {
    errors.placeIdError = "Service location appears to be invalid";
  }

  const parsedDistance = parseInt(maxDistance);

  if (parsedDistance === 0) {
    errors.maxDistanceError = "Max distance is required";
  } else if (parsedDistance < 1 || parsedDistance > 9999) {
    errors.maxDistanceError = "Max distance must be between 1 and 9999";
  }

  return errors;
}

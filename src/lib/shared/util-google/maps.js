export const getLocationFromAddressComponents = (address) => {
  const numberTypes = ["street_number"];
  const streetTypes = ["street_address", "route"];
  const cityTypes = [
    "sublocality_level_4",
    "sublocality_level_3",
    "sublocality_level_2",
    "sublocality_level_1",
    "sublocality",
    "locality",
  ];

  const stateTypes = ["administrative_area_level_1"];
  const zipCodeTypes = ["postal_code"];

  const number = _getAddressComponentType(address, numberTypes);
  const route = _getAddressComponentType(address, streetTypes);

  const streetAddress =
    number !== null && route !== null
      ? `${number.short_name} ${route.short_name}`
      : route !== null
      ? route.short_name
      : null;

  const city = _getAddressComponentType(address, cityTypes);
  const state = _getAddressComponentType(address, stateTypes);
  const zipCode = _getAddressComponentType(address, zipCodeTypes);

  return {
    streetAddress,
    city: city !== null ? city.short_name : "",
    state: state !== null ? state.short_name : "",
    zipCode: zipCode !== null ? zipCode.short_name : "",
  };
};

const _getAddressComponentType = (address, componentTypes) => {
  for (const typeKey in componentTypes) {
    for (const componentKey in address) {
      if (address[componentKey].types.includes(componentTypes[typeKey])) {
        return { ...address[componentKey] };
      }
    }
  }

  return null;
};

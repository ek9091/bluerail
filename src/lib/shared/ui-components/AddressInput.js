import React, { useEffect, forwardRef, useRef, useState } from "react";

import { useGoogleMaps } from "../util-hooks";

export const AddressInput = forwardRef((props, ref) => {
  const {
    id,
    type,
    label = "",
    error = "",
    defaultStreet = "",
    defaultPlace = "",
  } = props;
  const [street, setStreet] = useState(defaultStreet);
  const [placeId, setPlaceId] = useState(defaultPlace);
  const [isFocused, setIsFocused] = useState(defaultStreet.length > 0);
  const { isMapsReady } = useGoogleMaps();
  const autocomplete = useRef(null);

  useEffect(() => {
    if (!isMapsReady) return;

    const types = type === "city" ? "(cities)" : "address";

    const options = {
      componentRestrictions: { country: "us" },
      fields: ["place_id", "name"],
      types: [types],
    };

    autocomplete.current = new google.maps.places.Autocomplete(
      document.getElementById(id),
      options
    );

    autocomplete.current.addListener("place_changed", () => {
      const {
        place_id: placeId = null,
        name,
      } = autocomplete.current.getPlace();
      if (placeId === null) return;
      setPlaceId(placeId);
      setStreet(name);
    });
  }, [isMapsReady]);

  const classes = `${
    isFocused
      ? "text-sm top-0 translate-y-0 text-blue opacity-70"
      : "text-md top-1/2 -translate-y-1/2 opacity-40"
  }`;

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    if (placeId.length === 0) {
      setStreet(defaultStreet);
      setPlaceId(defaultPlace);
      setIsFocused(defaultStreet.length > 0);
    }
  }

  function handleChange(evt) {
    setStreet(evt.target.value);
    setPlaceId("");
  }

  return (
    <>
      <div className="relative h-14 mb-4 bg-gray rounded-md">
        <input type="hidden" ref={ref} value={placeId} />
        <label
          htmlFor={id}
          className={`absolute transform px-4 pt-1 transition-all cursor-text ${classes}`}
        >
          {label}
        </label>
        <input
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="h-full w-full px-4 pt-5 pb-1 bg-transparent outline-none"
          id={id}
          placeholder="&nbsp;"
          value={street}
        />
      </div>
      {error !== "" && (
        <div className="-mt-4">
          <FormError message={error} />
        </div>
      )}
    </>
  );
});

export default AddressInput;

import React, { createRef, useState } from "react";

import {
  Button,
  AddressInput,
  TimeInput,
  DateInput,
} from "../../shared/ui-components";

export const RequestRideForm = ({ onRideRequest }) => {
  const currentRef = createRef();
  const destinationRef = createRef();
  const timeRef = createRef();
  const dateRef = createRef();
  const [errors, setErrors] = useState({});

  const handleRideRequest = async (evt) => {
    evt.preventDefault();

    const current = currentRef.current.value;
    const destination = destinationRef.current.value;
    const time = timeRef.current.value;
    const date = dateRef.current.value;

    let currentErrors = {};

    if (current === "") {
      currentErrors.current = "Your current location is required";
    }

    if (destination === "") {
      currentErrors.destination = "Your destination is required";
    }

    if (date === "") {
      currentErrors.date = "The ride date is required";
    }

    if (time === "") {
      currentErrors.time = "The ride time is required";
    }

    if (!Object.keys(currentErrors).length) {
      currentErrors = await onRideRequest({
        rideFrom: current,
        rideTo: destination,
        rideDate: date,
        rideTime: time,
      });
    }

    setErrors(currentErrors);
  };

  return (
    <form onSubmit={handleRideRequest}>
      <AddressInput
        label="Enter current location"
        ref={currentRef}
        defaultStreet=""
        defaultPlace=""
        error={errors.current}
        id="currentLocation"
      />
      <AddressInput
        label="Enter your destination"
        ref={destinationRef}
        defaultStreet=""
        defaultPlace=""
        error={errors.destination}
        id="destination"
      />
      <div className="flex space-x-4">
        <div className="w-1/2">
          <DateInput label="Enter your ride date" ref={dateRef} />
        </div>
        <div className="w-1/2">
          <TimeInput label="Enter your ride time" ref={timeRef} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-grow">
          {errors.formError && (
            <p className="text-center text-red">{errors.formError}</p>
          )}
        </div>
        <Button type="submit" label="Find a driver" />
      </div>
    </form>
  );
};

export default RequestRideForm;

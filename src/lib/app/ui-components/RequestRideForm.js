import React, { createRef, useState } from "react";

import { TextInput, Button } from "../../shared/ui-components";

export const RequestRideForm = ({ onRideRequest }) => {
  const currentRef = createRef();
  const destinationRef = createRef();
  const timeRef = createRef();
  const [errors, setErrors] = useState({});

  const handleRideRequest = async (evt) => {
    evt.preventDefault();

    const current = currentRef.current.value;
    const destination = destinationRef.current.value;
    const time = timeRef.current.value;

    let currentErrors = {};

    if (current === "") {
      currentErrors.current = "Your current location is required";
    }

    if (destination === "") {
      currentErrors.destination = "Your destination is required";
    }

    if (time === "") {
      currentErrors.time = "Time to leave is required";
    }

    if (!Object.keys(currentErrors).length) {
      currentErrors = await onRideRequest({
        rideFrom: current,
        rideTo: destination,
        rideTime: time,
      });
    }

    setErrors(currentErrors);
  };

  return (
    <form onSubmit={handleRideRequest}>
      <TextInput
        label="Enter current location"
        ref={currentRef}
        value="1871 Old Main Dr, Shippensburg, PA 17257"
        error={errors.current}
      />
      <TextInput
        label="Enter your destination"
        ref={destinationRef}
        value="100 Conestoga Dr, Shippensburg, PA 17257"
        error={errors.destination}
      />
      <TextInput
        label="Enter your time to leave"
        ref={timeRef}
        value="01/01/2021 - 2:00pm"
        error={errors.time}
      />
      <div className="text-right">
        <span className="text-red mr-4">Just submit default input for now</span>
        <Button type="submit" label="Find a driver" />
      </div>
    </form>
  );
};

export default RequestRideForm;

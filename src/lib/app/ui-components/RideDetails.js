import React from "react";

import { Hr } from "../../shared/ui-components";
import { DriverDetails } from "./";

export const RideDetails = ({ data, longform = false }) => {
  const { rideFrom, rideTo, rideTime, driver } = data;

  const DetailsRow = ({ label, value }) => {
    return (
      <p className="mb-4">
        <span className="inline-block w-12 text-right mr-4 text-sm uppercase text-med-blue">
          {label}:
        </span>{" "}
        {value}
      </p>
    );
  };

  const driversFee = driver.driverFee.toLocaleString("USD", {
    style: "currency",
    currency: "USD",
  });

  let rideDetails = (
    <>
      {longform && (
        <>
          <h3 className="text-med-gray uppercase text-xs">Ride details</h3>
          <Hr />
        </>
      )}
      <DetailsRow label="From" value={rideFrom} />
      <DetailsRow label="To" value={rideTo} />
      <DetailsRow label="Time" value={rideTime} />
    </>
  );

  const driverDetails = (
    <>
      {!longform ? (
        <>
          <DetailsRow label="Driver" value={driver.driverName} />
          <DetailsRow label="Fee" value={`${driversFee} /mile`} />
        </>
      ) : (
        <>
          <h3 className="text-med-gray uppercase text-xs mt-8">
            Driver details
          </h3>
          <Hr />
          <DriverDetails driver={driver} />
        </>
      )}
    </>
  );

  return (
    <>
      {rideDetails}
      {driverDetails}
    </>
  );
};

export default RideDetails;

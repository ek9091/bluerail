import React from "react";

import { Hr } from "../../shared/ui-components";
import { DriverDetails } from "./";

export const RideDetails = ({ data, longform = false, driverView }) => {
  const { rideFrom, rideTo, rideTime, driver, studentName } = data;

  const DetailsRow = ({ label, value }) => {
    return (
      <p className="mb-4">
        <span
          className={`inline-block text-right mr-4 text-sm uppercase text-med-blue ${
            driverView ? "w-16" : "w-12"
          }`}
        >
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
      {!driverView && driverDetails}
      {driverView && <DetailsRow label="Student" value={studentName} />}
    </>
  );
};

export default RideDetails;

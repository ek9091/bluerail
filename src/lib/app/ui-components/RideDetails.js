import React from "react";
import moment from "moment";

import { Hr } from "../../shared/ui-components";
import { DriverDetails } from "./";

export const RideDetails = ({ data, longform = false, driverView }) => {
  const { rideFrom, rideTo, rideTime, rideDate, driver, userName } = data;

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
      <DetailsRow
        label="From"
        value={`${rideFrom.street}, ${rideFrom.city} ${rideFrom.zipCode}`}
      />
      <DetailsRow
        label="To"
        value={`${rideTo.street}, ${rideTo.city} ${rideTo.zipCode}`}
      />
      <DetailsRow label="Date" value={moment(rideDate).format("MM/DD/YYYY")} />
      <DetailsRow
        label="Time"
        value={moment(`01/01/1970 ${rideTime}`).format("h:mm a")}
      />
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
      {driverView && <DetailsRow label="Student" value={userName} />}
    </>
  );
};

export default RideDetails;

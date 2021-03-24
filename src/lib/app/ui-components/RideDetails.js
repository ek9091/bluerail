import React from "react";

import { Hr } from "../../shared/ui-components";
import { DriverDetails } from "./";

export const RideDetails = ({ data }) => {
  const { current, destination, time, driver, rideLength } = data;

  const DetailsRow = ({ label, value }) => {
    return (
      <p className="mb-4">
        <span className="inline-block w-10 text-right font-bold mr-4">
          {label}:
        </span>{" "}
        {value}
      </p>
    );
  };

  const driversFee = driver.feePerMile.toLocaleString("USD", {
    style: "currency",
    currency: "USD",
  });
  const totalFee = parseFloat(rideLength * driver.feePerMile).toLocaleString(
    "USD",
    {
      style: "currency",
      currency: "USD",
    }
  );

  return (
    <>
      <h3 className="text-med-gray uppercase text-xs">Ride details</h3>
      <Hr />
      <DetailsRow label="From" value={current} />
      <DetailsRow label="To" value={destination} />
      <DetailsRow label="Time" value={time} />
      <h3 className="text-med-gray uppercase text-xs mt-8">Driver details</h3>
      <Hr />
      <DriverDetails driver={driver} />
      <h3 className="text-med-gray uppercase text-xs mt-8">Payment details</h3>
      <Hr />
      <DetailsRow
        label="Total"
        value={`${rideLength} miles x ${driversFee} = ${totalFee}`}
      />
    </>
  );
};

export default RideDetails;

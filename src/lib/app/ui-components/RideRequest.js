import React, { useState } from "react";
import { useDrivers } from "../util-hooks";

import { Panel, Button, Hr } from "../../shared/ui-components";
import {
  RequestRideForm,
  AvailableDrivers,
  RideDetails,
  PaymentForm,
} from "./";

export const RideRequest = ({ ride = null }) => {
  const [criteria, setCriteria] = useState(null);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const { drivers } = useDrivers(criteria);

  const rideLength = criteria !== null ? 2.2 : 0;

  const onRideRequest = async (criteria) => {
    setCriteria({ ...criteria, rideLength });

    return {};
  };

  const onDriverSelect = (driver) => {
    setSelectedDriver({ ...driver });
  };

  return (
    <>
      {drivers.length === 0 ? (
        <Panel padding="8">
          <h1 className="text-xl mb-4">Request a Ride</h1>
          <RequestRideForm onRideRequest={onRideRequest} />
        </Panel>
      ) : selectedDriver === null ? (
        <Panel color="gray" padding="3">
          <Button
            variant="secondary"
            icon="long-arrow-alt-left"
            label="Update request"
            onClick={() => setCriteria(null)}
          />
          <h2 className="text-xl my-4 px-4">Available Drivers</h2>
          <AvailableDrivers
            drivers={drivers}
            onDriverSelect={onDriverSelect}
            rideLength={rideLength}
          />
        </Panel>
      ) : (
        <Panel color="gray" padding="3">
          <div className="mb-4">
            <Button
              variant="secondary"
              icon="long-arrow-alt-left"
              label="Select another driver"
              onClick={() => setSelectedDriver(null)}
            />
          </div>
          <Panel padding="6">
            <h2 className="text-xl mb-6">Your ride request</h2>
            <RideDetails
              data={{ ...criteria, rideLength, driver: { ...selectedDriver } }}
              longform
            />
            <h3 className="text-med-gray uppercase text-xs mt-8">
              Payment details
            </h3>
            <Hr />
            <PaymentForm
              amount={rideLength * selectedDriver.driverFee}
              note="You will only be charged after you
          have reached your destination."
            />
          </Panel>
        </Panel>
      )}
    </>
  );
};

export default RideRequest;

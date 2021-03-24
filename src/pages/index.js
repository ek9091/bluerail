import React, { useState, useEffect } from "react";
import axios from "axios";

import { Panel, Button } from "../lib/shared/ui-components";
import {
  AppLayout,
  RequestRideForm,
  AvailableDrivers,
  RideDetails,
} from "../lib/app/ui-components";

import { useDrivers } from "../lib/app/util-hooks";

export function Home() {
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
    <AppLayout title="Request a ride">
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
            label="Search again"
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
            />
          </Panel>
        </Panel>
      )}
    </AppLayout>
  );
}

export default Home;

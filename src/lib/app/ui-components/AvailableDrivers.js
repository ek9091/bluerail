import React from "react";

import { Panel, Button } from "../../shared/ui-components";
import { DriverDetails } from "./";

const DriverCard = ({ driver, onDriverSelect, rideLength }) => {
  return (
    <Panel>
      <DriverDetails driver={driver} rideLength={rideLength} />
      <div className="text-right">
        <Button label="Select Driver" onClick={() => onDriverSelect(driver)} />
      </div>
    </Panel>
  );
};

export const AvailableDrivers = ({
  drivers = [],
  rideLength = 0,
  onDriverSelect,
}) => {
  return drivers.map((driver) => (
    <div className="mb-3" key={driver.id}>
      <DriverCard
        driver={driver}
        onDriverSelect={onDriverSelect}
        rideLength={rideLength}
      />
    </div>
  ));
};

export default AvailableDrivers;

import React from "react";

import { Icon } from "../../shared/ui-components";

const DetailIcon = ({ icon }) => {
  return (
    <div className="inline-block w-8 text-center mr-3">
      <Icon icon={icon} color="blue" size="md" />
    </div>
  );
};

const VehicleTags = ({ tags = [] }) => {
  return (
    <div className="flex">
      <div className="flex-none">
        <DetailIcon icon="tag" size="sm" />
      </div>
      <div className="flex-grow">
        {tags.map((tag, index) => (
          <div className="inline-block px-2 mr-2 mb-2 bg-gray" key={index}>
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export const DriverDetails = ({ driver, rideLength = 0 }) => {
  const { driverName, driverLocation, driverVehicle, driverFee } = driver;
  const { make, model, year, tags } = driverVehicle;
  const { city, state, zipCode } = driverLocation;

  return (
    <div className="p-2">
      <h3 className="text-xl mb-4">{driverName}</h3>
      <div className="mb-3">
        <DetailIcon icon="car" />
        {`${year} ${make} ${model}`}
      </div>
      <div className="mb-3">
        <DetailIcon icon="map-marker-alt" />
        {`${city}, ${state} ${zipCode}`}
      </div>
      <div className="mb-2">{<VehicleTags tags={tags} />}</div>
      <div>
        <DetailIcon icon="money-bill" />${parseFloat(driverFee).toFixed(2)}{" "}
        /mile{" "}
        {rideLength > 0 && (
          <span className="text-green">
            {" "}
            - ${parseInt(rideLength * driverFee).toFixed(2)} for ride
          </span>
        )}
      </div>
    </div>
  );
};

export default DriverDetails;

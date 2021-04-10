import React from "react";

import { Panel, Button } from "../lib/shared/ui-components";
import { AppLayout, RideDetails } from "../lib/app/ui-components";
import { useRides, useAuth } from "../lib/app/util-hooks";

export const RideHistory = () => {
  const { isAuthenticated, isPending } = useAuth("/login");
  const { rides } = useRides({ history: true });

  if (isPending || !isAuthenticated) return null;

  const Ride = ({ ride }) => {
    const total = (ride.driver.driverFee * ride.rideLength).toLocaleString(
      "USD",
      {
        style: "currency",
        currency: "USD",
      }
    );

    const fee = ride.driver.driverFee.toLocaleString("USD", {
      style: "currency",
      currency: "USD",
    });

    return (
      <Panel padding="6">
        <RideDetails data={ride} />
        <div className="text-lg text-right">
          <span className="text-blue uppercase text-sm w-12 mr-4">Total:</span>{" "}
          {ride.rideLength} miles x {fee} = {total}{" "}
          {ride.paymentCompleted ? (
            <span className="text-green uppercase text-sm font-bold">Paid</span>
          ) : (
            <span className="text-med-gray uppercase text-sm font-bold">
              Pending
            </span>
          )}
        </div>
      </Panel>
    );
  };

  return (
    <>
      <AppLayout title="Ride History">
        <Panel padding="3" color="gray">
          <h1 className="text-xl my-4 px-4">Ride History</h1>
          {rides.length > 0 &&
            rides.map((ride) => (
              <div className="mb-3" key={ride.id}>
                <Ride ride={ride} />
              </div>
            ))}
          <div className="text-center px-4">
            <Button label="Show more Rides" variant="secondary" />
          </div>
        </Panel>
      </AppLayout>
    </>
  );
};

export default RideHistory;

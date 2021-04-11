import React from "react";

import { Panel, Button } from "../lib/shared/ui-components";
import { AppLayout as Layout, RideDetails } from "../lib/app/ui-components";
import { useRides, useAuth } from "../lib/app/util-hooks";

export const RideHistory = () => {
  const { isAuthenticated, isPending, user } = useAuth("/login");
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
          {ride.rideStatus !== -1 && (
            <p className="mb-4">
              <span className="text-blue uppercase text-sm w-12 mr-4">
                Total:
              </span>{" "}
              {ride.rideLength} miles x {fee} = {total}
            </p>
          )}
          {ride.rideStatus === -1 ? (
            <p className="text-sm">
              You were not charged
              <span className="text-red uppercase text-xs p-2 inline-block bg-gray ml-4 font-bold">
                Ride Rejected
              </span>
            </p>
          ) : ride.paymentStatus === 1 ? (
            <p className="text-green uppercase text-xs p-2 bg-gray inline-block font-bold">
              Payment Processed
            </p>
          ) : (
            <p className="text-med-gray uppercase text-xs p-2 inline-block bg-gray font-bold">
              Payment Pending
            </p>
          )}
        </div>
      </Panel>
    );
  };

  return (
    <>
      <Layout title="Ride History" roles={user.roles}>
        <Panel padding="3" color="gray">
          <h1 className="text-xl my-4 px-4">Ride History</h1>
          {rides.length === 0 ? (
            <Panel>
              <p className="py-10 text-center">
                There are no rides in your history at this time.
              </p>
            </Panel>
          ) : (
            rides.map((ride) => (
              <div className="mb-3" key={ride.rideId}>
                <Ride ride={ride} />
              </div>
            ))
          )}
          <div className="text-center px-4">
            <Button label="Show more Rides" variant="secondary" />
          </div>
        </Panel>
      </Layout>
    </>
  );
};

export default RideHistory;

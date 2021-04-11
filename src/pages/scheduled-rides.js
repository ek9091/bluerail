import React, { useState } from "react";
import { useRouter } from "next/router";

import { Panel, Button, Modal } from "../lib/shared/ui-components";
import { AppLayout, RideDetails } from "../lib/app/ui-components";
import { useRides, useAuth } from "../lib/app/util-hooks";

export const ScheduledRides = () => {
  const { isAuthenticated, isPending } = useAuth("/login");

  const router = useRouter();
  const { rides, cancelRide } = useRides();
  const [cancelRideId, setCancelRideId] = useState(null);
  const [cancelError, setCancelError] = useState("");

  if (isPending || !isAuthenticated) return null;

  const handleCancelRide = async (id) => {
    const error = await cancelRide(id);

    if (error !== "") {
      setCancelError(error);
      return;
    }

    setCancelRideId(null);
  };

  return (
    <>
      <AppLayout>
        <Panel padding="3" color="gray">
          <h2 className="text-xl my-4 px-4">Scheduled Rides</h2>
          {rides.length === 0 ? (
            <Panel>
              <p className="py-10 text-center">
                You have no scheduled rides at this time
              </p>
            </Panel>
          ) : (
            rides.map((ride) => (
              <div className="mb-3" key={ride.rideId}>
                <Panel padding="6">
                  <RideDetails data={ride} />
                  <div className="text-right">
                    <Button
                      label="Cancel Ride"
                      className="mr-2"
                      variant="warning"
                      onClick={() => setCancelRideId(ride.rideId)}
                    />
                    <Button
                      label="Update Ride"
                      variant="secondary"
                      onClick={() => router.push(`/rides/${ride.rideId}`)}
                    />
                  </div>
                </Panel>
              </div>
            ))
          )}
          <div className="text-center px-4">
            <Button label="Show more Rides" variant="secondary" />
          </div>
        </Panel>
      </AppLayout>
      <Modal open={cancelRideId !== null} onClose={() => setCancelRideId(null)}>
        <p className="mb-10 text-xl">
          Are you sure you want to cancel this ride?
        </p>
        {cancelError !== "" && (
          <p className="py-4 bg-gray text-red">{cancelError}</p>
        )}
        <div className="text-right">
          <Button
            label="Yes, cancel ride"
            className="mr-2"
            variant="warning"
            onClick={() => handleCancelRide(cancelRideId)}
          />
          <Button
            label="No, do not cancel"
            variant="secondary"
            onClick={() => setCancelRideId(null)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ScheduledRides;

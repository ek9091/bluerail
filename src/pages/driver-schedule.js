import React, { useState } from "react";

import { Panel, Button, Modal } from "../lib/shared/ui-components";
import { AppLayout, RideDetails } from "../lib/app/ui-components";
import { useRides, useAuth } from "../lib/app/util-hooks";

export const DriverSchedule = () => {
  const { isAuthenticated, isPending } = useAuth("/login");

  const { rides, cancelRide, completeRide } = useRides({ driver: true });

  const [completeRideId, setCompleteRideId] = useState(null);
  const [completeError, setCompleteError] = useState("");
  const [rejectRideId, setRejectRideId] = useState(null);
  const [rejectError, setRejectError] = useState("");

  if (isPending || !isAuthenticated) return null;

  const handleRejectRide = async (id) => {
    const response = await cancelRide(id);

    if (response.error) {
      setRejectError(response.error);
      return;
    }

    setRejectRideId(null);
  };

  const handleCompleteRide = async (id) => {
    const response = await completeRide(id);

    if (response.error) {
      setCompleteError(response.error);
      return;
    }

    setCompleteRideId(null);
  };

  return (
    <>
      <AppLayout title="Driver Schedule">
        <Panel padding="3" color="gray">
          <h1 className="text-xl my-4 px-4">Ride Schedule</h1>
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
                  <RideDetails data={ride} driverView />
                  <div className="text-right">
                    <Button
                      label="Reject Ride"
                      className="mr-2"
                      variant="warning"
                      onClick={() => setRejectRideId(ride.rideId)}
                    />
                    <Button
                      label="Mark Completed"
                      variant="secondary"
                      onClick={() => setCompleteRideId(ride.rideId)}
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
      <Modal
        open={rejectRideId !== null}
        onClose={() => setRejectModalOpen(false)}
      >
        <p className="mb-10 text-xl">
          Are you sure you want to reject this ride?
        </p>
        {rejectError !== "" && (
          <p className="py-4 bg-gray text-red">{rejectError}</p>
        )}
        <div className="text-right">
          <Button
            label="Yes, reject ride"
            className="mr-2"
            variant="warning"
            onClick={() => handleRejectRide(rejectRideId)}
          />
          <Button
            label="No, do not reject"
            variant="secondary"
            onClick={() => setRejectRideId(null)}
          />
        </div>
      </Modal>
      <Modal
        open={completeRideId !== null}
        onClose={() => setCompleteRideId(null)}
      >
        <p className="mb-4">
          By marking this ride as complete, you confirm that you have driven the
          requesting student to their specified destination. Marking an
          incomplete ride as completed may result in disciplinary action.
        </p>
        <p className="mb-4">
          Are you sure you want to mark this ride as complete?
        </p>
        {completeError !== "" && (
          <p className="py-4 bg-gray text-red">{completeError}</p>
        )}
        <div className="text-right">
          <Button
            label="Yes"
            className="mr-2"
            variant="warning"
            onClick={() => handleCompleteRide(completeRideId)}
          />
          <Button
            label="No"
            variant="secondary"
            onClick={() => setCompleteRideId(null)}
          />
        </div>
      </Modal>
    </>
  );
};

export default DriverSchedule;

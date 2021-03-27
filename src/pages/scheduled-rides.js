import React, { useState } from "react";

import { Panel, Button, Modal } from "../lib/shared/ui-components";
import { AppLayout, RideDetails } from "../lib/app/ui-components";
import { useRides } from "../lib/app/util-hooks";

export const ScheduledRides = () => {
  const { rides } = useRides();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  return (
    <>
      <AppLayout>
        <Panel padding="3" color="gray">
          <h2 className="text-xl my-4 px-4">Scheduled Rides</h2>
          {rides.length > 0 &&
            rides.map((ride) => (
              <div className="mb-3" key={ride.id}>
                <Panel padding="6">
                  <RideDetails data={ride} />
                  <div className="text-right">
                    <Button
                      label="Cancel Ride"
                      className="mr-2"
                      variant="warning"
                      onClick={() => setConfirmModalOpen(true)}
                    />
                    <Button
                      label="Update Ride"
                      variant="secondary"
                      onClick={() => setUpdateModalOpen(true)}
                    />
                  </div>
                </Panel>
              </div>
            ))}
          <div className="text-center px-4">
            <Button label="Show more Rides" variant="secondary" />
          </div>
        </Panel>
      </AppLayout>
      <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <p className="mb-10 text-xl">
          Are you sure you want to cancel this ride?
        </p>
        <div className="text-right">
          <Button
            label="Yes, cancel ride"
            className="mr-2"
            variant="warning"
            onClick={() => setConfirmModalOpen(false)}
          />
          <Button
            label="No, do not cancel"
            variant="secondary"
            onClick={() => setConfirmModalOpen(false)}
          />
        </div>
      </Modal>
      <Modal open={updateModalOpen} onClose={() => setUpdateModalOpen(false)}>
        <p className="text-xl">
          Updating a ride will be the same as requesting a ride. The only
          difference being that an existing ride will be updated instead of a
          new one being created.
        </p>
      </Modal>
    </>
  );
};

export default ScheduledRides;

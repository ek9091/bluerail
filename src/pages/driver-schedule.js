import React, { useState } from "react";

import { Panel, Button, Modal } from "../lib/shared/ui-components";
import { AppLayout, RideDetails } from "../lib/app/ui-components";
import { useRides } from "../lib/app/util-hooks";

export const ScheduledRides = () => {
  const { rides } = useRides();

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);

  return (
    <>
      <AppLayout title="Driver Schedule">
        <Panel padding="3" color="gray">
          <h1 className="text-xl my-4 px-4">Ride Schedule</h1>
          {rides.length > 0 &&
            rides.map((ride) => (
              <div className="mb-3" key={ride.id}>
                <Panel padding="6">
                  <RideDetails data={ride} driverView />
                  <div className="text-right">
                    <Button
                      label="Reject Ride"
                      className="mr-2"
                      variant="warning"
                      onClick={() => setRejectModalOpen(true)}
                    />
                    <Button
                      label="Mark Completed"
                      variant="secondary"
                      onClick={() => setAcceptModalOpen(true)}
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
      <Modal open={rejectModalOpen} onClose={() => setRejectModalOpen(false)}>
        <p className="mb-10 text-xl">
          Are you sure you want to reject this ride?
        </p>
        <div className="text-right">
          <Button
            label="Yes, reject ride"
            className="mr-2"
            variant="warning"
            onClick={() => setRejectModalOpen(false)}
          />
          <Button
            label="No, do not reject"
            variant="secondary"
            onClick={() => setRejectModalOpen(false)}
          />
        </div>
      </Modal>
      <Modal open={acceptModalOpen} onClose={() => setAcceptModalOpen(false)}>
        <p className="mb-4">
          By marking this ride as complete, you confirm that you have driven the
          requesting student to their specified destination. Marking an
          incomplete ride as completed may result in disciplinary action.
        </p>
        <p className="mb-4">
          Are you sure you want to mark this ride as complete?
        </p>
        <div className="text-right">
          <Button
            label="Yes"
            className="mr-2"
            variant="warning"
            onClick={() => setAcceptModalOpen(false)}
          />
          <Button
            label="No"
            variant="secondary"
            onClick={() => setAcceptModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ScheduledRides;

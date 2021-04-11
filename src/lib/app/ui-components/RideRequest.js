import React, { useState } from "react";
import axios from "axios";

import { Panel, Button, Hr, Modal } from "../../shared/ui-components";
import {
  RequestRideForm,
  AvailableDrivers,
  RideDetails,
  PaymentForm,
} from "./";

const defaultRequest = {
  rideFrom: null,
  rideTo: null,
  rideTime: null,
  rideDate: null,
  driver: null,
};

export const RideRequest = ({
  currentRequest = {},
  heading = "Request a ride",
}) => {
  const [success, setSuccess] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [request, setRequest] = useState(defaultRequest);

  const onRideRequest = async (inputs) => {
    const response = await axios.get("/api/drivers", { params: inputs });

    const {
      rideFrom,
      rideTo,
      rideTime,
      rideDate,
      rideLength,
      drivers,
    } = response.data;
    setRequest({
      rideFrom,
      rideTo,
      rideTime,
      rideDate,
      rideLength,
      driver: null,
    });

    if (drivers.length > 0) {
      setDrivers(drivers);
      return {};
    }

    return {
      formError: "There are no drivers available at the time you provided",
    };
  };

  const onDriverSelect = (driver) => {
    setRequest({ ...request, driver: driver });
  };

  async function handlePayment() {
    const {
      driver,
      rideFrom,
      rideTo,
      rideLength,
      rideTime,
      rideDate,
    } = request;

    let data = {
      driverId: driver.driverId,
      driverFee: driver.driverFee,
      fromId: rideFrom.id,
      toId: rideTo.id,
      rideLength,
      rideTime,
      rideDate,
      amount: rideLength * driver.driverFee,
    };

    if (currentRequest.rideId) {
      data.rideId = currentRequest.rideId;
    }

    const response = await axios.post("/api/rides", { ...data });

    if (response.data.success) {
      setSuccess(response.data.success);
      setRequest(defaultRequest);
      setDrivers([]);
    }

    return response.data;
  }

  return (
    <>
      {drivers.length === 0 ? (
        <Panel padding="8">
          <h1 className="text-xl mb-4">{heading}</h1>
          <RequestRideForm
            onRideRequest={onRideRequest}
            currentRequest={currentRequest}
          />
        </Panel>
      ) : request.driver === null ? (
        <Panel color="gray" padding="3">
          <Button
            variant="secondary"
            icon="long-arrow-alt-left"
            label="Update request"
            onClick={() => setDrivers([])}
          />
          <h2 className="text-xl my-4 px-4">Available Drivers</h2>
          <AvailableDrivers
            drivers={drivers}
            onDriverSelect={onDriverSelect}
            rideLength={request.rideLength}
          />
        </Panel>
      ) : (
        <Panel color="gray" padding="3">
          <div className="mb-4">
            <Button
              variant="secondary"
              icon="long-arrow-alt-left"
              label="Select another driver"
              onClick={() => setRequest({ ...request, driver: null })}
            />
          </div>
          <Panel padding="6">
            <h2 className="text-xl mb-6">Your ride request</h2>
            <RideDetails data={{ ...request }} longform />
            <h3 className="text-med-gray uppercase text-xs mt-8">
              Payment details
            </h3>
            <Hr />
            <PaymentForm
              amount={request.rideLength * request.driver.driverFee}
              note="You will only be charged after you
          have reached your destination."
              onPayment={handlePayment}
              submitLabel={currentRequest.rideId ? "Update Request" : "Submit"}
            />
          </Panel>
        </Panel>
      )}
      <Modal open={success !== ""} onClose={() => setSuccess("")}>
        <p>{success}</p>
      </Modal>
    </>
  );
};

export default RideRequest;

import React, { createRef, useState } from "react";
import axios from "axios";

import { useAuth } from "../lib/app/util-hooks";
import { AppLayout as Layout, ScheduleForm } from "../lib/app/ui-components";
import { useDriverSettings, useDriverSchedule } from "../lib/app/util-hooks";
import {
  Panel,
  TextInput,
  Button,
  AddressInput,
  Loading,
} from "../lib/shared/ui-components";
import { validateDriverSettings } from "../lib/app/util-validation";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2 ml-2">{name}</h3>;
};

export const DriverSettings = () => {
  const { isAuthenticated, isPending: isAuthPending, user } = useAuth("/login");
  const { isPending: isSettingsPending, settings } = useDriverSettings();
  const {
    schedule,
    isPending: isSchedulePending,
    refreshSchedule,
  } = useDriverSchedule();
  const makeRef = createRef();
  const modelRef = createRef();
  const yearRef = createRef();
  const tagsRef = createRef();
  const locationRef = createRef();
  const maxDistanceRef = createRef();
  const driverFeeRef = createRef();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isActive, setIsActive] = useState(false);

  if (isAuthPending || !isAuthenticated) return null;

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isPending) return;
    setIsPending(true);

    const make = makeRef.current.value;
    const model = modelRef.current.value;
    const year = yearRef.current.value;
    const placeId = locationRef.current.value;
    const maxDistance = maxDistanceRef.current.value;
    const driverFee = parseFloat(driverFeeRef.current.value);

    let currentErrors = validateDriverSettings({
      make,
      model,
      year,
      placeId,
      maxDistance,
      driverFee,
    });

    if (Object.keys(currentErrors).length === 0) {
      const response = await axios.post("/api/driver/settings", {
        make,
        model,
        year,
        placeId,
        maxDistance,
        driverFee,
      });

      if (response.data.errors) {
        currentErrors = response.data.errors;
      }

      if (response.data.success) {
        setSuccess(response.data.success);
        setIsActive(true);
      }
    }

    setErrors(currentErrors);
    setIsPending(false);
  }

  async function handleSchedule(inputs) {
    const response = await axios.post("/api/driver/schedule", inputs);

    if (response.data && response.data.success) {
      refreshSchedule();
    }

    return response.data;
  }

  async function handleScheduleDelete(scheduleId) {
    const response = await axios.delete("/api/driver/schedule", {
      data: { scheduleId },
    });

    if (response.data && response.data.success) {
      refreshSchedule();
    }

    return response.data;
  }

  return (
    <Layout title="Driver Settings" roles={user.roles}>
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Driver Settings</h1>
        <Panel padding="6">
          {isSettingsPending ? (
            <Loading />
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="text-right mb-6">
                  {!isActive && settings.status === 0 && (
                    <p className="text-xs font-bold">
                      Settings below are required to set account as active
                      <span className="border border-red text-red p-1 ml-2">
                        Inactive
                      </span>
                    </p>
                  )}
                </div>
                <Label name="Vehicle" />
                <div className="md:flex justify-between mb-4">
                  <div className="flex-grow">
                    <TextInput
                      label="Make"
                      ref={makeRef}
                      value={settings.make}
                      id="make"
                      error={errors.makeError}
                    />
                  </div>
                  <div className="flex-grow px-1">
                    <TextInput
                      label="Model"
                      ref={modelRef}
                      value={settings.model}
                      id="model"
                      error={errors.modelError}
                    />
                  </div>
                  <div className="w-20 flex-none">
                    <TextInput
                      label="Year"
                      ref={yearRef}
                      value={settings.year}
                      id="year"
                      error={errors.yearError}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <Label name="Vehicle Tags (separated by commas)" />
                  <TextInput label="Tags" ref={tagsRef} value="clean, luxury" />
                </div>
                <div className="md:flex justify-between mb-6">
                  <div className="flex-grow pr-1">
                    <Label name="Service Location" />
                    <AddressInput
                      label="City and State"
                      ref={locationRef}
                      type="city"
                      id="serviceLocation"
                      defaultStreet={
                        settings.city && settings.state
                          ? `${settings.city}, ${settings.state}`
                          : ""
                      }
                      defaultPlace={settings.placeId}
                      error={errors.placeIdError}
                    />
                    <p className="text-xs text-center italic -mt-2">
                      Choose location from menu that appears
                    </p>
                  </div>
                  <div className="flex-none w-48">
                    <Label name="Max driving distance" />
                    <TextInput
                      label="Miles"
                      ref={maxDistanceRef}
                      type="number"
                      value={settings.maxDistance}
                      id="maxDistance"
                      error={errors.maxDistanceError}
                    />
                  </div>
                </div>
                <div className="md:flex">
                  <div className="w-1/2">
                    <Label name="Drivers fee" />
                    <TextInput
                      label="Fee per mile"
                      ref={driverFeeRef}
                      value={settings.driverFee.toFixed(2)}
                      error={errors.driverFeeError}
                    />
                  </div>
                </div>
                <div className="flex items-center text-center">
                  <div className="flex-grow">
                    {success !== "" && <p className="text-green">{success}</p>}
                  </div>
                  <div className="flex-none">
                    <Button label="Save Settings" type="submit" />
                  </div>
                </div>
              </form>
              <div className="my-4">
                <Label name="Schedule" />
                <ScheduleForm
                  onSchedule={handleSchedule}
                  onDelete={handleScheduleDelete}
                  schedule={schedule}
                  isPending={isSchedulePending}
                />
              </div>
            </>
          )}
        </Panel>
      </Panel>
    </Layout>
  );
};

export default DriverSettings;

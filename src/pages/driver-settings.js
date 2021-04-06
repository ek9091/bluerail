import React, { createRef, useState } from "react";
import axios from "axios";

import { useAuth } from "../lib/app/util-hooks";
import { AppLayout as Layout } from "../lib/app/ui-components";
import { useDriverSettings } from "../lib/app/util-hooks";
import {
  Panel,
  TextInput,
  Button,
  CheckInput,
  AddressInput,
  TimeInput,
  Loading,
} from "../lib/shared/ui-components";
import { validateDriverSettings } from "../lib/app/util-validation";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2 ml-2">{name}</h3>;
};

export const DriverSettings = () => {
  const { isAuthenticated, isPending: isAuthPending } = useAuth("/login");
  const { isPending: isSettingsPending, settings } = useDriverSettings();
  const makeRef = createRef();
  const modelRef = createRef();
  const yearRef = createRef();
  const tagsRef = createRef();
  const locationRef = createRef();
  const maxDistanceRef = createRef();
  const startRef = createRef();
  const endRef = createRef();
  const mondayRef = createRef();
  const tuesdayRef = createRef();
  const wednesdayRef = createRef();
  const thursdayRef = createRef();
  const fridayRef = createRef();
  const saturdayRef = createRef();
  const sundayRef = createRef();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

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

    let currentErrors = validateDriverSettings({
      make,
      model,
      year,
      placeId,
      maxDistance,
    });

    if (Object.keys(currentErrors).length === 0) {
      const response = await axios.post("/api/driver/settings", {
        make,
        model,
        year,
        placeId,
        maxDistance,
      });

      if (response.data.errors) {
        currentErrors = response.data.errors;
      }

      if (response.data.success) {
        setSuccess(response.data.success);
      }
    }

    setErrors(currentErrors);
    setIsPending(false);
  }

  return (
    <Layout title="Driver Settings">
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Driver Settings</h1>
        <Panel padding="6">
          {isSettingsPending ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="text-right mb-6">
                <p className="text-xs font-bold">
                  Settings below are required to set account as active
                  <span className="border border-red text-red p-1 ml-2">
                    Inactive
                  </span>
                </p>
              </div>
              <Label name="Vehicle" />
              <div className="flex justify-between mb-4">
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
              <div className="flex justify-between mb-6">
                <div className="flex-grow pr-1">
                  <Label name="Service Location" />
                  <AddressInput
                    label="City and State"
                    ref={locationRef}
                    type="city"
                    id="serviceLocation"
                    defaultStreet={`${settings.city}, ${settings.state}`}
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
              <div className="mb-8">
                <Label name="Schedule" />
                <div className="flex w-4/5">
                  <div className="w-1/2 pr-0.5">
                    <TimeInput
                      label="Start time"
                      ref={startRef}
                      dateFormat={false}
                    />
                  </div>
                  <div className="w-1/2 pl-0.5">
                    <TimeInput
                      label="End time"
                      ref={endRef}
                      dateFormat={false}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center w-2/3 px-4 mb-8">
                  <CheckInput label="S" ref={sundayRef} />
                  <CheckInput label="M" ref={mondayRef} />
                  <CheckInput label="T" ref={tuesdayRef} />
                  <CheckInput label="W" ref={wednesdayRef} />
                  <CheckInput label="R" ref={thursdayRef} />
                  <CheckInput label="F" ref={fridayRef} />
                  <CheckInput label="S" ref={saturdayRef} />
                  <Button variant="secondary" label="Add" className="ml-2" />
                </div>
                <table className="w-full text-center">
                  <thead>
                    <tr>
                      <th>Start time</th>
                      <th>End time</th>
                      <th>Days</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray">
                      <td>8:00 am</td>
                      <td>10:00 am</td>
                      <td>Mon, Tues</td>
                      <td>
                        <Button variant="warning" label="remove" />
                      </td>
                    </tr>
                    <tr>
                      <td>2:00 pm</td>
                      <td>4:00 pm</td>
                      <td>Tues, Fri, Sat</td>
                      <td>
                        <Button variant="warning" label="remove" />
                      </td>
                    </tr>
                    <tr className="bg-gray">
                      <td>7:00 am</td>
                      <td>6:00 pm</td>
                      <td>Sun</td>
                      <td>
                        <Button variant="warning" label="remove" />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
          )}
        </Panel>
      </Panel>
    </Layout>
  );
};

export default DriverSettings;

import React, { createRef } from "react";

import { AppLayout as Layout } from "../lib/app/ui-components";
import {
  Panel,
  TextInput,
  Button,
  CheckInput,
} from "../lib/shared/ui-components";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2 ml-2">{name}</h3>;
};

export const DriverSettings = () => {
  const makeRef = createRef();
  const modelRef = createRef();
  const yearRef = createRef();
  const tagsRef = createRef();
  const locationRef = createRef();
  const distanceRef = createRef();
  const startRef = createRef();
  const endRef = createRef();
  const mondayRef = createRef();
  const tuesdayRef = createRef();
  const wednesdayRef = createRef();
  const thursdayRef = createRef();
  const fridayRef = createRef();
  const saturdayRef = createRef();
  const sundayRef = createRef();

  return (
    <Layout title="Driver Settings">
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Driver Settings</h1>
        <Panel padding="6">
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
              <TextInput label="Make" ref={makeRef} value="Hyundai" />
            </div>
            <div className="flex-grow px-1">
              <TextInput label="Model" ref={modelRef} value="Elantra" />
            </div>
            <div className="w-20 flex-none">
              <TextInput label="Year" ref={yearRef} value="2020" />
            </div>
          </div>
          <div className="mb-6">
            <Label name="Vehicle Tags (separated by commas)" />
            <TextInput label="Tags" ref={tagsRef} value="clean, luxury" />
          </div>
          <div className="flex justify-between mb-6">
            <div className="flex-grow pr-1">
              <Label name="Service Location" />
              <TextInput
                label="City and State"
                ref={locationRef}
                value="Shippensburg, PA"
              />
            </div>
            <div className="flex-none w-48">
              <Label name="Max driving distance" />
              <TextInput
                label="Miles"
                ref={distanceRef}
                type="number"
                value="30"
              />
            </div>
          </div>
          <div className="mb-8">
            <Label name="Schedule" />
            <div className="flex w-2/3">
              <div className="w-1/2 pr-0.5">
                <TextInput label="Start time" ref={startRef} />
              </div>
              <div className="w-1/2 pl-0.5">
                <TextInput label="End time" ref={endRef} />
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
          <div className="text-right">
            <Button label="Save Settings" />
          </div>
        </Panel>
      </Panel>
    </Layout>
  );
};

export default DriverSettings;

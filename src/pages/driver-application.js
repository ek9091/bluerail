import React, { createRef } from "react";

import { AppLayout as Layout } from "../lib/app/ui-components";
import {
  Panel,
  Textarea,
  TextInput,
  Button,
} from "../lib/shared/ui-components";

export const DriverApplication = () => {
  const firstName = createRef();
  const lastName = createRef();
  const address = createRef();
  const phone = createRef();
  const email = createRef();
  const work = createRef();
  const background = createRef();
  const insuranceName = createRef();
  const insuranceNumber = createRef();
  const license = createRef();
  const firstRefName = createRef();
  const firstRefPhone = createRef();
  const firstRefEmail = createRef();
  const secRefName = createRef();
  const secRefPhone = createRef();
  const secRefEmail = createRef();

  return (
    <Layout title="Become a Driver">
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Driver Application</h1>
        <div className="mb-4">
          <Panel padding="3">
            <h2 className="text-lg my-2 px-4">Name and Information</h2>
            <TextInput label="First name" ref={firstName} />
            <TextInput label="Last name" ref={lastName} />
            <TextInput label="Full address" ref={address} />
            <TextInput label="Primary phone number" ref={phone} />
            <TextInput label="Email address" ref={email} />
          </Panel>
        </div>
        <div className="mb-4">
          <Panel padding="3">
            <h2 className="text-lg my-2 px-4">Work History</h2>
            <Textarea
              placeholder="Enter details regarding any jobs you've had in the past..."
              size="long"
              ref={work}
            />
          </Panel>
        </div>
        <div className="mb-4">
          <Panel padding="3">
            <h2 className="text-lg my-2 px-4">Background</h2>
            <Textarea
              placeholder="Enter details regarding any traffic violations/infractions, arrests, drug usage, etc."
              size="medium"
              ref={background}
            />
          </Panel>
        </div>
        <div className="mb-4">
          <Panel padding="3">
            <h2 className="text-lg my-2 px-4">Insurance and License</h2>
            <TextInput label="Name of Insurance" ref={insuranceName} />
            <TextInput label="Insurance number" ref={insuranceNumber} />
            <TextInput label="License number" ref={license} />
          </Panel>
        </div>
        <div className="mb-4">
          <Panel padding="3">
            <h2 className="text-lg my-2 px-4">References</h2>
            <div className="py-2">
              <h3 className="px-4 mb-2 text-med-gray">Reference 1</h3>
              <TextInput label="First and Last name" ref={firstRefName} />
              <TextInput label="Phone number" ref={firstRefPhone} />
              <TextInput label="Email" ref={firstRefEmail} />
            </div>
            <div className="py-2">
              <h3 className="px-4 mb-2 text-med-gray">Reference 2</h3>
              <TextInput label="First and Last name" ref={secRefName} />
              <TextInput label="Phone number" ref={secRefPhone} />
              <TextInput label="Email" ref={secRefEmail} />
            </div>
          </Panel>
        </div>
        <Panel padding="3">
          <p className="mb-4">
            By hitting submit below, you agree that the information provided in
            this application is true and correct to the best of your knowledge.
            Also you understand that any intentional dishonesty may result in
            refusal of this application or termination of future driver status.
          </p>
          <Button label="Submit Application" full />
        </Panel>
      </Panel>
    </Layout>
  );
};

export default DriverApplication;

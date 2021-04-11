import React, { createRef, useState } from "react";
import axios from "axios";

import { useAuth } from "../lib/app/util-hooks";
import { AppLayout as Layout } from "../lib/app/ui-components";
import {
  Panel,
  Textarea,
  TextInput,
  Button,
  Loading,
} from "../lib/shared/ui-components";
import { useApplicationStatus } from "../lib/app/util-hooks";

export const DriverApplication = () => {
  const { isAuthenticated, isPending, user } = useAuth("/login");

  const license = createRef();
  const history = createRef();
  const background = createRef();
  const firstRefName = createRef();
  const firstRefPhone = createRef();
  const firstRefEmail = createRef();
  const secRefName = createRef();
  const secRefPhone = createRef();
  const secRefEmail = createRef();

  const [errors, setErrors] = useState({});
  const [isFormPending, setIsFormPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isPending: isApplicationPending, status } = useApplicationStatus();

  if (isPending || !isAuthenticated) return null;

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (isFormPending) return;
    setIsFormPending(true);

    const formData = {
      license: license.current.value,
      history: history.current.value,
      background: background.current.value,
      firstRefName: firstRefName.current.value,
      firstRefPhone: firstRefPhone.current.value,
      firstRefEmail: firstRefEmail.current.value,
      secRefName: secRefName.current.value,
      secRefPhone: secRefPhone.current.value,
      secRefEmail: secRefEmail.current.value,
    };

    let currentErrors = {};

    if (formData.license === "") {
      currentErrors.license = "License is required";
    }

    if (formData.work === "") {
      currentErrors.work = "Work history is required";
    }

    if (formData.firstRefName === "") {
      currentErrors.firstRefName = "Reference name is required";
    }

    if (formData.firstRefPhone === "" && formData.firstRefEmail === "") {
      currentErrors.firstRefPhone =
        "Provide either a phone number or email for reference";

      currentErrors.firstRefEmail =
        "Provide either a phone number or email for reference";
    }

    if (formData.secRefName === "") {
      currentErrors.secRefName = "Reference name is required";
    }

    if (formData.secRefPhone === "" && formData.secRefEmail === "") {
      currentErrors.secRefPhone =
        "Provide either a phone number or email for reference";

      currentErrors.secRefEmail =
        "Provide either a phone number or email for reference";
    }

    if (Object.keys(currentErrors).length === 0) {
      try {
        const response = await axios.post("/api/application", formData);

        if (response.status !== 200) {
          throw new Error("An error has occurred while processing the request");
        }

        if (response.data.error !== undefined) {
          currentErrors.form = response.data.error;
        } else {
          setIsSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    setErrors(currentErrors);
    setIsFormPending(false);
  }

  const formHtml = (
    <form onSubmit={handleSubmit}>
      <h2 className="text-lg my-2">Information</h2>
      <TextInput
        label="License number"
        ref={license}
        error={errors.license}
        id="license"
      />
      <h2 className="text-lg my-2">Work History</h2>
      <Textarea
        placeholder="Enter details regarding any jobs you've had in the past..."
        size="long"
        ref={history}
        error={errors.work}
      />
      <h2 className="text-lg my-2">Background</h2>
      <Textarea
        placeholder="Enter details regarding any traffic violations/infractions, arrests, drug usage, etc."
        size="medium"
        ref={background}
        error={errors.background}
      />
      <h2 className="text-lg my-2">References</h2>
      <div className="py-2">
        <h3 className="mb-2 text-med-gray">Reference 1</h3>
        <TextInput
          label="First and Last name"
          ref={firstRefName}
          error={errors.firstRefName}
          id="ref1Name"
        />
        <TextInput
          label="Phone number"
          ref={firstRefPhone}
          error={errors.firstRefPhone}
          id="ref1Phone"
        />
        <TextInput
          label="Email"
          ref={firstRefEmail}
          error={errors.firstRefEmail}
          id="ref1Email"
        />
      </div>
      <div className="py-2">
        <h3 className="mb-2 text-med-gray">Reference 2</h3>
        <TextInput
          label="First and Last name"
          ref={secRefName}
          error={errors.secRefName}
          id="ref2Name"
        />
        <TextInput
          label="Phone number"
          ref={secRefPhone}
          error={errors.secRefPhone}
          id="ref2Phone"
        />
        <TextInput
          label="Email"
          ref={secRefEmail}
          error={errors.secRefEmail}
          id="ref2Email"
        />
      </div>
      <p className="mb-4 px-2">
        By hitting submit below, you agree that the information provided in this
        application is true and correct to the best of your knowledge. Also you
        understand that any willful dishonesty may result in refusal of this
        application or termination of future driver status.
      </p>
      <Button type="submit" label="Submit Application" full />
      {errors.form !== undefined && (
        <p className="pt-6 text-red text-center">{errors.form}</p>
      )}
    </form>
  );

  return (
    <Layout title="Become a Driver" roles={user.roles}>
      <Panel padding="6">
        <h1 className="text-xl my-4">Driver Application</h1>
        {isApplicationPending ? (
          <Loading />
        ) : status === "APPROVED" ? (
          <p className="text-center py-20">
            Congratulations! Your application has been approved. Log out of your
            account and then log back in to view your driver settings.
          </p>
        ) : status === "REJECTED" ? (
          <p className="text-center py-20">
            We are sorry to let you know that your application was not approved.
          </p>
        ) : status === "PENDING" ? (
          <p className="text-center py-20">
            We have recieved your application and will be reviewing it as soon
            as possible. Please check again at another time.
          </p>
        ) : !isSuccess ? (
          formHtml
        ) : (
          <div className="text-center p-4">
            <h2 className="text-2xl mb-4">Application Sent!</h2>
            <p className="max-w-xs mx-auto">
              Your application as been recieved. Please be sure to come back to
              this page to check it's status. We will review it as soon as
              possible.
            </p>
          </div>
        )}
      </Panel>
    </Layout>
  );
};

export default DriverApplication;

import React from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, Hr } from "../../lib/shared/ui-components";
import applications from "../../../data/applications.json";

const Label = ({ name }) => {
  return <h3 className="text-xs font-bold uppercase mb-2">{name}</h3>;
};

const Detail = ({ label, value }) => {
  return (
    <div className="mb-6">
      <Label name={label} />
      <p>{value}</p>
    </div>
  );
};

export const Applicant = (props) => {
  const router = useRouter();
  const {
    firstName,
    lastName,
    license,
    email,
    phone,
    history,
    background,
    references,
  } = props;

  return (
    <Layout title="Become a Driver">
      <Panel color="gray" padding="3">
        <Button
          variant="secondary"
          icon="long-arrow-alt-left"
          label="Back to applicants"
          onClick={() => router.push("/applicants")}
        />
        <h1 className="text-xl my-4 px-4">
          Application from {firstName} {lastName}
        </h1>

        <Panel padding="5">
          <h2 className="text-lg mb-4">Name and Information</h2>
          <Hr />
          <div className="flex mb-4 p-2">
            <div className="w-1/2">
              <Detail label="Name" value={`${firstName} ${lastName}`} />
              <Detail label="License number" value={license} />
            </div>
            <div className="w-1/2">
              <Detail label="Email address" value={email} />
              <Detail label="Primary phone number" value={phone} />
            </div>
          </div>
          <h2 className="text-lg mb-4">Work History</h2>
          <Hr />
          <p className="p-2 mb-8">{history}</p>
          <h2 className="text-lg mb-4">Background</h2>
          <Hr />
          <p className="p-2 mb-8">{background}</p>
          {references.map(({ name, phone, email }, index) => (
            <>
              <h2 className="text-lg mb-4">Reference {index + 1}</h2>
              <Hr />
              <div className="flex mb-4 p-2">
                <div className="w-1/2">
                  <Detail label="Name" value={name} />
                  <Detail label="Phone number" value={phone} />
                </div>
                <div className="w-1/2">
                  <Detail label="Email address" value={email} />
                </div>
              </div>
            </>
          ))}
        </Panel>

        <div className="text-right py-4">
          <Button variant="warning" className="mr-2" label="Reject Applicant" />
          <Button variant="secondary" label="Approve Applicant" />
        </div>
      </Panel>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let { applicantId } = context.params;
  applicantId = parseInt(applicantId);

  return {
    props: {
      ...applications.find(({ id }) => applicantId === id),
    },
  };
}

export default Applicant;

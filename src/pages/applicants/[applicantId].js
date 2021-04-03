import React from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, Hr } from "../../lib/shared/ui-components";
import { useAuth } from "../../lib/app/util-hooks";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2">{name}</h3>;
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
  const { isAuthenticated, isPending } = useAuth("/login");
  if (isPending || !isAuthenticated) return null;

  const router = useRouter();
  const {
    firstName,
    lastName,
    license,
    email,
    history,
    background,
    ref1Name,
    ref1Phone,
    ref1Email,
    ref2Name,
    ref2Phone,
    ref2Email,
  } = props;

  return (
    <Layout title="Applicant">
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
            </div>
          </div>
          <h2 className="text-lg mb-4">Work History</h2>
          <Hr />
          <p className="p-2 mb-8">{history}</p>
          <h2 className="text-lg mb-4">Background</h2>
          <Hr />
          <p className="p-2 mb-8">{background}</p>
          <h2 className="text-lg mb-4">Reference 1</h2>
          <Hr />
          <div className="flex mb-4 p-2">
            <div className="w-1/2">
              <Detail label="Name" value={ref1Name} />
              <Detail label="Phone number" value={ref1Phone} />
            </div>
            <div className="w-1/2">
              <Detail label="Email address" value={ref1Email} />
            </div>
          </div>
          <h2 className="text-lg mb-4">Reference 2</h2>
          <Hr />
          <div className="flex mb-4 p-2">
            <div className="w-1/2">
              <Detail label="Name" value={ref2Name} />
              <Detail label="Phone number" value={ref2Phone} />
            </div>
            <div className="w-1/2">
              <Detail label="Email address" value={ref2Email} />
            </div>
          </div>
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

  const { db } = require("../../lib/app/data-schema");

  const application = await db("application")
    .first(
      "first_name as firstName",
      "last_name as lastName",
      "email",
      "license",
      "history",
      "background",
      "ref1_name as ref1Name",
      "ref1_phone as ref1Phone",
      "ref1_email as ref1Email",
      "ref2_name as ref2Name",
      "ref2_phone as ref2Phone",
      "ref2_email as ref2Email"
    )
    .join("user", "user.id", "=", "user_id");

  if (!application) {
    return {
      props: {
        error: "Unable to locate the requesting application",
      },
    };
  }

  return {
    props: {
      ...application,
    },
  };
}

export default Applicant;

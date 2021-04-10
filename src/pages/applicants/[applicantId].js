import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, Hr, Modal } from "../../lib/shared/ui-components";
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
  const {
    userId,
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
    status,
  } = props;

  const { isAuthenticated, isPending } = useAuth("/login");
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(status);
  const router = useRouter();

  if (isPending || !isAuthenticated) return null;

  async function handleApprove() {
    const response = await axios.post("/api/application/approve", { userId });

    if (response.status === 200) {
      setApplicationStatus(1);
    }

    setApproveModalOpen(false);
  }

  async function handleReject() {
    const response = await axios.post("/api/application/reject", { userId });

    if (response.status === 200) {
      setApplicationStatus(-1);
    }

    setRejectModalOpen(false);
  }

  return (
    <>
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
            <div className="text-center">
              {applicationStatus === -1 && (
                <p className="text-red">Application has been rejected</p>
              )}
              {applicationStatus === 1 && (
                <p className="text-green">Application has been approved</p>
              )}
            </div>
          </Panel>
          <div className="text-right py-2">
            <Button
              variant="warning"
              className="mr-2"
              label="Reject Applicant"
              onClick={() => setRejectModalOpen(true)}
            />
            <Button
              variant="secondary"
              label="Approve Applicant"
              onClick={() => setApproveModalOpen(true)}
            />
          </div>
        </Panel>
      </Layout>
      <Modal open={rejectModalOpen} onClose={() => setRejectModalOpen(false)}>
        <p className="mb-10 text-xl">
          Are you sure you want to reject this application?
        </p>
        <div className="text-right">
          <Button
            label="Yes"
            className="mr-2"
            variant="warning"
            onClick={handleReject}
          />
          <Button
            label="No"
            variant="secondary"
            onClick={() => setRejectModalOpen(false)}
          />
        </div>
      </Modal>
      <Modal open={approveModalOpen} onClose={() => setApproveModalOpen(false)}>
        <p className="mb-4">
          Are you sure you want to approve this application?
        </p>
        <div className="text-right py-4">
          <Button
            label="Yes"
            className="mr-2"
            variant="warning"
            onClick={handleApprove}
          />
          <Button
            label="No"
            variant="secondary"
            onClick={() => setApproveModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export async function getServerSideProps(context) {
  let { applicantId } = context.params;
  applicantId = parseInt(applicantId);

  const { db } = require("../../lib/app/data-schema");

  const application = await db("application")
    .first(
      "user_id as userId",
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
      "ref2_email as ref2Email",
      "status"
    )
    .join("user", "user.id", "=", "user_id")
    .where("user_id", applicantId);

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

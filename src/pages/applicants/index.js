import React, { useState } from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, Modal, Loading } from "../../lib/shared/ui-components";
import { useApplicants, useAuth } from "../../lib/app/util-hooks";

export const Applicants = () => {
  const { isAuthenticated, isPending } = useAuth("/login");

  const { applicants, isPending: isApplicantsPending } = useApplicants();
  const router = useRouter();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  if (isPending || !isAuthenticated) return null;

  return (
    <>
      <Layout title="Applicants">
        <Panel color="gray" padding="3">
          <h1 className="text-xl my-4 px-4">Applicants</h1>
          {isApplicantsPending ? (
            <Panel>
              <Loading />
            </Panel>
          ) : applicants.length > 0 ? (
            applicants.map(({ applicationId, firstName, lastName }) => (
              <div className="mb-2" key={applicationId}>
                <Panel padding="2">
                  <div className="flex justify-between items-center">
                    <p className="flex-grow pl-4 font-bold">{`${firstName} ${lastName}`}</p>
                    <div className="flex-none">
                      <Button
                        variant="warning"
                        label="Delete"
                        className="mr-2"
                        onClick={() => setConfirmModalOpen(true)}
                      />
                      <Button
                        label="View"
                        onClick={() =>
                          router.push(`/applicants/${applicationId}`)
                        }
                      />
                    </div>
                  </div>
                </Panel>
              </div>
            ))
          ) : (
            <Panel padding="3">
              <p className="py-3 text-center">
                There are no applicants at this time.
              </p>
            </Panel>
          )}
          <div className="text-center px-4">
            <Button label="Show more Applicants" variant="secondary" />
          </div>
        </Panel>
      </Layout>
      <Modal open={confirmModalOpen} onClose={() => setConfirmModalOpen(false)}>
        <p className="mb-10 text-xl">
          Are you sure you want to delete this applicant?
        </p>
        <div className="text-right">
          <Button
            label="Yes, delete applicant"
            className="mr-2"
            variant="warning"
            onClick={() => setConfirmModalOpen(false)}
          />
          <Button
            label="No, don't delete"
            variant="secondary"
            onClick={() => setConfirmModalOpen(false)}
          />
        </div>
      </Modal>
    </>
  );
};

export default Applicants;

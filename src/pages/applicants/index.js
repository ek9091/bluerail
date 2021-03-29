import React, { useState } from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, Modal } from "../../lib/shared/ui-components";
import { useApplicants } from "../../lib/app/util-hooks";

export const Applicants = () => {
  const { applicants } = useApplicants();
  const router = useRouter();

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  return (
    <>
      <Layout title="Applicants">
        <Panel color="gray" padding="3">
          <h1 className="text-xl my-4 px-4">Applicants</h1>
          {applicants.length > 0 ? (
            applicants.map(({ id, firstName, lastName }) => (
              <div className="mb-2" key={id}>
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
                        onClick={() => router.push(`/applicants/${id}`)}
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

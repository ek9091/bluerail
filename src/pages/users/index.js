import React, { createRef } from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, SearchInput } from "../../lib/shared/ui-components";
import { useUsers } from "../../lib/app/util-hooks";

export const Users = () => {
  const { users } = useUsers();
  const router = useRouter();
  const searchRef = createRef();

  return (
    <Layout title="Users">
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Users</h1>
        <div className="mb-4">
          <Panel padding="2">
            <SearchInput ref={searchRef} placeholder="Search for user..." />
          </Panel>
        </div>
        {users.length > 0 ? (
          users.map(({ id, firstName, lastName }) => (
            <div className="mb-2" key={id}>
              <Panel padding="2">
                <div className="flex justify-between items-center">
                  <p className="flex-grow pl-4 font-bold">{`${firstName} ${lastName}`}</p>
                  <div className="flex-none">
                    <Button
                      label="View"
                      onClick={() => router.push(`/users/${id}`)}
                    />
                  </div>
                </div>
              </Panel>
            </div>
          ))
        ) : (
          <Panel padding="3">
            <p className="py-3 text-center">There are no users at this time.</p>
          </Panel>
        )}
        <div className="text-center px-4">
          <Button label="Show more users" variant="secondary" />
        </div>
      </Panel>
    </Layout>
  );
};

export default Users;

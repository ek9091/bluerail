import React, { useState } from "react";
import { useRouter } from "next/router";

import { AppLayout as Layout } from "../../lib/app/ui-components";
import { Panel, Button, SearchInput } from "../../lib/shared/ui-components";
import { useUsers, useAuth } from "../../lib/app/util-hooks";

export const Users = () => {
  const { isAuthenticated, isPending, user } = useAuth("/login");
  const [query, setQuery] = useState("");
  const { users, isFetched } = useUsers(query);
  const router = useRouter();

  if (isPending || !isAuthenticated) return null;

  return (
    <Layout title="Users" roles={user.roles}>
      <Panel color="gray" padding="3">
        <h1 className="text-xl my-4 px-4">Users</h1>
        <div className="mb-4">
          <Panel padding="2">
            <SearchInput
              placeholder="Search user by name or email address..."
              onSearch={(query) => setQuery(query)}
            />
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
            <p className="py-3 opacity-70 text-sm text-center">
              {isFetched && query !== ""
                ? "No users match that criteria"
                : "Perform a search in the input above"}
            </p>
          </Panel>
        )}
        {/* <div className="text-center px-4">
          <Button label="Show more users" variant="secondary" />
        </div> */}
      </Panel>
    </Layout>
  );
};

export default Users;

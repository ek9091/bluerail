import React, { createRef } from "react";
import { useRouter } from "next/router";

import users from "../../../data/users.json";

import { Panel, Button, Hr, Checkbox } from "../../lib/shared/ui-components";
import { AppLayout as Layout } from "../../lib/app/ui-components";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2">{name}</h3>;
};

export const User = (props) => {
  const router = useRouter();
  const adminRef = createRef();
  const employeeRef = createRef();
  const driverRef = createRef();
  const { firstName, lastName, lastLogin, email, phone, roles } = props;

  return (
    <Layout title="User">
      <Panel padding="3" color="gray">
        <Button
          variant="secondary"
          icon="long-arrow-alt-left"
          label="Back to users"
          onClick={() => router.push("/users")}
        />
        <h1 className="text-xl my-4 px-4">User</h1>
        <Panel padding="6">
          <h2 className="text-lg mb-4">Name and Information</h2>
          <Hr />
          <div className="flex mb-6">
            <div className="w-1/2">
              <Label name="Name" />
              <p className="mb-6">{`${firstName} ${lastName}`}</p>
              <Label name="Last Login" />
              <p>{lastLogin}</p>
            </div>
            <div className="w-1/2">
              <Label name="Email address" />
              <p className="mb-6">{email}</p>
              <Label name="Phone number" />
              <p className="mb-6">{phone}</p>
            </div>
          </div>
          <h2 className="text-lg mb-4">User roles</h2>
          <Hr />
          <div className="flex space-x-6 mb-2">
            <Checkbox
              label="Administrator"
              ref={adminRef}
              checked={roles.includes("administrator")}
            />
            <Checkbox
              label="Employee"
              ref={employeeRef}
              checked={roles.includes("employee")}
            />
            <Checkbox
              label="Driver"
              ref={driverRef}
              checked={roles.includes("driver")}
            />
          </div>
        </Panel>
        <div className="text-right py-2">
          <Button variant="warning" label="Delete user" />
          <Button variant="secondary" label="Reset password" />
        </div>
      </Panel>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  let { userId } = context.params;
  userId = parseInt(userId);

  return {
    props: {
      ...users.find(({ id }) => userId === id),
    },
  };
}

export default User;

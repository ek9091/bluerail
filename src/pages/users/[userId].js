import React, { createRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useAuth } from "../../lib/app/util-hooks";
import { Panel, Button, Hr, Checkbox } from "../../lib/shared/ui-components";
import { AppLayout as Layout } from "../../lib/app/ui-components";

const Label = ({ name }) => {
  return <h3 className="text-sm font-bold mb-2">{name}</h3>;
};

export const User = (props) => {
  const { isAuthenticated, isPending, user } = useAuth("/login");
  const router = useRouter();
  const adminRef = createRef();
  const employeeRef = createRef();
  const driverRef = createRef();
  const [success, setSuccess] = useState("");
  const [formError, setFormError] = useState("");
  const {
    userId = 0,
    firstName = "",
    lastName = "",
    lastLogin = "",
    email = "",
    roles = "",
    error = "",
  } = props;

  if (isPending || !isAuthenticated) return null;

  async function handleSave() {
    const isDriver = driverRef.current.checked;
    const isEmployee = employeeRef.current.checked;
    const isAdministrator = adminRef.current.checked;

    setFormError("");
    setSuccess("");

    try {
      const response = await axios.post(`/api/users/roles`, {
        userId,
        isDriver,
        isEmployee,
        isAdministrator,
      });

      if (response.data.error) {
        setFormError(response.data.error);
      }

      if (response.data.success) {
        setSuccess(response.data.success);
      }
    } catch (error) {
      setFormError("An error has occurred while saving");
    }
  }

  return (
    <Layout title="User" roles={user.roles}>
      <Panel padding="3" color="gray">
        <Button
          variant="secondary"
          icon="long-arrow-alt-left"
          label="Back to users"
          onClick={() => router.push("/users")}
        />
        <h1 className="text-xl my-4 px-4">User</h1>
        <Panel padding="6">
          {error !== "" ? (
            <p className="text-center py-4">{error}</p>
          ) : (
            <>
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
                </div>
              </div>
              <h2 className="text-lg mb-4">User roles</h2>
              <Hr />
              <div className="md:flex space-y-2 md:space-y-0 md:space-x-6 mb-2">
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
              <div className="flex justify-between items-center pt-8">
                <div className="flex-grow">
                  {success !== "" && (
                    <p className="text-center text-green">{success}</p>
                  )}
                  {formError !== "" && (
                    <p className="text-center text-red">{formError}</p>
                  )}
                </div>
                <div>
                  <Button label="Save" onClick={handleSave} />
                </div>
              </div>
            </>
          )}
        </Panel>
      </Panel>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { db } = require("../../lib/app/data-schema");

  const { userId } = context.params;
  const id = parseInt(userId);

  const rows = await db("user")
    .select(
      "user.id as userId",
      "first_name as firstName",
      "last_name as lastName",
      "email",
      "last_login as lastLogin",
      "role"
    )
    .leftJoin("role", "user.id", "=", "role.user_id")
    .where({ "user.id": id });

  if (!rows.length) {
    return {
      props: {
        error: "User does not exist",
      },
    };
  }

  let user = { ...rows[0] };
  user.roles = [...rows.map(({ role }) => role)];
  delete user.role;

  return {
    props: {
      ...user,
      lastLogin: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(user.lastLogin),
    },
  };
}

export default User;

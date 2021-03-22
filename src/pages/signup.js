import React from "react";
import { useRouter } from "next/router";

import { Button } from "../lib/shared/ui-components";
import {
  FormLayout as Layout,
  RegistrationForm,
} from "../lib/app/ui-components";

export const Signup = () => {
  const router = useRouter();

  return (
    <Layout
      nav={<Button label="Login" onClick={() => router.push("/login")} />}
    >
      <h2 className="text-xl text-center pt-4 mb-6 font-bold">
        Create a Bluerail account
      </h2>
      <RegistrationForm />
    </Layout>
  );
};

export default Signup;

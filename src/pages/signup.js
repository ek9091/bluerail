import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useAuth } from "../lib/app/util-hooks";
import { Button } from "../lib/shared/ui-components";
import {
  FormLayout as Layout,
  RegistrationForm,
} from "../lib/app/ui-components";

const handleRegister = async (formData) => {
  const response = await axios.post("/api/user", formData);

  if (response.data.error) {
    return { form: response.data.error };
  }

  return {};
};

export const Signup = () => {
  const router = useRouter();
  const { isAuthenticated, isPending } = useAuth();

  if (isAuthenticated) {
    router.push("/");
  }

  if (isPending || isAuthenticated) return null;

  return (
    <Layout
      nav={<Button label="Login" onClick={() => router.push("/login")} />}
    >
      <h2 className="text-xl text-center pt-4 mb-6 font-bold">
        Create a Bluerail account
      </h2>
      <RegistrationForm onRegister={handleRegister} />
    </Layout>
  );
};

export default Signup;

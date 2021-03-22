import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { LoginForm, FormLayout as Layout } from "../../lib/app/ui-components";
import { Button } from "../../lib/shared/ui-components";

export function Login() {
  const router = useRouter();

  async function handleLogin(email, password) {
    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.status !== 200) {
        console.error("An error has occurred");

        return {
          form: "An error has occurred.  Please try again later",
        };
      }

      const { error, user } = response.data;

      if (error !== undefined) {
        return {
          form: response.data.error,
        };
      }

      return {};
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Layout
      nav={<Button label="Sign up" onClick={() => router.push("/signup")} />}
    >
      <h2 className="text-xl text-center pt-4 mb-8 font-bold">
        Log into Bluerail
      </h2>
      <LoginForm onLogin={handleLogin} />
    </Layout>
  );
}

export default Login;

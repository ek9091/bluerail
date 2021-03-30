import React from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { useAuth } from "../../lib/app/util-hooks";
import { LoginForm, FormLayout as Layout } from "../../lib/app/ui-components";
import { Button } from "../../lib/shared/ui-components";

export function Login() {
  const router = useRouter();
  const { isAuthenticated, isPending, setUser } = useAuth();

  if (isAuthenticated) {
    router.push("/");
  }

  if (isPending || isAuthenticated) return null;

  async function handleLogin(email, password) {
    try {
      const response = await axios.post("/api/login", { email, password });

      if (response.status !== 200) {
        throw new Error("An error has occurred while attempting login");
      }

      const { error, user } = response.data;

      if (error !== undefined) {
        return {
          form: error,
        };
      }

      if (user !== undefined) {
        setUser({ ...user });
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
      <h2 className="text-xl text-center pt-4 mb-6 font-bold">
        Log into Bluerail
      </h2>
      <LoginForm onLogin={handleLogin} />
    </Layout>
  );
}

export default Login;

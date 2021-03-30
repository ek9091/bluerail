import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import { AuthContext } from "../data-state";

export function useAuth(redirectTo = "") {
  const { checkAuth, user, error, setAuth } = useContext(AuthContext);

  const isAuthenticated = user !== null;
  const router = useRouter();

  function setUser(user) {
    setAuth({
      user,
      checkAuth: false,
      error: "",
    });
  }

  useEffect(() => {
    if (!checkAuth) return;

    async function performAuthCheck() {
      const response = await axios.get("/api/auth");

      if (response.status !== 200) {
        throw new Error("An error has occurred while checking authentication");
      }

      const { user, error } = response.data;

      setAuth({
        checkAuth: false,
        error: error !== undefined ? error : "",
        user: user !== undefined ? user : null,
      });
    }

    performAuthCheck();
  }, [checkAuth]);

  useEffect(() => {
    if (checkAuth || isAuthenticated || redirectTo === "") return;

    if (!isAuthenticated) {
      router.push(redirectTo);
    }
  }, [checkAuth]);

  return { isAuthenticated, isPending: checkAuth, user, error, setUser };
}

export default useAuth;

import { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationStatus = () => {
  const [exists, setExists] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [didRequest, setDidRequest] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isPending || didRequest) return;
    setIsPending(true);

    async function checkExisting() {
      const response = await axios.get("/api/application/exists");

      if (response.data.error) {
        setError(response.data.error);
      }

      if (response.data.exists) {
        setExists(response.data.exists);
      }

      setIsPending(false);
      setDidRequest(true);
    }

    setTimeout(checkExisting, 300);
  }, [isPending, didRequest]);

  return { isPending, didRequest, exists, error };
};

export default useApplicationStatus;

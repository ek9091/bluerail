import { useState, useEffect } from "react";
import axios from "axios";

export const useApplicationStatus = () => {
  const [status, setStatus] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [didRequest, setDidRequest] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (didRequest) return;

    async function checkApplicationStatus() {
      const response = await axios.get("/api/application/status");
      if (response.data.error) {
        setError(response.data.error);
      }

      if (response.data.status) {
        setStatus(response.data.status);
      }

      setIsPending(false);
      setDidRequest(true);
    }

    setTimeout(checkApplicationStatus, 300);
  }, [isPending, didRequest]);

  return { isPending, didRequest, status, error };
};

export default useApplicationStatus;

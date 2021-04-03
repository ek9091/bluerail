import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: "An error has occurred while attempting to fetch data",
};

export const useApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get("/api/applicants");

        if (response.status === 200) {
          setApplicants(response.data);
        } else {
          setError(requestError);
        }
      } catch (error) {
        setError(requestError);
        console.error(error);
      }

      setIsPending(false);
    };

    setTimeout(fetchApplicants, 300);
  }, []);

  return { error, isPending, applicants };
};

export default useApplicants;

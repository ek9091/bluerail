import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: {
    type: "requestError",
    message: "An error has occurred while attempting to fetch data",
  },
};

const noApplicantsErrors = {
  error: {
    type: "noApplicantsErrors",
    message: "There is no driver available at this time",
  },
};

export const useApplicants = (rideRequest = null) => {
  const [applicants, setApplicants] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      setIsPending(true);

      try {
        const response = await axios.get("/api/applicants");

        console.log(response);

        if (response.status === 200) {
          if (response.data.length === 0) {
            setError(noApplicantsErrors);
          } else {
            setApplicants(response.data);
          }
        } else {
          setError(requestError);
        }
      } catch (error) {
        setError(requestError);
        console.error(error);
      }

      setIsPending(false);
    };

    fetchApplicants();
  }, []);

  return { error, isPending, applicants };
};

export default useApplicants;

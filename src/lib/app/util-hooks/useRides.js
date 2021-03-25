import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: {
    type: "requestError",
    message: "An error has occurred while attempting to fetch data",
  },
};

const noRidersError = {
  error: {
    type: "noRidersError",
    message: "There is no driver available at this time",
  },
};

export const useRides = () => {
  const [rides, setRides] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRides = async () => {
      setIsPending(true);

      try {
        const response = await axios.post("/api/rides");

        if (response.status === 200) {
          if (response.data.length === 0) {
            setError(noRidersError);
          } else {
            setRides(response.data);
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

    fetchRides();
  }, []);

  return { error, isPending, rides };
};

export default useRides;

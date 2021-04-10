import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: {
    type: "requestError",
    message: "An error has occurred while attempting to fetch data",
  },
};

export const useRides = ({ driver = false, history = false } = {}) => {
  const [rides, setRides] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchRides = async () => {
      setIsPending(true);

      try {
        const response = await axios.get("/api/rides", {
          params: { driver, history },
        });

        if (response.status === 200) {
          setRides(response.data);
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

import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: {
    type: "requestError",
    message: "An error has occurred while attempting to fetch data",
  },
};

const noDriverError = {
  error: {
    type: "noDriverError",
    message: "There is no driver available at this time",
  },
};

export const useDrivers = (rideRequest = null) => {
  const [drivers, setDrivers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (rideRequest === null) {
      setDrivers([]);
      return;
    }

    const fetchDrivers = async () => {
      setIsPending(true);

      try {
        const response = await axios.post("/api/drivers");

        if (response.status === 200) {
          if (response.data.length === 0) {
            setError(noDriverError);
          } else {
            setDrivers(response.data);
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

    fetchDrivers();
  }, [rideRequest]);

  return { error, isPending, drivers };
};

export default useDrivers;

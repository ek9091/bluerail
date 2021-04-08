import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: "An error has occurred while attempting to fetch data",
};

export const useDriverSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDriverSchedule = async () => {
      if (isFetched || isPending) return;
      setIsPending(true);

      try {
        const response = await axios.get("/api/driver/schedule");

        if (response.status === 200) {
          setSchedule(response.data);
        } else {
          setError(requestError);
        }
      } catch (error) {
        setError(requestError);
        console.error(error);
      }

      setIsFetched(true);
      setIsPending(false);
    };

    fetchDriverSchedule();
  }, [isFetched]);

  const refreshSchedule = () => setIsFetched(false);

  return { error, isPending, schedule, refreshSchedule };
};

export default useDriverSchedule;

import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: "An error has occurred while attempting to fetch data",
};

export const useDriverSettings = () => {
  const [settings, setSettings] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDriverSettings = async () => {
      try {
        const response = await axios.get("/api/driver/settings");

        if (response.status === 200) {
          setSettings(response.data);
        } else {
          setError(requestError);
        }
      } catch (error) {
        setError(requestError);
        console.error(error);
      }

      setIsPending(false);
    };

    setTimeout(fetchDriverSettings, 300);
  }, []);

  return { error, isPending, settings };
};

export default useDriverSettings;

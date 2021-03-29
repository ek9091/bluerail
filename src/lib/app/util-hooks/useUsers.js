import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: {
    type: "requestError",
    message: "An error has occurred while attempting to fetch data",
  },
};

const noUserError = {
  error: {
    type: "noUserError",
    message: "There is no driver available at this time",
  },
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsPending(true);

      try {
        const response = await axios.get("/api/users");

        if (response.status === 200) {
          if (response.data.length === 0) {
            setError(noUserError);
          } else {
            setUsers(response.data);
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

    fetchUsers();
  }, []);

  return { error, isPending, users };
};

export default useUsers;

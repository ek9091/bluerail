import { useEffect, useState } from "react";
import axios from "axios";

const requestError = {
  error: "An error has occurred while attempting to fetch data",
};

export const useUsers = (query = "") => {
  const [users, setUsers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    if (query === "") return;

    const fetchUsers = async () => {
      setIsPending(true);

      try {
        const response = await axios.get(
          `/api/users/search/${encodeURIComponent(query)}`
        );

        setIsFetched(true);

        if (response.status === 200) {
          setUsers(response.data);
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
  }, [query]);

  return { error, isPending, users, isFetched };
};

export default useUsers;

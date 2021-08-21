import { useState, useEffect } from "react";

const useGetTeams = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await setLoading(true);
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams?season=2021&amp;sportId=1`
      );
      const jsonRes = await response.json();
      await setData(jsonRes.teams);
      await setLoading(false);
    } catch (error) {
      await setError("There was an error while getting teams");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, error, data };
};

export default useGetTeams;

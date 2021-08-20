import { useState, useEffect } from "react";

const useGetTeams = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams?season=2021&amp;sportId=1`
      );
      const data = await response.json();
      setTeams(data.teams);
      setLoading(false);
    } catch (error) {
      setError("There was an error while getting teams");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, error, teams };
};

export default useGetTeams;

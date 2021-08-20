import { useState, useEffect } from "react";

const useGetTeamMembers = (teamId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {
    try {
      await setLoading(true);
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active`
      );
      const data = await response.json();
      await setTeamMembers(data.roster);
      await setLoading(false);
    } catch (error) {
      setError("There was an error while getting team members");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, error, teamMembers };
};

export default useGetTeamMembers;

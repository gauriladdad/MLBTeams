import { useState, useEffect } from "react";

const useGetTeamMembers = (teamId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(false);
      const response = await fetch(
        `http://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active`
      );
      const data = await response.json();
      setTeamMembers(data.teams);
      setLoading(true);
    } catch (error) {
      setError("There was an error while getting teams");
    }
  };

  useEffect(() => {
    fetchData();
  });

  return { loading, error, teamMembers };
};

export default useGetTeamMembers;

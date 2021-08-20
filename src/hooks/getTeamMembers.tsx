import { useState, useEffect } from "react";

const useGetTeamMembers = (teamId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  const fetchData = async () => {
    try {
      console.log("team members fetching");
      await setLoading(false);
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active`
      );
      console.log("team members fetching 2");
      const data = await response.json();
      await setTeamMembers(data.roster);
      //await setTeamMembers(data.data.roster);
      await setLoading(true);
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

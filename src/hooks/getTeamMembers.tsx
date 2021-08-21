import { useState, useEffect } from "react";

const useGetTeamMembers = (teamId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await setLoading(true);
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active`
      );
      const jsonRes = await response.json();
      await setData(jsonRes.roster || []);
      await setLoading(false);
    } catch (error) {
      setError("There was an error while getting team members");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { loading, error, data };
};

export default useGetTeamMembers;

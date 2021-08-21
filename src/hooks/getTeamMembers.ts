import { useState, useEffect } from "react";

interface Person {
  fullName: string;
}

interface Position {
  type: string;
}
export interface TeamMemberInterface {
  jerseyNumber: string;
  person: Person;
  position: Position;
}

const useGetTeamMembers = (teamId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(new Array<TeamMemberInterface>());

  useEffect(() => {
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

    fetchData();
  }, []);

  return { loading, error, data };
};

export default useGetTeamMembers;

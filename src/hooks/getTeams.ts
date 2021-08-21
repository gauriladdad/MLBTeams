import { useState, useEffect } from "react";

interface League {
  name: string;
}

interface Division {
  name: string;
}

export interface TeamInterface {
  id: string;
  name: string;
  teamName: string;
  league: League;
  division: Division;
  clubName: string;
}

const useGetTeams = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(new Array<TeamInterface>());

  useEffect(() => {
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

    fetchData();
  }, []);

  return { loading, error, data };
};

export default useGetTeams;

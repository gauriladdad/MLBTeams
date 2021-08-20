import React, { useState } from "react";
import useGetTeams from "../hooks/getTeams";
import InfiniteScroll from "../hooks/InfiniteScroll";

function Teams() {
  const { loading: teamsLoading, teams } = useGetTeams();

  const [loading, setLoading] = useState(false);

  let hasMoreData = true;
  const loadMoreNumbers = () => {
    // setLoading(true);
    console.log("fetching");
  };
  return (
    <InfiniteScroll
      hasMoreData={hasMoreData}
      isLoading={loading}
      onBottomHit={loadMoreNumbers}
      loadOnMount={true}
    >
      {teamsLoading && <div>"Teams Loading..."</div>}
      <ol style={{ height: "300px" }}>
        {teams.map((team, i) => (
          <li key={`${team.id}${team.teamCode}`}>{team.name}</li>
        ))}
      </ol>
    </InfiniteScroll>
  );
}

export default Teams;

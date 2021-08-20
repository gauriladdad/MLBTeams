import React, { useState } from "react";
import useGetTeams from "../hooks/getTeams";
import InfiniteScroll from "../hooks/InfiniteScroll";
import useGetTeamMembers from "../hooks/getTeamMembers";

function Teams() {
  const { loading: teamsLoading, teams } = useGetTeams();
  const { loading: teamMembersLoading, teamMembers } = useGetTeamMembers(
    "2097"
  );

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
      <ol style={{ height: window.innerHeight }}>
        {teams.map((team, i) => (
          <li key={`${team.id}${team.teamCode}`}>
            <div>
              {team.name}
              <ul>
                {teamMembers.map((teamMember) => (
                  <li key={`${teamMember.parentTeamId}${teamMember.person.id}`}>
                    {teamMember.person.fullName}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </InfiniteScroll>
  );
}

export default Teams;

import React, { useReducer } from "react";
import useGetTeams from "../hooks/getTeams";
import InfiniteScroll from "../hooks/InfiniteScroll";
import useGetTeamMembers from "../hooks/getTeamMembers";
import teamsReducer from "../reducers/TeamsReducer";

function Teams() {
  const [state, dispatch] = useReducer(teamsReducer, []);

  const { loading: teamsLoading, teams } = useGetTeams(dispatch);
  const { loading: teamMembersLoading, teamMembers } = useGetTeamMembers(
    "2097",
    dispatch
  );

  let hasMoreData = true;
  const loadMoreNumbers = () => {
    console.log("fetching");
  };

  const loading = teamsLoading || teamMembersLoading;

  return (
    <InfiniteScroll
      hasMoreData={hasMoreData}
      isLoading={loading}
      onBottomHit={loadMoreNumbers}
      loadOnMount={true}
    >
      {loading && <div>"Loading..."</div>}
      <ol style={{ height: window.innerHeight }}>
        {state.map((team, i) => (
          <li key={`${team.id}${team.teamCode}`}>
            <div>
              {team.name}
              <ul>
                {team.members?.map((teamMember) => (
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

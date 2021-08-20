import React, { useReducer } from "react";
import useGetTeams from "../hooks/getTeams";
import InfiniteScroll from "../hooks/InfiniteScroll";
import useGetTeamMembers from "../hooks/getTeamMembers";
import teamsReducer from "../reducers/TeamsReducer";

function Teams() {
  const [state, dispatch] = useReducer(teamsReducer, []);

  const { loading: teamsLoading } = useGetTeams(dispatch);
  const { loading: teamMembersLoading } = useGetTeamMembers("2097", dispatch);

  let hasMoreData = true;
  const loadMoreNumbers = () => {
    console.log("fetching");
  };

  const getTeamMembers = async (teamId) => {
    try {
      console.log("team members fetching");
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=active`
      );
      const data = await response.json();
      dispatch({ type: "get_team_members_data", payload: data });
    } catch (error) {
      //setError("There was an error while getting team members");
    }
  };

  const loading = teamsLoading || teamMembersLoading;

  if (loading) {
    return <div>"Loading..."</div>;
  }

  return (
    <InfiniteScroll
      hasMoreData={hasMoreData}
      isLoading={loading}
      onBottomHit={loadMoreNumbers}
      loadOnMount={true}
    >
      <ol style={{ height: window.innerHeight }}>
        {state.map((team, i) => (
          <li key={`${team.id}${team.teamCode}`}>
            <div>
              <button
                onClick={() => {
                  getTeamMembers(team.id);
                }}
              >
                {team.name}
              </button>
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

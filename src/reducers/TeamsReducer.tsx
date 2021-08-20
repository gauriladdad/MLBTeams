const teamsReducer = (teams, action) => {
  switch (action.type) {
    case "get_teams_data":
      return [...teams, ...action.payload];

    case "get_team_members_data":
      return teams.map((team) => {
        if (team.id === action.payload.teamId) {
          team.members = action.payload.roster;
        }
        return team;
      });
    default:
      break;
  }
};

export default teamsReducer;

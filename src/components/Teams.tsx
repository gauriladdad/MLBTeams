import React, { useReducer } from "react";
import useGetTeams from "../hooks/getTeams";
import teamsReducer from "../reducers/TeamsReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table } from "react-bootstrap";

function Teams() {
  const [state, dispatch] = useReducer(teamsReducer, []);
  const { loading } = useGetTeams(dispatch);

  const getTeamMembers = (teamId) => {};

  if (loading) {
    return <div>"Loading..."</div>;
  }

  return (
    <Table hover variant="dark">
      <thead>
        <tr>
          <th></th>
          <th>Team</th>
          <th>League</th>
        </tr>
      </thead>
      <tbody>
        {state.map((team, i) => (
          <tr>
            <td className={`align-items-center`}>{`${i + 1}`}</td>
            <td>
              <Button
                variant="link"
                style={{ color: "#FFF", textDecoration: "none" }}
                onClick={() => {
                  getTeamMembers(team.id);
                }}
              >
                {team.name}
              </Button>
            </td>
            <td>{team.league.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Teams;

/*  <ul>
                {team.members?.map((teamMember) => (
                  <li key={`${teamMember.parentTeamId}${teamMember.person.id}`}>
                    {teamMember.person.fullName}
                  </li>
                ))}
              </ul>*/

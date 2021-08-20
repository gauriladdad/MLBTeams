import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Card } from "react-bootstrap";
import useGetTeams from "../hooks/getTeams";
import { useHistory } from "react-router-dom";

function Teams() {
  const { teams, loading } = useGetTeams();
  const history = useHistory();

  const displayTeamMembers = (team) => {
    history.push(`/teamMembers/${team.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="mx-auto my-2">
      <Card.Header className={`text-center border-0`}>
        {`MLB Teams`}
      </Card.Header>
      <Card.Body>
        <Table hover variant="light">
          <thead>
            <tr>
              <th></th>
              <th>Team</th>
              <th>League</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, i) => (
              <tr
                onClick={() => displayTeamMembers(team)}
                key={`${team.name}${team.id}`}
              >
                <td className={`align-items-center`}>{`${i + 1}`}</td>
                <td>{team.name}</td>
                <td>{team.league.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
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

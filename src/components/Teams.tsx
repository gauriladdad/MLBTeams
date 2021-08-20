import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import useGetTeams from "../hooks/getTeams";

function Teams() {
  const { teams, loading } = useGetTeams();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
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
          <tr key={`${team.name}${team.id}`}>
            <td className={`align-items-center`}>{`${i + 1}`}</td>
            <td>
              <Link to={`/teamMembers/${team.id}`}>{team.name}</Link>
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

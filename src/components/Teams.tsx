import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import useGetTeams, { TeamInterface } from "../hooks/getTeams";
import { useHistory } from "react-router-dom";
import styles from "./Teams.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

/** Notes:
 * Add loading indicator
 * Add Error message
 * Fetch and display teams sorted by division name
 * Empty division name teams will appaer towards the end of list
 * Click on a team row - should display team members list
 */

function teamsSortByDivision(a, b) {
  if (a.division?.name === undefined) {
    return 1;
  } else if (b.division?.name === undefined) {
    return 1;
  }
  var nameA = (a.division?.name || "").toLowerCase(),
    nameB = (b.division?.name || "").toLowerCase();
  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

function Teams() {
  const { data, loading, error } = useGetTeams();
  const history = useHistory();
  const [teams, setTeams] = useState(new Array<TeamInterface>());

  useEffect(() => {
    setTeams([...data]);
  }, [data]);

  const displayTeamMembers = (team) => {
    history.push(`/teamMembers/${team.id}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="mx-3 my-3">
      <Card.Header className={`text-center border-0`}>
        {`MLB Teams`}
      </Card.Header>
      <Card.Body>
        <Table responsive hover>
          <caption>List of MLB Teams</caption>
          <thead>
            <tr>
              <th className={styles.headerColor} colSpan={2} rowSpan={2}>
                TEAM
              </th>
              <th className={styles.headerColor} rowSpan={2}>
                CLUB
              </th>
              <th className={styles.headerColor} colSpan={2}>
                DIVISION
              </th>
            </tr>
            <tr>
              <th className={styles.headerColor}>LEAGUE</th>
              <th className={styles.headerColor}>DIVISION</th>
            </tr>
          </thead>
          <tbody>
            {teams.sort(teamsSortByDivision).map((team, i) => (
              <tr
                onClick={() => displayTeamMembers(team)}
                key={`${team.name}${team.id}`}
              >
                <td className={`align-items-center`}>{`${i + 1}`}</td>
                <td>{team.name}</td>
                <td>{team.clubName}</td>
                <td>{team.league.name}</td>
                <td>{team.division?.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Teams;

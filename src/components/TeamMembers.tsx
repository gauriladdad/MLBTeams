import React from "react";
import { useParams } from "react-router-dom";
import useGetTeamMembers from "../hooks/getTeamMembers";
import { Table, ListGroup, Card } from "react-bootstrap";

function TeamMembers() {
  let { id } = useParams();
  const { teamMembers, loading } = useGetTeamMembers(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupByPosition = {};

  for (const teamMember of teamMembers) {
    const positionType = teamMember.position.type;
    if (!groupByPosition[positionType]) {
      groupByPosition[positionType] = [];
    }
    groupByPosition[positionType].push({ teamMember });
  }

  return (
    <>
      <div>
        <ul>
          {Object.keys(groupByPosition).map(function (keyName, keyIndex) {
            return (
              <Card>
                <Card.Header className={`text-center border-0`}>
                  {`${keyName}s`}
                </Card.Header>
                <Card.Body>
                  {groupByPosition[keyName].map((positionHolder, i) => (
                    <ListGroup key={`${positionHolder.teamMember.person.id}`}>
                      <ListGroup.Item>
                        {`${positionHolder.teamMember.jerseyNumber}  ${positionHolder.teamMember.person.fullName}`}
                      </ListGroup.Item>
                    </ListGroup>
                  ))}
                </Card.Body>
              </Card>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default TeamMembers;

/*  <ul>
                {team.members?.map((teamMember) => (
                  <li key={`${teamMember.parentTeamId}${teamMember.person.id}`}>
                    {teamMember.person.fullName}
                  </li>
                ))}
              </ul>*/

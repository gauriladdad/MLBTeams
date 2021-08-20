import React from "react";
import { useParams } from "react-router-dom";
import useGetTeamMembers from "../hooks/getTeamMembers";
import { ListGroup, Card } from "react-bootstrap";

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
    <ul>
      {Object.keys(groupByPosition).map(function (keyName, keyIndex) {
        return (
          <Card key={`${keyName}`}>
            <Card.Header className={`text-center border-0`}>
              {`${keyName}s`}
            </Card.Header>
            <Card.Body>
              {groupByPosition[keyName].map((positionHolder, i) => (
                <ListGroup key={`${i}${positionHolder.teamMember.person.id}`}>
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
  );
}

export default TeamMembers;

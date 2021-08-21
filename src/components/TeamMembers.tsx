import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetTeamMembers from "../hooks/getTeamMembers";
import { ListGroup } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

function TeamMembers() {
  let { id } = useParams();
  const { data, loading } = useGetTeamMembers(id);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    setTeamMembers([...data]);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupByPosition = {};

  if (teamMembers.length === 0) {
    return (
      <Card className="mx-5 my-5" key={"empty"}>
        <Card.Header className={`text-center border-0`}>
          Wanna Join?
        </Card.Header>
        <Card.Body>
          We are busy getting the best players, please visit later.
        </Card.Body>
      </Card>
    );
  }

  for (const teamMember of teamMembers) {
    const positionType = teamMember.position.type;
    if (!groupByPosition[positionType]) {
      groupByPosition[positionType] = [];
    }
    groupByPosition[positionType].push({ teamMember });
  }

  return (
    <Accordion className="mx-4 my-4" defaultActiveKey="0">
      {Object.keys(groupByPosition).map(function (keyName, keyIndex) {
        return (
          <Accordion.Item eventKey={`${keyIndex}`}>
            <Accordion.Header>{`${keyName}s`}</Accordion.Header>
            <Accordion.Body>
              {groupByPosition[keyName]
                .sort(
                  (a, b) =>
                    (a.teamMember.jerseyNumber || NaN) -
                    (b.teamMember.jerseyNumber || NaN)
                )
                .map((positionHolder, i) => (
                  <ListGroup key={`${i}${positionHolder.teamMember.person.id}`}>
                    <ListGroup.Item>
                      {`${positionHolder.teamMember.jerseyNumber}  ${positionHolder.teamMember.person.fullName}`}
                    </ListGroup.Item>
                  </ListGroup>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

export default TeamMembers;

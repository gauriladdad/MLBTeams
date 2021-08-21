import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import useGetTeamMembers, {
  TeamMemberInterface
} from "../hooks/getTeamMembers";
import { ListGroup } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

/** Notes:
 * Add loading indicator
 * Add Error message
 * Handle scenario of no team members
 * Group and display team members by their position type
 * Display group of position type in an accordion and expand first by default
 * NaN on sort is to push the elements without jerseyNumber towards bottom of the list */

function membersSortByJerseyNumber(a?, b?) {
  return (
    (a?.teamMember?.jerseyNumber || NaN) - (b?.teamMember?.jerseyNumber || NaN)
  );
}

function TeamMembers() {
  let { id } = useParams();
  const { data, loading, error } = useGetTeamMembers(id);
  const [teamMembers, setTeamMembers] = useState(
    new Array<TeamMemberInterface>()
  );

  const groupByPosition = useMemo(() => {
    const groups = {};
    for (const teamMember of teamMembers) {
      const positionType = teamMember.position.type;
      if (!groups[positionType]) {
        groups[positionType] = [];
      }
      groups[positionType].push({ teamMember });
    }
    return { ...groups };
  }, [teamMembers]);

  useEffect(() => {
    setTeamMembers([...data]);
  }, [data]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

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

  return (
    <Accordion className="mx-4 my-4" defaultActiveKey="0">
      {Object.keys(groupByPosition).map(function (keyName, keyIndex) {
        return (
          <Accordion.Item eventKey={`${keyIndex}`}>
            <Accordion.Header>{`${keyName}s`}</Accordion.Header>
            <Accordion.Body>
              {groupByPosition[keyName]
                .sort(membersSortByJerseyNumber)
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

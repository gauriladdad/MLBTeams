import React from "react";
import { useParams } from "react-router-dom";
import useGetTeamMembers from "../hooks/getTeamMembers";

function TeamMembers() {
  let { id } = useParams();
  const { teamMembers } = useGetTeamMembers(id);

  return (
    <ul>
      {teamMembers?.map((teamMember) => (
        <li key={`${teamMember.parentTeamId}${teamMember.person.id}`}>
          {teamMember.person.fullName}
        </li>
      ))}
    </ul>
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

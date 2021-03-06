import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const TeamsWrapper = styled.section`
	grid-column: 1;
	grid-row: 1 / 4;
	background-color: #362234;
	color: #958993;
`;

const TeamList = styled.ul`
	width: 100%;
	padding-left: 0;
	list-style: none;
`;

const TeamItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5em;
	color: #fff;
	background-color: #676066;
	height: 3rem;
	width: 3rem;
	
	margin: auto;
	margin-bottom: 10px;
	border-radius: .5rem;

	transition: .3s border ease-in;
	&:hover {
		border-style: solid;
		border-width: thick;
		border-color: #767676;
	}
`;

const team = ({ id, letter }) => (
  <Link key={`team-${id}`} to={`/view-team/${id}`} >
    <TeamItem>{letter}</TeamItem>
  </Link>
);

team.propTypes = {
  id: PropTypes.number.isRequired,
  letter: PropTypes.string.isRequired,
};

function Teams({ teams }) {
  return (
    <TeamsWrapper>
      <TeamList>
        {teams.map(team)}
      </TeamList>
    </TeamsWrapper>
  );
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Teams;

import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const TeamsWrapper = styled.section`
	grid-column: 1;
	grid-row: 1 / 4;
	background-color: #362234;
	color: #958993;
`;

const team = ({ id, letter }) => (
  <li key={`user-${id}`}>{letter}</li>
);

function Teams({ teams }) {
  return (
    <TeamsWrapper>
      <ul>
        {teams.map(team)}
      </ul>
    </TeamsWrapper>
  );
}

Teams.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Teams;

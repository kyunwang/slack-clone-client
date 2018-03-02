import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ChannelsWrapper = styled.section`
	grid-column: 2;
	grid-row: 1 / 4;
	background-color: #4e3a4c;
	color: #958993;
`;

const channel = ({ id, name }) => (
  <li key={`channel-${id}`}># {name}</li>
);

const user = ({ id, name }) => (
  <li key={`user-${id}`}>{name}</li>
);

function Channels({
  teamName, username, channels, users,
}) {
  return (
    <ChannelsWrapper>
      <div>
        {teamName}
        {username}
      </div>
      <div>
        <ul>
          <li>Channels</li>
          {channels.map(channel)}
        </ul>
      </div>
      <div>
        <ul>
          <li>Direct messages</li>
          {users.map(user)}
        </ul>
      </div>
    </ChannelsWrapper>
  );
}

Channels.propTypes = {
  teamName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Channels;

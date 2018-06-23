import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';

const ChannelsWrapper = styled.section`
	grid-column: 2;
	grid-row: 1 / 4;
	background-color: #4e3a4c;
	color: #958993;
`;

const paddingLeft = 'padding-left: 10px';

const PushLeft = styled.div`
	${paddingLeft};
`;

const TeamNameHeader = styled.h1`
	color: #fff;
	font-size: 1.5em;
`;

const SideBarList = styled.ul`
	width: 100%;
	list-style: none;
	padding-left: 0;
`;

const SideBarHeaderList = styled.li`
	${paddingLeft};
`;

const SideBarListItem = styled.li`
	${paddingLeft};
	padding-top: 3px;
	&:hover {
		background: #3e313c;
	}
`;

const Green = styled.span`
	color: #38973d;
`;

const Bubble = ({ on }) => (on ? <Green>●</Green> : '○');
Bubble.propTypes = { on: PropTypes.bool };
Bubble.defaultProps = { on: false };

const Channel = ({ id, name }) => <SideBarListItem key={`channel-${id}`}># {name}</SideBarListItem>;

Channel.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const User = ({ id, name }) => (
  <SideBarListItem key={`user-${id}`}>
    <Bubble /> {name}
  </SideBarListItem>
);

User.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

function Channels({
  teamName, username, channels, users, onToggleChannelClick,
}) {
  return (
    <ChannelsWrapper>
      <PushLeft>
        <TeamNameHeader>{teamName}</TeamNameHeader>
        {username}
      </PushLeft>
      <div>
        <SideBarList>
          <SideBarHeaderList>
						Channels
            <Icon name="add circle" onClick={onToggleChannelClick} />
          </SideBarHeaderList>
          {channels.map(Channel)}
        </SideBarList>
      </div>
      <div>
        <SideBarList>
          <SideBarHeaderList>Direct messages</SideBarHeaderList>
          {users.map(User)}
        </SideBarList>
      </div>
    </ChannelsWrapper>
  );
}

Channels.propTypes = {
  teamName: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddChannel: PropTypes.func,
};

export default Channels;

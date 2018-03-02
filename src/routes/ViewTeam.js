import React from 'react';

import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

function ViewTeam(props) {
  return (
    <AppLayout>
      <Teams
        teams={[
			{ id: 1, letter: 'T' },
			{ id: 2, letter: 'G' },
		]}
      />
      <Channels
        teamName="Team name"
        username="username"
        channels={[
			  { id: 1, name: 'general' },
			  { id: 2, name: 'random' },
		  ]}
        users={[
			  { id: 1, name: 'slackbot' },
			  { id: 2, name: 'user1' },
		  ]}
      />
      <Header channelName="General" />
      <Messages>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName="General" />
    </AppLayout>
  );
}

export default ViewTeam;

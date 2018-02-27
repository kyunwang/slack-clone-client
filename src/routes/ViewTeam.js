import React from 'react';

import AppLayout from '../components/AppLayout';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import MessageInput from '../components/MessageInput';

function ViewTeam(props) {
  return (
    <AppLayout>
      <Teams>Teams</Teams>
      <Channels>Channels</Channels>
      <Header>Header</Header>
      <Messages>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <MessageInput>
        <input type="text" placeholder="CSS Grid Layout Module" />
      </MessageInput>
    </AppLayout>
  );
}

export default ViewTeam;

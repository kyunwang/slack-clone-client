import React from 'react';

import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Sidebar from '../containers/Sidebar';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

function ViewTeam(props) {
  return (
    <AppLayout>
      <Header channelName="General" />
      <Sidebar currentTeamId={4} />
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

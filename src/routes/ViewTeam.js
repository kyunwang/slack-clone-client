import React from 'react';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import Header from '../components/Header';
import Sidebar from '../containers/Sidebar';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';

const propTypes = {
  match: PropTypes.object.isRequired,
};

function ViewTeam({ match: { params } }) {
  return (
    <AppLayout>
      <Header channelName="General" />
      <Sidebar currentTeamId={params.teamId} />
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

ViewTeam.propTypes = propTypes;

export default ViewTeam;

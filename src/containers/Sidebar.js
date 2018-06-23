import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import findIndex from 'lodash/findIndex';
import decode from 'jwt-decode';

import Channels from '../components/Channels';
import Teams from '../components/Teams';
import AddChannelModal from '../components/AddChannelModal';

class Sidebar extends Component {
	static propTypes = {
	  data: PropTypes.object.isRequired,
	  currentTeamId: PropTypes.string.isRequired,
	};

	state = {
	  openAddChannelModal: false,
	};

	handleToggleChannelClick = () => {
	  this.setState(prevState => ({ openAddChannelModal: !prevState.openAddChannelModal }));
	};

	render() {
	  const { openAddChannelModal } = this.state;

	  const {
	    data: { loading, allTeams },
	    currentTeamId,
	  } = this.props;

	  if (loading) {
	    return null;
	  }

	  const teamIdIndex = currentTeamId
	    ? findIndex(allTeams, ['id', parseInt(currentTeamId, 10)])
	    : 0;

	  const team = allTeams[teamIdIndex];

	  let username = '';

	  try {
	    const token = localStorage.getItem('token');
	    const { user } = decode(token);
	    // eslint-disable-next-line prefer-destructuring
	    username = user.username;
	  } catch (err) {}

	  return (
  <Fragment>
    <Teams
      teams={allTeams.map(t => ({
						id: t.id,
						letter: t.name.charAt(0).toUpperCase(),
					}))}
    />
    <Channels
      teamName={team.name}
      username={username}
      channels={team.channels}
      users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
      onToggleChannelClick={this.handleToggleChannelClick}
    />
    <AddChannelModal
      teamId={currentTeamId}
      open={openAddChannelModal}
      onClose={this.handleToggleChannelClick}
      key="sidebar-add-channel-modal"
    />
  </Fragment>
	  );
	}
}

const allTeamsQuery = gql`
	{
		allTeams {
			id
			name
			channels {
				id
				name
			}
		}
	}
`;

export default graphql(allTeamsQuery)(Sidebar);

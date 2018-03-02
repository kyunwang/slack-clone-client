import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'semantic-ui-react';

import styled from 'styled-components';

const SendMessageWrapper = styled.div`
	grid-column: 3;
	grid-row: 3;
	margin: 1.5rem;
`;

function SendMessage({ channelName }) {
  return (
    <SendMessageWrapper>
      <Input
        fluid
        placeholder={`Message #${channelName}`}
      />
    </SendMessageWrapper>
  );
}

SendMessage.propTypes = {
  channelName: PropTypes.string.isRequired,
};

export default SendMessage;

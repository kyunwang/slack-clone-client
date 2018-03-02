import React from 'react';
import PropTypes from 'prop-types';

import { Header as HeaderUI } from 'semantic-ui-react';

import styled from 'styled-components';


const HeaderWrapper = styled.header`
	grid-column: 3;
	grid-row: 1;
`;

function Header({ channelName }) {
  return (
    <HeaderWrapper>
      <HeaderUI textAlign="center">#{channelName}</HeaderUI>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  channelName: PropTypes.string.isRequired,
};

export default Header;

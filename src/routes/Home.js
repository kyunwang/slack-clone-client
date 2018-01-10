import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function Home({ data: { loading, getAllUsers } }) {
  return loading
    ? null
    : getAllUsers.map(user => <h1 key={user.id}>{user.email}</h1>);
}

const getAllUsersQuery = gql`
  query {
    getAllUsers {
      id
      username
      email
    }
  }
`;

export default graphql(getAllUsersQuery)(Home);

import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function Home({ data: { loading, getAllUsers } }) {
  return loading
    ? null
    : getAllUsers.map(user => <h1 key={user.id}>{user.email}</h1>);
}

// Create a query getting all users and the selected data
const getAllUsersQuery = gql`
  query {
    getAllUsers {
      id
      username
      email
    }
  }
`;

// Link Home component to graphql and insert the gql query
export default graphql(getAllUsersQuery)(Home);

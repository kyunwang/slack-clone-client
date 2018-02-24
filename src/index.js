import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

// Creating a new instance of ApolloClient
const client = new ApolloClient({
  // Add a custom endpoint
  // Default is host/graphql
  link: new HttpLink({ uri: 'http://localhost:8084/graphql' }),
  // InMemoryCache is a normalized data store
  cache: new InMemoryCache(),
});

// Connecting the client to tha app through ApolloProvider
const App = (
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById('root'));
registerServiceWorker();

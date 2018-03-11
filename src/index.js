import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

import 'semantic-ui-css/semantic.min.css';

import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({ uri: 'http://localhost:8084/graphql' });

// Runs before any graphql request
const middlewareLink = setContext(() => ({
  headers: {
	  'x-token': localStorage.getItem('token'),
	  'x-refresh-token': localStorage.getItem('refreshToken'),
  },
}));

// Runs after every graphql request
const afterwareLink = new ApolloLink((operation, forward) => {
  // Returns a object with headers in it
  const { headers } = operation.getContext();

  if (headers) {
	  const token = headers.get('x-token');
	  const refreshToken = headers.get('x-refresh-token');

	  if (token) {
		 localStorage.setItem('token', token);
	  }

	  if (refreshToken) {
		 localStorage.setItem('refreshToken', refreshToken);
	  }
  }

  // Go to next step // Similar to next( from node)
  return forward(operation);
});

const link = afterwareLink.concat(middlewareLink.concat(httpLink));

// Creating a new instance of ApolloClient
const client = new ApolloClient({
  // Add a custom endpoint
  // Default is host/graphql
  link,
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

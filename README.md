# Slack-clone-client

Learning along with a tutorial from benawad.
Link to the server [repo](#server-url)

* Graphql
* Postgresql
* Apollo (react-apollo)
* Semantic-UI

Notes will be written down here and some more stuff to return to for me. Mostly from the docs.

Not everything is noted here by all means. Only the basic things are noted here of which I think is important. So don't forget to check the documentation of them too.

*Using create-react-app*

## Table of content

1. [Apollo](#)
	- [Connecting](#)
	<!-- - [](#) -->
	<!-- - [](#) -->
<!-- 1. [](#) -->


## Apollo
Check the docs if you need specific information and help with your setup.
[Docs: react-apollo](#react-apollo)

This is for apollo-client 2.0
### Connecting
Connecting our app to GraphQL via Apollo

`ApolloClient` manages all the data from GraphQL.

First we need to create a `ApolloClient` instance which point at the GraphQL endpoint.

```
	import { ApolloClient } from 'apollo-client';
	import { HttpLink } from 'apollo-link-http';
	import { InMemoryCache } from 'apollo-cache-inmemory';
	
	const client = new ApolloClient({
		link: new HttpLink(),
		cache: new InMemoryCache()
	});
```

*A new instance is creating using installed packages from npm.*


`ApolloProvider` makes Apollo available in any component in the React hierarchy.

```
	import { ApolloProvider } from 'react-apollo';

	const App = (
	<ApolloProvider client={client}>
		<Routes />
	</ApolloProvider>
	);

	ReactDOM.render(App, document.getElementById('root'));
```

Here the `client` is connected to the react component tree. It is suggested to put `ApolloProvider` somewhere high in the app.


### Querying
Making a simple query with `react-apollo`

First import `graphql-tag` and `grapql`

**Setup**
```
	import gql from 'graphql-tag';
	import { graphql } from 'react-apollo';
```

We use `graphql-tag` to create the query and `react-apollo` to connect graphql with our component. 

*Think of it as connecting a `Redux` store to the component*
Seems pretty similar to me.

**Create the query**
We need to define what we want first ofcourse and do that with `graphql-tag` which we called `gql`

```
	const getAllUsersQuery = gql`
		query {
			getAllUsers {
				username
				email
			}
		}
	`;

	export default graphql(getAllUsersQuery)(Component);
```

The query is assigned to the variable `getAllUsersQuery` and we define it as query with `query{ ... }`

We call the `getAllUsers` Query defined on the server and request the `username` and `email`


Then we export the component where we connect graphql with the component while passing the query to the component.

**Accessing to the data**

The data/query will be passed to the props of the component. The prop will be called data, where in the query is accessible in. By default data will include a `loading` prop.

*A stateless component to illustrate*

```
	function Component({ data: { loading, getAllUsers } }) {
		return loading
			? null
			: getAllUsers.map(user => (
				<h1 key={user.id}>{user.email}</h1>
			));
	}
```

In the example we deconstruct the props and get the data which `graphql` has provided us with.
We get `loading` and `getAllUsers` out of data. When everything has been loaded we map out all the emails received from `getAllUsers`


**Create a mutations**

Apart from queries you can ofcourse have `mutations` too (Create Update Delete)

The base for creating an mutation is the same as for a query, but we will pass variabled to it too.

```
	const registerMutation = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			... // The response you return
		}
	}
	`;
```

The `$username: String!` indicates that a variable called `username` can be passed to the mutation. The `String!` indicates that the type should be a `String` and the `!` sign indicates that is may not be NULL.

**Calling the mutation** 

To call the mutation you first have to connect the query to the component just like queries. It is all the same.

```
	export default graphql(registerMutation)(Component);
```

To mutate you pass the variables like so
```
	const response = this.props.mutate({
		variables: {
			username: 'username',
			emai;: 'emai;',
			password: 'password',
		}
	});
```

`graphql` gives you a `mutate` prop which you pass `variables` to. And we will save the response in `const response`


[server-url]: https://github.com/kyunwang/slack-clone-server

[react-apollo]: https://www.apollographql.com/docs/react
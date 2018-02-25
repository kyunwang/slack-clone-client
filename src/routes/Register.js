import React, { Component } from 'react';
import { Container, Header, Input, Button, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends Component {
state = {
  username: '',
  usernameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
};

onChange = (e) => {
  const { name, value } = e.target;

  // Set state property on basis of the input name
  this.setState({ [name]: value });
};

onSubmit = async () => {
// Reset our errors
  this.setState({
    usernameError: '',
    emailError: '',
    passwordError: '',
  });


  const { username, email, password } = this.state;

  // Mutate with the following variables
  const response = await this.props.mutate({
    variables: { username, email, password },
  });

  // Get the returned response from the mutation defined below
  const { ok, errors } = response.data.register;
  if (ok) {
    this.props.history.push('/');
  } else {
    const err = {};
    errors.forEach(({ path, message }) => {
      err[`${path}Error`] = message;
    });

    this.setState(err);
  }

  console.log(response.data.register);
};

render() {
  const {
    username,
    email,
    password,
    usernameError,
    emailError,
    passwordError,
  } = this.state;

  // If there are errors push them to this list
  const errorList = [];

  if (usernameError) {
    errorList.push(usernameError);
  }
  if (emailError) {
    errorList.push(emailError);
  }
  if (passwordError) {
    errorList.push(passwordError);
  }


  return (
    <Container text>
      <Header as="h2">Register</Header>
      <Input
        error={!!usernameError}
        name="username"
        onChange={this.onChange}
        value={username}
        fluid
        placeholder="Username"
      />
      <Input
        error={!!emailError}
        name="email"
        onChange={this.onChange}
        value={email}
        fluid
        placeholder="Email"
      />
      <Input
        error={!!passwordError}
        name="password"
        type="password"
        onChange={this.onChange}
        value={password}
        fluid
        placeholder="Password"
      />
      <Button onClick={this.onSubmit}>Submit</Button>

      {(usernameError || emailError || passwordError) ?
        <Message
          error
          header="There was some errors in your submission"
          list={errorList}
        />
			: null
		}
    </Container>
  );
}
}

// Defining the varibales like $variable: String!
const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);

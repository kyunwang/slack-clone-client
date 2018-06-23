import React, { Component } from 'react';
import { extendObservable, observable } from 'mobx';
import { observer } from 'mobx-react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Container, Header, Input, Button, Message, Form } from 'semantic-ui-react';

// Test and try code using mobx
// Option 1: Ask mobx to track this value. Seperate the state from the component
// const loginState = observable({
//   email: '',
//   password: '',
// });

// Example of seperating methods out of the component
// loginState.onChange = function (e) {
//   const { name, value } = e.target;
//   loginState[name] = value;
// };


class Login extends Component {
  constructor(props) {
    super(props);

    // Option 2: Extends observable over 'this'
    // Store lives in the component
    extendObservable(this, {
      email: '',
      password: '',
      errors: {},
    });
  }

	onSubmit = async () => {
	  const { email, password } = this;
	  console.log(email, password);

	  const response = await this.props.mutate({
	    variables: { email, password },
	  });

	  const {
	    ok, token, refreshToken, errors,
	  } = response.data.login;

	  if (ok) {
	    localStorage.setItem('token', token);
		 localStorage.setItem('refreshToken', refreshToken);
		 this.props.history.push('/view-team');
	  } else {
	    const err = {};
	    errors.forEach(({ path, message }) => {
	      err[`${path}Error`] = message;
	    });
	    this.errors = err;
	  }


	  console.log(response.data.login);
	}

	onChange = (e) => {
	  const { name, value } = e.target;
	  this[name] = value;
	}

	render() {
	  const { email, password, errors: { emailError, passwordError } } = this;

	  const errorList = [];

	  if (emailError) {
		  errorList.push(emailError);
	  }

	  if (passwordError) {
		  errorList.push(passwordError);
	  }

	  return (
  <Container text>
    <Header as="h2">Login</Header>
    <Form>
      <Form.Field error={!!emailError}>
        <Input
          name="email"
			//  onChange={loginState.onChange}
			//  value={loginState.email}
          onChange={this.onChange}
          value={this.email}
          fluid
          placeholder="Email"
        />
      </Form.Field>
      <Form.Field error={!!passwordError}>
        <Input
          name="password"
          type="password"
          onChange={this.onChange}
          value={this.password}
          fluid
          placeholder="Password"
        />
      </Form.Field>
      <Button onClick={this.onSubmit}>Submit</Button>
    </Form>
    {errorList.length ? (
      <Message
        error
        header="There was some errors in you submission"
        list={errorList}
      />
		) : null}
  </Container>
	  );
	}
}

const loginMutation = gql`
	mutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			ok
			token
			refreshToken
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(loginMutation)(observer(Login));


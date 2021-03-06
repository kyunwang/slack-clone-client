import React, { Component } from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import {
  Container,
  Form,
  Header,
  Button,
  Message,
  Input,
} from 'semantic-ui-react';

class CreateTeam extends Component {
  constructor(props) {
    super(props);

    extendObservable(this, {
      name: '',
      errors: {},
    });
  }

onSubmit = async () => {
  const { name } = this;
  let response = null;

  try {
	  response = await this.props.mutate({
		  variables: { name },
    });
  } catch (err) {
    // If you are not logged in
    return this.props.history.push('/');
  }

  // Reset errors
  this.errors = {};

  const { ok, errors, team } = response.data.createTeam;

  if (ok) {
	 console.log('ok');
	 this.props.history.push(`/view-team/${team.id}`);
  } else {
    const err = {};

    errors.forEach(({ path, message }) => {
      err[`${path}Error`] = message;
    });

    this.errors = err;
  }

  console.log(response.data.createTeam);
}

onChange = (e) => {
  const { name, value } = e.target;

  this[name] = value;
}

render() {
  const { name, errors: { nameError } } = this;

  const errorList = [];

  if (nameError) {
    errorList.push(nameError);
  }

  return (
    <Container text>
      <Header>Create team form</Header>
      <Form>
        <Form.Field error={!!nameError}>
          <Input
            name="name"
            onChange={this.onChange}
            value={name}
            placeholder="name"
            fluid
          />
        </Form.Field>
        <Button onClick={this.onSubmit}>Submit</Button>
      </Form>
      {errorList.length ? (
        <Message
          error
          header="This name already exists"
          list={errorList}
        />
	) : null}
    </Container>
  );
}
}

const createTeamMutation = gql`
	mutation($name: String!) {
		createTeam(name: $name) {
			ok
			team {
				id
			}
			errors {
				path
				message
			}
		}
	}
`;

export default graphql(createTeamMutation)(observer(CreateTeam));

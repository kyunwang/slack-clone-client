import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

import { Button, Input, Form, Modal } from 'semantic-ui-react';
import { withFormik } from 'formik';

function AddChannelModal({
  open,
  onClose,
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  teamId,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add new channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input
              fluid
              name="name"
              value={values.name}
              placeholder="Channel Name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Field>
          <Form.Group widths="equal">
            <Button fluid disabled={isSubmitting} onClick={onClose}>
							Cancel
            </Button>
            <Button fluid disabled={isSubmitting} onClick={handleSubmit}>
							Add Channel
            </Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

const createChannelMutation = gql`
	mutation($teamId: Int!, $name: String!) {
		createChannel(teamId: $teamId, name: $name)
	}
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    // Transform outer props into form values
    mapPropsToValues: () => ({ name: '' }),
    handleSubmit: async (values, { props: { teamId, mutate, onClose }, setSubmitting }) => {
      await mutate({ variables: { teamId, name: values.name } });
      onClose();
      setSubmitting(false);
    },
  }),
)(AddChannelModal);

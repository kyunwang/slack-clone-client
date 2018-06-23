import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: () => ({ name: '' }),
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('Submitting');
    console.log(values);

    setSubmitting(false);
  },
})(AddChannelModal);

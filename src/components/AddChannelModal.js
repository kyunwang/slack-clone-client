import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Input, Form, Modal } from 'semantic-ui-react';

function AddChannelModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Add new channel</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Input fluid placeholder="Channel name" />
          </Form.Field>
          <Form.Group widths="equal">
            <Button fluid>Cancel</Button>
            <Button fluid>Create Channel</Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  );
}

export default AddChannelModal;

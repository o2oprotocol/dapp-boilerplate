import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';

class StaticModal extends Component {
  render() {
    return (
      <Modal show={this.props.show}>
        <Modal.Body className='text-center'>
          {this.props.children}
        </Modal.Body>
      </Modal>
    );
  }
}

export default StaticModal;

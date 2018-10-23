import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import Camera from './camera.jsx'
//desplegar makerpass ticket
class Attendance extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onOpenModal() {
    this.setState({ open: true });
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <button title='Attendance' className="button1" onClick={this.onOpenModal}><i class="fas fa-user-check"></i>
        <p className="textcolor">
        </p>
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <Camera />
        </Modal>
      </div>
    )}
}

export default Attendance;

import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import Survey from './survey.jsx'

class Retrospective extends Component {

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
        <button title='Weekly Survey' className='button3' onClick={this.onOpenModal}><i class="weekly material-icons">check_box</i></button>
        <Modal open={open} onClose={this.onCloseModal} center>
        <iframe className="weeklyRetrosFrame" src="https://docs.google.com/forms/d/e/1FAIpQLSccvjf18kfMxSFAcmi_Nptxhz6ySSd-x_16Nly5XFOf1Ur2IA/viewform?embedded=true" width="640" height="3838" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
        </Modal>
      </div>
    )}
}


export default Retrospective;

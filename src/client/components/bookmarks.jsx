import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import Addbookmark from './addbookmark.jsx';
import BookMarkList from "./bookmarklist.jsx";
const axios = require("axios");


class Bookmark extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bookmarks: [],
      open: false
    }

    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.addBookmark = this.addBookmark.bind(this);
    this.getBookmark = this.getBookmark.bind(this);

  }

  componentDidMount(){
    this.getBookmark()
  }

  onOpenModal() {
    this.setState({ open: true });
  }


  onCloseModal() {
    this.setState({ open: false });
  }


  addBookmark(bookmark) {
    axios.post('/bookmarks',
    {
      bookmark: bookmark
    })
      .then((response) => {
        console.log('success', response.data)
      })
      .then(() => this.getBookmark())
      .catch((error) => {
        console.log(error)
      })

  }

  getBookmark() {

    axios.get('/bookmarks')
      .then((response) => {
        console.log('GET', response)
        this.setState({
          bookmarks: response
        })

      })
      .catch((error) => {
        console.log(error)
      })

  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <button title='Bookmarks' className="button2" onClick={this.onOpenModal}><i class="far fa-bookmark"></i></button>
        <Modal open={open} onClose={this.onCloseModal} center>

          <Addbookmark addBookmark={this.addBookmark}/>
          <BookMarkList bookmarks={this.state.bookmarks.data}/>

        </Modal>
      </div>
    )}
}


export default Bookmark;

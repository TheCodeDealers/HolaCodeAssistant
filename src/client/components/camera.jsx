import React, { Component } from "react";
import Webcam from "react-webcam";
const axios = require("axios");
import swal from 'sweetalert';


class Camera extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      tab: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.sweetalertfunction = this.sweetalertfunction.bind(this);
  }

  sweetalertfunction(src) {
   swal(src);
   }

  handleClick(){
        const screenshot = this.webcam.getScreenshot();
        this.setState({ screenshot });
      }

  onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('picture',this.state.screenshot);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload", formData, config)
            .then((response) => {
                this.sweetalertfunction(response.data +", your Attendance is recorded");
                console.log(response);
            }).catch((error) => {
              console.log(error);
        });
    }

  render() {
    console.log(this.state.screenshot)

    return (
      <div>
        <center><h1 className='attendance'>Record your Attendance!!</h1></center>
        <div className='col-md-6 camera'>
          <Webcam
            ref={node => this.webcam = node}
            audio={false}
            width='212'
            height='160'
            screenshotFormat="image/jpeg"
            />
        </div>
          <button onClick={this.handleClick} className='cameraButton'><i class="fas fa-camera"></i></button>
          {this.state.screenshot ?
            <div className='col-md-6 screenshot'>
              <div>
                <img src={this.state.screenshot} />
              </div>
              <button className='uploadButton' onClick={this.onFormSubmit}><i class="fas fa-cloud-upload-alt"></i></button>
            </div>: null}
      </div>
    )}

}
  export default Camera;

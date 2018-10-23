import React, { Component } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SideBar from './sidebar.jsx';
const axios = require("axios");
import {Container} from "mdbreact";

const socket = io.connect();

firebase.initializeApp({
apiKey: "AIzaSyB98qiRdWSgLuxVWPdfJSxJeO7luYrP7ZQ",
authDomain: "holapancho-3bcee.firebaseapp.com"
});

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedIn: false,
            isSmallDevice: this.isSmallDevice(),
            lat:'',
            lon:''
        }

        this.handleResize = this.handleResize.bind(this)
    }

    componentDidMount() {
      navigator.geolocation.getCurrentPosition(location => {
        this.setState({
          lat: location.coords.latitude,
          lon: location.coords.longitude
        })
      });

      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          isSignedIn : !!user
        });

      });
        //Event listeners
        window.addEventListener('resize', this.handleResize)

    }

    componentWillUnmount() {
        //Remove event listeners
        window.removeEventListener('resize', this.handleResize)
    }

    isSmallDevice() {
        return 768 >= window.innerWidth
    }

    handleResize() {
        const isSmallDevice = this.isSmallDevice()
        if (this.state.isSmallDevice !== isSmallDevice) {
            //Only update if it's necessary
            this.setState({
                isSmallDevice: isSmallDevice
            })
        }
    }

    render() {

      var uiConfig = {
        signInFlow: "popup",
        signInOptions: [

          firebase.auth.GithubAuthProvider.PROVIDER_ID,

        ],
        callbacks: {
          signInSuccess: () => false
        }
      };

          return (

            <div className={`${this.state.isSignedIn ? '' : 'selected' }`}>
            {this.state.isSignedIn ?(
              <span>
              <Container className="head">
                <div className="userId">{firebase.auth().currentUser.displayName}</div>
                <button className= 'exit' title= 'Log Out' onClick={() => firebase.auth().signOut()}><i className="exitButton material-icons">exit_to_app</i></button>
                <h1 className="title"> WELCOME TO HOLACODE<br></br></h1>
              </Container>
              <div className="rowNoFlex">
                <Chat className='col-md-10' username={firebase.auth().currentUser.displayName} socket={socket} isSmallDevice={this.state.isSmallDevice} picture={firebase.auth().currentUser.photoURL}/>
                <SideBar className='col-md-2' lon={this.state.lon} lat={this.state.lat}/>
              </div>
              </span>
            ) : (
              <span>
                <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                />
              <div>
                <img className= 'holaLogo' src='../images/holacode.png'></img>
              </div>
              </span>
            )}
          </div>
          );
    }
}

export default App

import React, { Component } from 'react'
import io from 'socket.io-client'
import Login from './Login'
import Chat from './Chat'
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import SideBar from './sidebar.jsx';
const axios = require("axios");

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
            isSmallDevice: this.isSmallDevice()
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
              <div className='buttonUser'>{firebase.auth().currentUser.displayName}</div>
              <button className='buttonUser1' onClick={() => firebase.auth().signOut()}>Sign out!</button>
              <h1 style={{display: 'flex', justifyContent: 'center'}}>Welcome to Hola Code Assistant!<br></br></h1>
              <div className="rowNoFlex">
                <Chat className='col-md-10' username={firebase.auth().currentUser.displayName} socket={socket} isSmallDevice={this.state.isSmallDevice} picture={firebase.auth().currentUser.photoURL}/>
                <SideBar className='col-md-2'/>
              </div>
              </span>
            ) : (
              <span>
                <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
                />
              <div>
                <div><img className= 'holaLogo' src='../images/holacode.png'></img></div>
                <div><img className= 'holaLogo2' src='../images/holacode.png'></img></div>
              </div>
              </span>
            )}
          </div>
          );
    }
}

export default App

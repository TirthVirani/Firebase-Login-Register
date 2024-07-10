import './App.css';
import Register from './Components/register';
import Login from './Components/login'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/database";
import 'firebase/compat/auth';
import { Component } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyAiBHProJbPIAgNVyNK-MR5YoXg8E1_QbE",
  authDomain: "login-register-6750f.firebaseapp.com",
  databaseURL: "https://login-register-6750f-default-rtdb.firebaseio.com",
  projectId: "login-register-6750f",
  storageBucket: "login-register-6750f.appspot.com",
  messagingSenderId: "909697447592",
  appId: "1:909697447592:web:c3589d62ca0387e9a2749d"
};

if(!firebase.apps.lenght){
  firebase.initializeApp(firebaseConfig);
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //page = 0 (login), 1 = reguister
       page:1,
       message:"",
      // 1 - success , 0 - error
       type : 1
    }
  }
  pageSwitchHandler = (e) => {
    this.setState({page: !this.state.page, message: null});
    e.preventDefault();
  };

  registrationHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    this.setState({ email, password, confirmPassword }, () => console.log(this.state));
    if(password !== confirmPassword){
      this.setState({message: "Password does not match...", type:0 });
      return;
    }
    const auth = firebase.auth();
    const authPromise = auth.createUserWithEmailAndPassword(email, password);
    authPromise.then((data) => {
      auth.currentUser.sendEmailVerification();
      this.setState({message: "Registed Successfully", type: 1},() => {
        event.target.email.value = "";
        event.target.password.value = "";
        event.target.confirmPassword.value = "";
      });
    }).catch((error) => {
      this.setState({ message: error.message, type: 0})
    });
  };

  googleloginHandler = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((response) => {       //promise pass kiye
      console.log(response.user);
      this.setState({message: "Login Successfully", type: 1});
    })
    .catch((error) => {
      console.log(error);
    });
  }

/*  if facebook thi login karvu hoi to developer.facebook.com 
ma jaine id and secretid lai ne apvi pade  */

  loginHandler = (event) => {
    event.preventDefault();
    const auth = firebase.auth();
    const email = event.target.email.value;
    const password = event.target.password.value;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((data) =>{
        if (data.user.emailVerified === true)
          this.setState({message: "Login Successfully", type: 1});
        else
          this.setState({message: "Your email is not verified yet...", type: 0});
      }).catch((error) =>{
        this.setState({ message: error.message, type: 0})
      });
  };

  render (){
    return( 
      <div>
        {this.state.page ? (
        <Register
        type={this.state.type} 
        message={this.state.message} 
        switch={this.pageSwitchHandler} 
        register={this.registrationHandler}
        google={this.googleloginHandler}></Register>
        ) : (<Login
              type={this.state.type} 
              message={this.state.message} 
              switch={this.pageSwitchHandler} 
              login={this.loginHandler}
              google={this.googleloginHandler}></Login>)}
      </div>
    );
  }
}

export default App;

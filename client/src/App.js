
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React from 'react';
import Home from './react-components/Home';
import Navbar from './react-components/Navbar';
import Help from './react-components/Help';
import Userprofile from './react-components/Userprofile';
import Explore from './react-components/Explore';
import Leaderboard from './react-components/Leaderboard';
import Canvas from './react-components/Canvas';
// import UserProfile1 from './react-components/UserProfile1';
// import UserProfile2 from './react-components/UserProfile2';
// import UserProfile3 from './react-components/UserProfile3';
// import UserProfile4 from './react-components/UserProfile4';
// import UserProfile5 from './react-components/UserProfile5';
// import UserProfile6 from './react-components/UserProfile6';
// import UserProfile7 from './react-components/UserProfile7';
// import UserProfile8 from './react-components/UserProfile8';
// import UserProfile9 from './react-components/UserProfile9';
// import UserProfile10 from './react-components/UserProfile10';
import Shop from './react-components/Shop';

import {checkSession} from "./action/user"
import { initChallenge } from './action/admin';
import { getExplorePageElems } from './action/user';
import {login} from './action/user'
import { initUsers } from './action/admin';
import {userProfileCheckSession} from './action/userprofile'
import {refresh} from './action/user'
import {registerAccount} from './action/user'


class App extends React.Component {

  componentDidMount(){
    checkSession(this);
    initChallenge(this);
    initUsers(this);
    getExplorePageElems(this);
  }

  state ={
      loggedIn : false,
      admin: false ,
      user: null,
      loginID: "",
      password: "",
      createpassword:"",
      verifypassword:"",
      registerusername:"",
      registerprofilename:"",
      prevChallenge: "",
      currChallenge:"",
      winnerPosts: [],
      allUsers: [],
      explorePosts: []
  };
    
  
  handleInputChange = (e)=>{
    const target = e.target
    const value = target.value
    const name = target.name

    this.setState({
        [name] : value
    })

}

checkLogin = () =>{
  return new Promise((resolve,reject)=>{
    login(this).then((json)=>{
      resolve(json);
    })
    .catch(err=>{
      reject();
    })
  })
    //get request
}

createAccount=()=>{
  return new Promise((resolve,reject)=>{
    
    if(this.state.createpassword !== this.state.verifypassword || this.state.registerusername.length<4 || this.state.registerprofilename.length<4|| this.state.createpassword.length<4){
      reject();
      return;
    } 
    
    registerAccount(this)
    .then(
      resolve()
    )
    .catch(err=>{
      reject();
    })
  })
}

  render() {
    //console.log(this.state.loggedIn)
    return (
      <div>
        <BrowserRouter>
          <Navbar app = {this}/>
          <Routes>
          <Route path ='/'  element=
          {<Home 
            prevChallenge = {this.state.prevChallenge}
            currChallenge ={this.state.currChallenge}
            winnerPosts = {this.state.winnerPosts}
          />}/>
              <Route path ='/shop' element=
              {<Shop
              winnerPosts = {this.state.winnerPosts}
              
              />}/>
              <Route path ='/leaderboard' element={<Leaderboard/>}/>
              <Route path ='/profile' 
                element= {
                <Userprofile 
                  user = {this.state.user}
                  loggedIn = {this.state.loggedIn}
                  admin = {this.state.admin} 
                  checkLogin = {this.checkLogin} 
                  handleInputChange = {this.handleInputChange}
                  createAccount = {this.createAccount}
                  app = {this}
                  allUsers = {this.state.allUsers}
                  weeklyChallenge = {this.state.currChallenge}
                  registerprofilename = {this.state.registerprofilename}
                  createpassword = {this.state.createpassword}
                  verifypassword={this.state.verifypassword}
                  registerusername ={this.state.registerusername}
                  
                />}
              />
               <Route path ='/explore' element={<Explore
               explorePosts = {this.state.explorePosts}
               weeklyChallenge = {this.state.currChallenge}
               />}/>
               <Route path ='/canvas' element={
               <Canvas
                app = {this}
                currChallenge = {this.state.currChallenge}
               />}/>
               <Route path ='/canvas' element={<Canvas/>}/>
               {/* <Route path ='/userprofile1/:id' render={props => <UserProfile1 {...props}/>}/>
               <Route path ='/userprofile2' element={<UserProfile2/>}/>
               <Route path ='/userprofile3' element={<UserProfile3/>}/>
               <Route path ='/userprofile4' element={<UserProfile4/>}/>
               <Route path ='/userprofile5' element={<UserProfile5/>}/>
               <Route path ='/userprofile6' element={<UserProfile6/>}/>
               <Route path ='/userprofile7' element={<UserProfile7/>}/>
               <Route path ='/userprofile8' element={<UserProfile8/>}/>
               <Route path ='/userprofile9' element={<UserProfile9/>}/>
               <Route path ='/userprofile10' element={<UserProfile10/>}/> */}
               
          </Routes>
        </BrowserRouter>
       
      </div>)
  }
}

export default App;

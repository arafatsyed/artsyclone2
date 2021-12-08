import React from 'react';
import {Link} from 'react-router-dom'

import Userpostbox from '../Userpostsbox';

import background from './static/background.jpg'
import profilePicture from "./static/curry.jpeg";
import post1 from "./static/qiqi_fallen.png";
import post2 from "./static/sadgebusiness.png";
import post3 from "./static/whenlifegetsatborry.png";
import post4 from "./static/YEP.png";
import artsyLogo from "./static/Artsy.png"
import Userbanner from '../Userbanner';
import './styleLogin.css'
import './styleAdminTable.css'
import { updateChallenge } from '../../action/admin';
import {userProfileCheckSession} from './../../action/userprofile'
import { refresh } from '../../action/user';
import { removeUser } from '../../action/admin';
import { remove } from 'immutable';
import {updateBioDB} from '../../action/user';
import {updateName} from '../../action/user';
import {logout} from '../../action/user';

import {userUpvoteEvent} from './../../action/userprofile'
import {userDownVoteEvent} from './../../action/userprofile'
import {userUpvotePageUpdate} from './../../action/userprofile'
import { AiFillAlert } from 'react-icons/ai';
import {getExplorePageElems} from '../../action/user';
class Userprofile extends React.Component {

        componentDidMount(){
            userProfileCheckSession(this);
        }

        state = {
            username: "", //userrofile object
            postNumber: "", //userprofile object
            userVotes: "", //userprofile object
            userRanking: "", //userprofile object
            profileMessage: "", //userprofile object
            userProfilePic: profilePicture,
            changeNameValue: "",
            changeBioValue: "",
            userUpVote: false,
            userDownVote: false,
            userVote: false,
            // weeklyChallenge: "B", //challenge object
            changeWeeklyChallenge: "",
            userToBan: "",
            testLogin: "",

            allUsers: [
                {n: 'Baylife12_x', img: profilePicture},
                {n: 'ChronicPain', img: post4},
                {n: 'ReadingWeek_?', img: post3},
                {n: '_innit_012', img: post1},
                {n: 'watIsVoltage', img: post2},
                {n: 'nayeNeigh', img: profilePicture},
                {n: 'treehugger2019', img: profilePicture},
                {n: 'UomegalulfT', img: profilePicture},
                {n: 'eggsandtoast', img: profilePicture},
                {n: 'ArtistFromThe6ix', img: profilePicture},

            ],

            posts: [],
            register: false,
            successAccountCreate: false

        }
    

    handleChange=(event)=>{
        const target = event.target
        const value = target.value
        const name = target.name
        
        //console.log(value)
        //console.log(name)
        this.setState({
            [name] : value
        })       
    }

    changeUserName=()=>{
        
        updateName(this);
        
        this.setState(
            {username: this.state.changeNameValue},
        )

        let newPosts = this.state.posts;
        
        newPosts.map(posts=>(
            posts.artist = this.state.changeNameValue
        ))
        
        this.setState(
            {post: newPosts}
        )
        
    }
 
    changeBio=()=>{

        updateBioDB(this);

        this.setState(
            {profileMessage: this.state.changeBioValue}
        )
    }

    votingEvent=(name,post, postArray)=>{

        let profileVotes = this.state.userVotes;

        for(let i=0;i<postArray.length;i++){
            if(postArray[i] == post){
                
                if(name=="upvote"){
                    
                    //if downvoted, increment by 2 and set upvote to true and downvote to false
                    if(postArray[i].upVote==false && postArray[i].downVote == true){
                         //call server to increase num votes and add userID from array
                        postArray[i].votes +=2;
                        postArray[i].upVote=true;
                        postArray[i].downVote = false;
                        profileVotes+=2;

                        break;
                    }
                    //double upvoting, reset vote booleans
                    else if(postArray[i].upVote == true){
                        //call server to decrease num votes and remove userID from array
                        userDownVoteEvent(postArray[i].photoID);
                        postArray[i].votes -=1;
                        postArray[i].upVote = false;
                        postArray[i].downVote = false;
                        profileVotes-=1;
                        
                        break;
                    }
                    //no votes yet, 
                    else{
                        userUpvoteEvent(postArray[i].photoID);
                        postArray[i].votes++;
                        postArray[i].upVote = true;
                        postArray[i].downVote=false;
                        profileVotes++;
                        break;
                    }
                
                }
                else{
                    //if upvoted, decrement by 2 
                    if(postArray[i].upVote==true && postArray[i].downVote == false){
                        postArray[i].votes -=2;
                        postArray[i].upVote=false;
                        postArray[i].downVote = true;
                        profileVotes-=2;
                        break;
                    }
                    //double downvoting, reset vote booleans
                    else if(postArray[i].downVote == true){
                        postArray[i].votes +=1;
                        postArray[i].upVote = false;
                        postArray[i].downVote = false;
                        profileVotes+=1;
                        break;
                    }
                    //no votes yet, 
                    else{
                        postArray[i].votes--;
                        postArray[i].upVote = false;
                        postArray[i].downVote=true;
                        profileVotes--;
                        break;
                    }

                }

            }
        }

        this.setState(
            {
                posts: postArray,
                userVotes: profileVotes
            }
        )
    }

    renderNameLink(artist){
        if(artist === 'ChronicPain'){
            return('/userprofile1')
        } else if(artist == 'ReadingWeek_?'){
            return('/userprofile2')
        }else if(artist == '_innit_012'){
            return('/userprofile3')
        }else if(artist == 'watIsVoltage'){
            return('/userprofile4')
        }else if(artist == 'nayeNeigh'){
            return('/userprofile5')
        }else if(artist == 'treehugger2019'){
            return('/userprofile6')
        }else if(artist == 'UomegalulfT'){
            return('/userprofile7')
        }else if(artist == 'eggsandtoast'){
            return('/userprofile8')
        }else if(artist == 'ArtistFromThe6ix'){
            return('/userprofile9')
        } else if(artist == 'Baylife12_x'){
            return('/userprofile10')
        }else{
            return('/explore')
        }
    }

    banUser=()=>{
        console.log(this.state.userToBan)
        if(window.confirm('Are you sure you want to ban this user?')){
            removeUser(this.props.app, this.state.userToBan).then(()=>{
                window.confirm(`You have succesfully banned user: ${this.state.userToBan}!`)
                getExplorePageElems(this.props.app)
               
            }).catch (error=>{
                window.confirm(`Unable to ban user: ${this.state.userToBan}`)
            })
    
           
        }
    }

    changeChallenge=()=>{
        if(window.confirm(`Are you sure you want to update the challenge to ${this.state.changeWeeklyChallenge}`)){
            updateChallenge(this.props.app, this.state.changeWeeklyChallenge).then(()=>{
                window.confirm(`You have succesfully changed the challenge to: ${this.state.changeWeeklyChallenge}!`)
                // this.setState(
                    getExplorePageElems(this.props.app)
                //     {weeklyChallenge: this.state.changeWeeklyChallenge}
                // )
            }
            ).catch(error=>{
                window.confirm(`Unable to update challenge to: ${this.state.changeWeeklyChallenge}.`)
            })

           
       
        }
        
    }

    goToRegister = ()=>{
        this.setState({register:true})
    }
    render() {
        
        //logged in 
       
        if(this.props.loggedIn === true){
            //normal user
            if(this.props.admin === false){
   
                return (
                    <div>
                        <Userbanner 
                        
                            username = {this.state.username}
                            postNumber = {this.state.postNumber}
                            userVotes = {this.state.userVotes}
                            userRanking = {this.state.userRanking}
                            profileMessage = {this.state.profileMessage}
                            userProfilePic = {this.state.userProfilePic}
                            changeUserName = {this.changeUserName}
                            handleChange = {this.handleChange}
                            changeBio = {this.changeBio}
                            app = {this.props.app}
                        />
                    
                        <Userpostbox votingEvent = {this.votingEvent} posts = {this.state.posts}/>
        
                    </div>)
            }
            //admin page
            else{
                return(

                    <div>
                   
                    <table className="adminTable">

                        <thead>
                            <tr>
                                <th className = "adminTableAL">Weekly Challenge</th>
                                <th className = "adminTableAR"> </th>         
                            </tr>
                        </thead>
                        
                        <tbody className = "weeklyChallangeTableEntry">
                            
                            <tr>    

                                <td>
                                   <div className = "currentChallengeText"> Current Challenge: <span className = "weeklyChallengeDisplay"> {this.props.weeklyChallenge} </span> </div>
                                </td>

                                <td className ="inputFormChallenge">
                                    <input  
                                        name = "changeWeeklyChallenge" 
                                        value= {this.state.changeWeeklyChallenge}
                                        className="changeWeeklyForm" 
                                        type="text" 
                                        onChange = {this.handleChange} 
                                        placeholder="New Challenge"
                                    />
                                    <input 
                                        onClick = {this.changeChallenge}  
                                        className="changeWeeklySubmit" 
                                        type="submit" 
                                        name = "weeklyChallenge"
                                        value="Change Weekly Challenge"  
                                    />
                                </td>
                            </tr>
                            
                        </tbody>

                    </table>
                    <table className="adminTable">

                        <thead>
                            <tr>
                                <th className = "adminTableAL">Ban a user</th>
                                <th className = "adminTableAR"> </th>         
                            </tr>
                        </thead>
                        
                        <tbody className = "weeklyChallangeTableEntry">
                            
                            <tr>    

                                <td>
                                   <div className = "currentChallengeText"> Enter a user's username to ban them from the list below. The users are listed in the following format: username (profileName)</div>
                                </td>

                                <td className ="inputFormChallenge">
                                    <input  
                                        name = "userToBan" 
                                        value= {this.state.userToBan}
                                        className="changeWeeklyForm" 
                                        type="text" 
                                        onChange = {this.handleChange} 
                                        placeholder="Username"
                                    />
                                    <input 
                                        onClick = {this.banUser}  
                                        className="changeWeeklySubmit" 
                                        type="submit" 
                                        name = "banButton"
                                        value="Ban user"  
                                    />
                                </td>
                            </tr>
                            
                        </tbody>

                    </table>

                    <table className = "adminTable">
                        <thead >
                                <tr>
                                    <th className = "adminTableAL">All Users</th>
                                    
                                </tr>
                        </thead>
                        <tbody>
                        <div className= "banUser-container">
                        {this.props.allUsers.map((user) => {
                            return(
                                <div className = "userBan"> 
                                     <img src = {post4} className = "adminTablePic"/> {`${user.login} (${user.n})`}{/*<Link to={this.renderNameLink(user.n)} className="a">{user.n}</Link> */}
                                </div>
                                /*<tr>
                                    <td><img src = {user.img} className = "adminTablePic"/><Link to={this.renderNameLink(user.n)} className="a">{user.n}</Link></td>
                                    <td className = "adminTableButton"><button onClick={() => this.banUser(user)} className="buttonRound">BAN</button></td>
                                </tr>*/
                            )
                        })}
                      
                        </div>
                        </tbody>
                    </table>
                    <button className = "buttonRound" onClick={()=>{logout(this.props.app)}}>Log Out</button>
                    </div>
                )
            }
        }else{
            // login prompts
            if(this.state.register){
                return(

                    <div>
                    <img src = {background} className = "backdrop"/>
                    <div className="loginBox"> 
                        
                         <img className="loginArtsyLogo" src = {artsyLogo}/>
    
                        <div className="loginForm">
                            
                            <input className = "username" value ={this.props.registerusername} 
                            onChange= {this.props.handleInputChange}
                            type = "text"
                            name = "registerusername"
                            placeholder="👤 Login Username" />
                           
    
                            <input className = "password" value ={this.props.createpassword} 
                            onChange= {this.props.handleInputChange}
                            type = "password"
                            name = "createpassword"
                            placeholder="🔒 Password" />

                            <input className = "password" value={this.props.verifypassword}
                            onChange= {this.props.handleInputChange}
                            type = "password"
                            name = "verifypassword"
                            placeholder="🔒 Verify Password" />

                            <input 
                            className = "password" 
                            value={this.props.registerprofilename}
                            onChange= {this.props.handleInputChange}
                            type = "text"
                            name = "registerprofilename"
                            placeholder="👤 User profile name" />

                            <input 
                            className="submitForm"  
                            type ="submit"
                            onClick = {()=>{this.props.createAccount().then(()=>{
                                this.setState({register: false})
                                alert("Successfully created an account, log in!");
                            })
                            .catch(error=>{
                                alert("Failed to create an account, Try again!");
                            })}}
                            value= "Create Account"
                            
                            />
                            
                        </div>
                    
                    </div>
                    
    
    
                </div>)
            }else{
            return(

                <div>
                    <img src = {background} className = "backdrop"/>
                <div className="loginBox"> 
                    
                     <img className="loginArtsyLogo" src = {artsyLogo}/>

                    <div className="loginForm">
                        <input className = "username" value ={this.props.loginID}
                        onChange= {this.props.handleInputChange}
                        type = "text"
                        name = "loginID"
                        placeholder="👤 Username" />
                       
                        <input className = "password" value ={this.props.password} 
                        onChange= {this.props.handleInputChange}
                        type = "password"
                        name = "password"
                        placeholder="🔒 Password" />
                       
                        <input className="submitForm"  type ="submit"
                        onClick = {()=>{
                            
                            this.props.checkLogin(this).then(json=>{
                                userUpvotePageUpdate(this.props.explorePosts);
                                window.location.reload()
                            }).catch(err=>{
                                alert("Wrong credentials, try again")
                            })
                            
                        }}
                        value= "Log In"
                        
                        />
                        <input className="submitForm"  type ="submit"
                            onClick = {this.goToRegister}
                            value= "Register"
                            
                            />
                    </div>
                
                </div>
                


            </div>)
            }
        }
        /*return (
            <div>
                <Userbanner 
                
                    username = {this.state.username}
                    postNumber = {this.state.postNumber}
                    userVotes = {this.state.userVotes}
                    userRanking = {this.state.userRanking}
                    profileMessage = {this.state.profileMessage}
                    userProfilePic = {this.state.userProfilePic}
                
                />
            
                <Userpostbox posts = {this.state.posts}/>

            </div>)*/
    }
}

export default Userprofile;
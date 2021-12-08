import React from 'react';
import './styleBannerr.css'
import ReactModal from 'react-modal'
import { Link } from 'react-router-dom';
import { logout } from '../../action/user';
class Userbanner extends React.Component {

    constructor () {
        super();
        this.state = {
          showModalEditProfile: false,
          showModalAddPost: false,

        };
        
        this.handleOpenModalProfile = this.handleOpenModalProfile.bind(this);
        this.handleCloseModalProfile = this.handleCloseModalProfile.bind(this);
    }

    handleOpenModalProfile=()=>{
        this.setState({showModalEditProfile: true});
    }

    handleCloseModalProfile=()=>{
        this.setState({showModalEditProfile: false});
    }

    

    render() {

        const { username, postNumber, userVotes, userRanking, profileMessage, userProfilePic } = this.props;

        return (    
            <div>
                <div className='profileBanner'>

                    <div className="profilePicDiv">
                        <img id='profilePic' src={userProfilePic} />
                    </div>

                    <div className='profileStatsDiv' >
                        <div id='userNamee'> <span className="userNameFont"> {username} <span><button onClick={this.handleOpenModalProfile} className="newProfile">✏️</button></span></span></div>

                        <div id='profileStats'>
                            <ul>
                                <li> <span className="profileStatNumber"> {postNumber} </span>Posts </li>
                                <li> <span className="profileStatNumber"> {userVotes} </span>Votes</li>
                                <li> <span className="profileStatNumber"> {userRanking} </span>ranking</li>
                            </ul>
                        </div>

                        <div className="customStatus"><p> {profileMessage} </p> </div>
                    </div>
                    
                    
                    
                        <button  className="editProfilee"> <Link className="link" to ="/canvas"> New Submission  </Link> </button>
                        <button className = "editProfilee editProfileee" onClick={()=>{logout(this.props.app)}}>Log Out</button>
                    
                   
                    <ReactModal className="editProfileModal" isOpen = {this.state.showModalEditProfile}>

                        <button className="modalCloseButton" onClick = {this.handleCloseModalProfile}>Close</button>
                        <div className="modalInputBox"> 
                            
                           <div className="mainText">Edit Profile</div>

                           <div className = "changeUserNameHeader">Name: </div>
                           
                           <input
                                className="modalUserNameChangeForm"
                                type="text"
                                name = "changeNameValue"
                                value = {this.props.changeNameValue}
                                onChange={this.props.handleChange}
                                placeholder = {username}
                           />

                           <input  
                                type ="submit"
                                value= "Change Name"
                                onClick ={this.props.changeUserName}
                            />

                        <div className = "changeUserNameHeader">Bio: </div>

                        <textarea
                            className="modalUserNameBioForm"
                            type="text"
                            name = "changeBioValue"
                            value = {this.props.changeBioValue}
                            onChange={this.props.handleChange}
                            placeholder = "Bio"
                        />

                        <input
                            className="submit"  
                            type ="submit"
                            value= "Change Bio"
                            onClick ={this.props.changeBio}
                        />

                        </div>


                    </ReactModal>

                </div>
            </div>)
    }
}

export default Userbanner;
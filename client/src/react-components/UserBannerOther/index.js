import React from 'react';
import './styleUserProfilee.css'

class UserBannerOther extends React.Component {

    render() {

        const { username, postNumber, userVotes, userRanking, profileMessage, userProfilePic } = this.props;

        return (    
            <div>
                <div className='profileBanner'>

                    <div className="profilePicDiv">
                        <img id='profilePic' src={userProfilePic} />
                    </div>

                    <div className='profileStatsDiv' >
                        <div id='userName'> <span className="userNameFont"> {username} </span>   </div>

                        <div id='profileStats'>
                            <ul>
                                <li> <span className="profileStatNumber"> {postNumber} </span>Posts </li>
                                <li> <span className="profileStatNumber"> {userVotes} </span>Votes</li>
                                <li> <span className="profileStatNumber"> {userRanking} </span>ranking</li>
                            </ul>
                        </div>

                        <div className="customStatus"><p> {profileMessage} </p> </div>
                    </div>
                </div>
            </div>)
    }
}

export default UserBannerOther;
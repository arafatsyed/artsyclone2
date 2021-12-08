import React from 'react';
import './styleUserProfile.css'
import Userpost from '../Userposts';
import { uid } from "react-uid";

class Userpostbox extends React.Component {



    render() {

        const{posts, winner} = this.props;
        let classString ="userPosts-flex-container"
        if(typeof winner !== 'undefined'){
            classString =  "userPosts-flex-container-winner"
        }
           
        return (
            <div>
                <div className={classString}>
                    {posts.map( photo =>(
                        <Userpost postArray = {posts} votingEvent = {this.props.votingEvent} key = {uid(photo)} photo = {photo} winner ={winner} userID = {photo.userID} />
                    )
                    )}
                
                </div>
            </div>)
    }
}

export default Userpostbox;
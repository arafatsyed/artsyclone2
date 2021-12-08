import React from "react";
import Userpostbox from "../Userpostsbox";
import "./styleExplore.css"
import a from './static/beach1.jpg'
import b from './static/beach2.jpg'
import c from './static/beach3.jpg'
import d from './static/beach4.jpg'
import e from './static/beach5.jpg'
import f from './static/beach6.jpg'
import g from './static/beach7.jpg'
import h from './static/beach8.jpg'
import i from './static/beach9.jpg'

import {userUpvoteEvent} from './../../action/userprofile'
import {userDownVoteEvent} from './../../action/userprofile'
import {userUpvotePageUpdate} from './../../action/userprofile'

class Explore extends React.Component {
    
    


        state= {
        
        weeklyChallenge: "Beaches",
        
        posts: [                 
            ]
            
    

}

    votingEvent=(name,post, postArray)=>{

        for(let i=0;i<postArray.length;i++){
            if(postArray[i] == post){
                
                if(name=="upvote"){
                    
                    //if downvoted, increment by 2 and set upvote to true and downvote to false
                    if(postArray[i].upVote==false && postArray[i].downVote == true){
                        postArray[i].votes +=2;
                        postArray[i].upVote=true;
                        postArray[i].downVote = false;
                        break;
                    }
                    //double upvoting, reset vote booleans
                    else if(postArray[i].upVote == true){
                        
                        userDownVoteEvent(postArray[i].photoID)
                        postArray[i].votes -=1;
                        postArray[i].upVote = false;
                        postArray[i].downVote = false;
                        break;
                    }
                    //no votes yet, 
                    else{
                        
                        userUpvoteEvent(postArray[i].photoID)
                        postArray[i].votes++;
                        postArray[i].upVote = true;
                        postArray[i].downVote=false;
                        break;
                    }
                
                }
                else{
                    //if upvoted, decrement by 2 
                    if(postArray[i].upVote==true && postArray[i].downVote == false){
                        postArray[i].votes -=2;
                        postArray[i].upVote=false;
                        postArray[i].downVote = true;
                        break;
                    }
                    //double downvoting, reset vote booleans
                    else if(postArray[i].downVote == true){
                        postArray[i].votes +=1;
                        postArray[i].upVote = false;
                        postArray[i].downVote = false;
                        break;
                    }
                    //no votes yet, 
                    else{
                        postArray[i].votes--;
                        postArray[i].upVote = false;
                        postArray[i].downVote=true;
                        break;
                    }

                }

            }
        }

        this.setState(
            {posts: postArray}
        )
    }

    render() {
        
        return (
            <div>
                <div className = "exploreBanner"> 
                    <div className = "explorePageEntryText">Explore and Vote on Submissions</div>
                    <div className = "weeklyChallenge">This Week's Challenge: <span className="underLine">{this.props.weeklyChallenge}</span></div>
                </div>

                <Userpostbox votingEvent = {this.votingEvent} posts = {this.props.explorePosts}/>
            </div>)
    }
}

export default Explore;
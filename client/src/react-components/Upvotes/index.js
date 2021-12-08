import React from 'react';
import './styleUpvotes.css'
import { ImArrowUp } from 'react-icons/im'
import { ImArrowDown } from 'react-icons/im'
import { IconContext } from 'react-icons'
import {AiOutlineHeart} from 'react-icons/ai'
import {AiFillHeart} from 'react-icons/ai'
import { Link} from 'react-router-dom'

class Upvotes extends React.Component {

    renderName(name,artist,challenge, winner, userID){
        if(name || typeof winner !== 'undefined' ){
            return(
                <div className="userName">By: {artist} </div>
            )
        }
        else{
            return(<div className="challengeName"> {challenge} </div>)
        }
    }

    renderheart(post,postArray){
        if(post.upVote == true){
            return(
                <button className = "button" name="upvote" onClick={() => this.props.votingEvent("upvote", post, postArray)}>
                
                <IconContext.Provider  value={{  color: 'orange', className: "global-class-name", size: "20px" }} > <AiFillHeart /> </IconContext.Provider>
                </button>
            )
        }
        else{
            return(
                <button className = "button" name="upvote" onClick={() => this.props.votingEvent("upvote", post, postArray)}>
                
                <IconContext.Provider  value={{  fill: 'red', className: "global-class-name", size: "20px" }} > <AiOutlineHeart /> </IconContext.Provider>
                </button>

            )
        }

    }

    render() {

        const { votes,artist, name,challenge, post, postArray, winner, userID} = this.props;


        return (
            <div>
            
                {this.renderName(name,artist,challenge, winner, userID)}
                

                { typeof winner === 'undefined' && <div className="upvotesBlock">

                    {/* <button className = "button" name="upvote" onClick={() => this.props.votingEvent("upvote", post, postArray)}>
                        
                        <IconContext.Provider  value={{  fill: 'red', className: "global-class-name", size: "20px" }} > <AiOutlineHeart /> </IconContext.Provider>
                    </button> */}
                        {this.renderheart(post,postArray)}
                        <div className="voteText"> {votes} </div>
            
                    {/* <button className = "button" name="downvote" onClick={() => this.props.votingEvent("downvote", post, postArray)}>
                        <IconContext.Provider  value={{ color: "brown", className: "global-class-name",size: "20px" }} > <AiFillHeart /> </IconContext.Provider>
                    </button> */}
                </div>}

            </div>)
    }
}

export default Upvotes;
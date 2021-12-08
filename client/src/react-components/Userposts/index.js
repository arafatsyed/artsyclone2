import React from 'react';
import './styleUserProfile.css'
import Upvotes from '../Upvotes';
import ReactModal from 'react-modal';

class Userpost extends React.Component {

    constructor () {
        super();
        this.state = {
          showModal: false,

        };
        
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        
    }   
    
    handleOpenModal=()=>{
        this.setState({showModal: true})
    }

    
    handleCloseModal=()=>{
        this.setState({showModal: false})
    }

    render() {

        const{photo, postArray, winner, bigPost, userID} = this.props;
        
        return (
            <div >
                
                <div onClick={this.handleOpenModal} className={bigPost ? 'userPosts-flex-item-big' : "userPosts-flex-item"}> <img className = {bigPost ? 'postPicture-big' : "postPicture"} src = {photo.photo}/> </div>
                <Upvotes winner ={winner} postArray = {postArray} post = {photo} votingEvent = {this.props.votingEvent} name = {photo.name} votes={photo.votes} artist={photo.artist} challenge = {photo.challenge} userID = {userID}/>
    
                <ReactModal className = "showPictureModal" isOpen={this.state.showModal}> 

                    <button className = "closeModal" onClick = {this.handleCloseModal}>X</button>
                    
                    <div className = "pictureModal">
                        <img className = "picture"  src = {photo.photo}/>
                    </div>

                    <div className = "pictureInfoFlex">
                        {/* <div className="pictureInfo">Name: <span className = "lighter">{photo.photoName}</span> </div> */}
                        <div className="pictureInfo">Artist: <span className = "lighter"> {photo.artist}</span></div>
                        <div className="pictureInfo">Challenge: <span className = "lighter">{photo.challenge}</span></div>
                    </div>
                </ReactModal>

            </div>
        )
    }
}

export default Userpost;
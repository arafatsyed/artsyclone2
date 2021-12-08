import React from 'react'
import post1 from "./static/simple-nature-hiper-bayog.jpg";
import post2 from "./static/il_fullxfull.1421294891_8pd0.jpg";
import post3 from "./static/bd43b976dd51eae8e88815126e6dcab8.jpg";
import merch1 from "./static/merch1.png"
import merch2 from "./static/merch2.jpg"
import merch3 from "./static/merch3.webp"

import Userpostbox from "../Userpostsbox"
import Userpost from '../Userposts';
import "./styleShop.css"

class Shop extends React.Component {
    state= {
        
        winner: true,
        artSelect: -1,
        merchSelect: -1,
        size:"",
        /*winnerPosts: [
            {   
                name: false,
                votes: 300,
                challenge: "Nature Challenge", 
                photo: post1,
                artist: "Baylife12_x",
                photoName: "customName"

            },
            {
                name: false,
                votes: 50,
                challenge: "Nature Challenge", 
                photo: post2,
                artist: "_innit_012",
                photoName: "customName"
            },
            {
                name: false,
                votes: 97,
                challenge: "Nature Challenge",
                photo: post3,
                artist: "ArtistFromThe6ix",
                photoName: "customName"
            }

        
        ]*/
    }
    
    scrollDown(){
        
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
        
        
    }
   

    renderImageOnMerch=()=>{

        //draw preview
        
        
        console.log(this.state.merchSelect)
        if(this.state.artSelect!==-1 && this.state.merchSelect!==-1){
           
            console.log("here")
            if(this.state.merchSelect==4){
                return(
                    <div>
                        <h2 className = "chooseArtHeader">3. Review your Selection:</h2>
                        <div className = "displayDiv">
                            {/* <div className = "actualDisplay"> */}
                                <img className ="merchDisplay" src={merch1}/>
                                <img className = "artDisplayOnMerchShirt" src = {this.props.winnerPosts[this.state.artSelect].photo}/>
                            {/* </div> */}
                        </div>
                        <h2 className = "chooseArtHeader"> $49.99</h2>
                        <button className ="buyButton"> Buy Now </button>
                    </div>
                )
                
            }
            else if(this.state.merchSelect==5){
                return(
                    <div>
                        <h2 className = "chooseArtHeader">3. Review your Selection:</h2>
                        <div className = "displayDiv">
                            {/* <div className = "actualDisplay"> */}
                                <img className ="merchDisplay" src={merch2}/>
                                <img className = "artDisplayOnMerchCup" src = {this.props.winnerPosts[this.state.artSelect].photo}/>
                            {/* </div> */}
                        </div>
                        <h2 className = "chooseArtHeader"> $25.99</h2>
                        <button className ="buyButton"> Buy Now </button>
                    </div>
                )
            }
            else if(this.state.merchSelect==6){
                return(

                    <div>
                        <h2 className = "chooseArtHeader">3. Review your Selection:</h2>
                        <div className = "displayDiv">
                            {/* <div className = "actualDisplay"> */}
                                <img className ="merchDisplay" src={merch3}/>
                                <img className = "artDisplayOnMerchHoodie" src = {this.props.winnerPosts[this.state.artSelect].photo}/>
                            {/* </div> */}
                        </div>
                        <h2 className = "chooseArtHeader"> $79.99</h2>
                        <button className ="buyButton"> Buy Now </button>
                    </div>



                )
            }
           
        }
        else{
            
            return(<div className = 'cnt merch'><h2 className = "chooseArtHeader">3. Review your Selection:</h2></div>)
        }

    }
    handleSelection=(e)=>{
        const target = e.target;
        const id = target.id;
        const name = target.name;
        //window.scrollIntoView({block: 'end',behavior: 'smooth'});
        //window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
       this.scrollDown()
        this.setState(
            {[name]: id}
        )
        
        
    }

    render() {
        return (
            <div>
                <div className="bannerWrapper">
                    <div className="textCenter banner">Artsy Shop</div>
                </div>

                <h2 className = "chooseArtHeader">1. Choose an art piece:</h2>
                
                <div className = "artSelectButtons">

                    <div className = "selectArtOne">
                        <Userpost photo= {this.props.winnerPosts[0]} winner={this.state.winner}/>
                        <input  onClick={this.handleSelection} type="radio" name = "artSelect" id = {0}  className="buttonSelectArt"/>
                 
                    </div>
                    
                    <div className = "selectArtOne">
                        <Userpost photo= {this.props.winnerPosts[1]} winner={this.state.winner}/>
                        <input onClick={this.handleSelection} type="radio" name = "artSelect" id = {1}  className="buttonSelectArt"/>
                       
                    </div>

                    <div className = "selectArtOne">
                        <Userpost photo= {this.props.winnerPosts[2]} winner={this.state.winner}/>
                        <input onClick={this.handleSelection} type="radio" name = "artSelect" id = {2}  className="buttonSelectArt"/>
                     
                    </div>
                </div>

                <h2 className = "chooseArtHeader">2. Choose a Merchandise:</h2>

                <div className = "merchSelectButtons">

                    <div className = "selectArtOne">
                        <img  className = "merch" src={merch1}/>
                        <input  onClick={this.handleSelection} type="radio" name = "merchSelect" id = {4}  className="buttonSelectArt"/>
                 
                    </div>
                    
                    <div className = "selectArtOne">
                        <img  className = "merch" src={merch2}/>
                        <input onClick={this.handleSelection} type="radio" name = "merchSelect" id = {5}  className="buttonSelectArt"/>
                       
                    </div>

                    <div className = "selectArtOne">
                        <img className = "merch" src={merch3}/>                        
                        <input onClick={this.handleSelection} type="radio" name = "merchSelect" id = {6}  className="buttonSelectArt"/>
                    </div>
                </div>

                
                {this.renderImageOnMerch()} 
                 
                </div>
            


        )
    }
}

export default Shop
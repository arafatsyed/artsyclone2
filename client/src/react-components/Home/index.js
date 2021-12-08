import React from 'react';

import "./styleHome.css"
import vid1 from "./static/artsyhomevid_Trim1.mp4"
import vid2 from "./static/artsyhomevid1_Trim2.mp4"
import vid3 from "./static/artsyhomevid1_Trim3.mp4"
import Userpostbox from '../Userpostsbox';
import post1 from "./static/simple-nature-hiper-bayog.jpg";
import post2 from "./static/il_fullxfull.1421294891_8pd0.jpg";
import post3 from "./static/bd43b976dd51eae8e88815126e6dcab8.jpg";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import Userpost from '../Userposts';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


class Home extends React.Component {
    state ={
        index: 0,
        winner: true
       /* winnerPosts: [
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

        
        ],

        winner: true,
        prevChallenge: "Nature",
        currChallenge: "Beaches"*/

    }

    scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
    }

    render() {
        
        const settings = {
            className :"wd",
            infinite: true,
            speed: 400,
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            pauseOnHover: false,
            
            beforeChange: (oldInd,newInd) => this.setState({index: newInd})
            
          };
        return (
            <div>
                
                <div className="introHome">
                    <div className = "orangeGrad">
                        <div className="homeAnimate"> 
                            <h1 className= " textCenter px10">Bring Your Ideas To Life On Artsy!</h1>
                            <h2 /*style= {{marginLeft: "20px"}}*/ className= "textCenter">Last Week's Winners ({this.props.prevChallenge} Theme):</h2>
                            
                            <Slider {...settings}>
                            {this.props.winnerPosts.map((post,ind)=> (
                                <div className={this.state.index === ind ? "sidePost currPost" : "sidePost"}>
                                    <Userpost photo ={post} winner = {this.state.winner} bigPost= {true}/>
                                </div>
                            ))}
                            
                            </Slider>
                            <button className = "goToShop bOrange"> <Link className ="linkStyleW"to ='/shop'>Go to Shop →</Link></button>
                            {/* <Userpostbox posts= {this.state.winnerPosts} winner={this.state.winner}/>  */}

                        </div>
                       
                    </div>
                    <h1 className= "homeAnimate textCenter px30" >How it works:</h1> 
                    <div className= "homeAnimate home-flex-container">
                        <div className= "instructionsWrapper">
                            <h2 className= " textCenter instructionsHeader">🏆<span className="underline">Compete</span> in weekly challenges🏆</h2>
                            <div className= "instructions">
                                Each week there will be a new theme-based challenge where artists will get the chance to create their own Artsy masterpiece. 
                                Use the <span className="underline">Canvas</span> to get started on this week's challenge:<span className="bolder"> {this.props.currChallenge}</span>.
                                

                            </div>
                            
                            <button className = "buttonHome bOrange"> <Link className ="linkStyleW"to ='/canvas'>Go to Canvas</Link></button>
                                
                            
                            

                        </div>
                        

                        <div className = "videoWrapper ">
                            <video className="video"  autoPlay muted loop > 
                                <source  src={vid1} type ="video/mp4"/>
                            </video>
                        </div>
                    </div>
                    
                    <svg className = "wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 100 1440 150">
                    <path fill="orange" fillOpacity="1" d="M0,128L60,154.7C120,181,240,235,360,218.7C480,203,600,117,720,112C840,107,960,181,1080,197.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                    </svg>

                    <div className="orangebox home-flex-container">
                        <div className = "videoWrapper ">
                            <video className="video"  autoPlay muted loop > 
                                <source  src={vid3} type ="video/mp4"/>
                            </video>
                        </div>
                        <div className= "instructionsWrapper">
                            <h2 className= " textCenter instructionsHeader">🎨<span className="white">Vote</span> for you favorite art piece!🎨</h2>
                            <div className = "instructions"> 
                             Visit the <span className="white">Explore</span> page to view other artist's masterpiece's. 
                             Cast a vote for an art piece you like by using the heart icon.
                            </div>
                            <button className = "buttonHome bWhite"> <Link className ="linkStyleO"to ='/explore'>Go to Explore</Link></button>
                        </div>

                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 175 1440 150"><path fill="orange" fillOpacity="1" d="M0,224L48,224C96,224,192,224,288,234.7C384,245,480,267,576,256C672,245,768,203,864,197.3C960,192,1056,224,1152,245.3C1248,267,1344,277,1392,282.7L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>   
                    
                    <div className = "home-flex-container">
                            <div className = "instructionsWrapper">
                                <h2 className= " textCenter instructionsHeader">🌟Get <span className="underline">featured</span> on the front page🌟</h2>
                                <div className ="instructions">
                                    The top performers of the previous week's challenge will be featured on the <span className="underline">Home</span> page. 
                                    Their art will also be available for purchase in the <span className="underline">Artsy Shop</span>. 50% of proceeds will go to your artist of choice. 
                                </div>
                                <button className = "backToTop bOrange" onClick={this.scrollToTop}>Back to top</button>
                            </div>
                            <div className = "videoWrapper px30">
                                <video className="video"  autoPlay muted loop > 
                                    <source  src={vid2} type ="video/mp4"/>
                                </video>
                            </div>
                    </div>
                
                </div>
            </div>
        )
    }
}

export default Home

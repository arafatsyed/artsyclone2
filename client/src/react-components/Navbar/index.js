import React from 'react';
import { Link } from 'react-router-dom';
import './styleNavbar.css';
import image from "./static/Artsy.png";
import {userUpvotePageUpdate} from './../../action/userprofile'

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div className="navBar">
                    <Link to='/'>
                        <button className="logo">
                            <img src={image} className="logoImg" />
                        </button>
                    </Link>
                    <ul className="menu">
                        <li className="menuItem"><Link to="/">Home</Link></li>
                        <li className="menuItem"><Link to='/profile'>Profile</Link></li>
                        <li className="menuItem"><Link to='/explore'  onClick={()=>{userUpvotePageUpdate(this.props.explorePosts)}}  >   Explore    </Link></li>
                        <li className="menuItem"> <Link to='/leaderboard'>Leaderboard</Link></li>
                        <li className="menuItem" ><Link to='/canvas'>Canvas</Link> </li>
                        <li><Link to='/shop' ><button className="buttonShop">Shop</button></Link></li>

                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar
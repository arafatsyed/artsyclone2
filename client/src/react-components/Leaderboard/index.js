import React from 'react';
import "./styleLeader.css"
import Navbar from "../Navbar"
import LeaderboardRow from "../LeaderboardRow"

import imgYEP from "./static/YEP.png"
import imgBorry from "./static/whenlifegetsatborry.png"
import imgQiqi from "./static/qiqi_fallen.png"
import imgSB from "./static/sadgebusiness.png"
import imgUser from "./static/curry.jpeg"


class Leaderboard extends React.Component {

    state = {
        users: [
            {rank: 1, username: 'ChronicPain', votes: 100096, img: imgYEP},
            {rank: 2, username: 'ReadingWeek_?', votes: 80901, img: imgBorry},
            {rank: 3, username: '_innit_012', votes: 64080, img: imgQiqi},
            {rank: 4, username: 'watIsVoltage', votes: 12000, img: imgSB},
            {rank: 5, username: 'nayeNeigh', votes: 11004, img: imgUser},
            {rank: 6, username: 'treehugger2019', votes: 10475, img: imgUser},
            {rank: 7, username: 'UomegalulfT', votes: 9086, img: imgUser},
            {rank: 8, username: 'eggsandtoast', votes: 8190, img: imgUser},
            {rank: 9, username: 'ArtistFromThe6ix', votes: 514, img: imgUser},
            {rank: 10, username: 'Baylifex_12', votes: 501, img: imgUser}
        ]
    }

    renderHeader(){
        return(
            <thead>
                <tr>
                    <th className = "alignCENH">Rank</th>
                    <th className = "leaderboardTableHeader">Name</th>
                    <th className = "leaderboardTableHeader">All-Time Votes</th>
                </tr>
            </thead>
        )
    }

    render() {
        return (
            <div>
                <div className="rectangleBannerWrapper">
                🏆Leaderboard🏆
                </div>
                
                <table className = "leaderboardTable">
                    {this.renderHeader()}
                    <tbody>
                        {this.state.users.map((user) => (
                            <LeaderboardRow
                                users = {user}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard
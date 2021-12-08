import React from 'react';
import "./styleLeaderboardRow.css"
import { Link } from 'react-router-dom';
import {Route} from 'react-router-dom'

class LeaderboardRow extends React.Component {
    render() {

        const { users } = this.props

        if (users.rank === 1) {
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN"><span className="first">{users.rank}</span></td>
                    <td><img src={users.img} className="leaderboardPicFirst" /><span className="first">{users.username}</span></td>
                    <td><span className="first">{users.votes}</span></td>
                </tr>
            )
        } else if(users.rank === 2){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN"><span className="first">{users.rank}</span></td>
                    <td><img src={users.img} className="leaderboardPicFirst" /><span className="first">{users.username}</span></td>
                    <td><span className="first">{users.votes}</span></td>
                </tr>
            )
        } else if(users.rank === 3){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN"><span className="first">{users.rank}</span></td>
                    <td><img src={users.img} className="leaderboardPicFirst" /><span className="first">{users.username}</span></td>
                    <td><span className="first">{users.votes}</span></td>
                </tr>
            )
        }else if(users.rank === 4){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                        {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 5){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                        {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 6){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                        {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 7){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                        {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 8){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                    {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 9){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                    {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }else if(users.rank === 10){
            return (
                <tr key={users.rank}>
                    <td className = "alignCEN">{users.rank}</td>
                    <td><img src={users.img} className="leaderboardPic" />
                       {users.username}
                    </td>
                    <td>{users.votes}</td>
                </tr>
            )
        }
    }
}

export default LeaderboardRow
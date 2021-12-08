import { resolvePath } from 'react-router';
import ENV from './../config.js'
const API_HOST = ENV.api_host;

//check if user logged in when accessing user profile, set states accordingly
export const userProfileCheckSession=(userprofileComp)=>{

    const url = `${API_HOST}/users/check-session`;
    let jsonReturn;
    console.log("here userprofile");
    fetch(url)
    .then(res=>{
        //user logged in
        if(res.status===200){
            return res.json();
        }
    })
    .then(json => {
        //if server gave back json correctly
        jsonReturn = json.userID;
        console.log(jsonReturn);

        const retrieveProfile = {
            userID: jsonReturn
        }
        
        const request = new Request(`${API_HOST}/api/getprofilebyid`,{
            method: "post",
            body: JSON.stringify(retrieveProfile),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }       
        })
        
        fetch(request)
        .then(res=>{
            const profile = res.json();

            return profile;
 
        })
        .then(profile=>{
            console.log(profile);

            let postArray = [];
            let numLikes = 0;
            for(let i = 0; i<profile[0].posts.length;i++){
                const databasePost = profile[0].posts[i];
                
                const found = databasePost.users_liked.find(elem=>{
                    if(elem.userID_liked === jsonReturn){
                        return true;
                    }
                })
                
                let userPost = {
                    name: false,
                    votes: databasePost.number_likes,
                    challenge: databasePost.challenge + " Challenge",
                    photo: databasePost.image_url,
                    artist: databasePost.creator[0].userprofilename,
                    photoName: databasePost.creator[0].photoname,
                    downVote: false,
                    upVote: found?true:false,
                    photoID: databasePost._id
                }
                numLikes += databasePost.number_likes;
                postArray.push(userPost);
                console.log(userPost);
            }
            
            if(profile){
                 userprofileComp.setState({userVotes: numLikes, username: profile[0].userProfileName, postNumber: postArray.length,userRanking: profile[0].userRanking,profileMessage: profile[0].profileMessage, posts: postArray});
            }
            return profile
        })
        .then(profile=>{
            console.log("hello123")
        })
        .catch(err=>{
            console.log("error");
        })

    })
    .catch(err=>{
        console.log("wrong info");
    })

    

    if(jsonReturn){
        
        //make request to get a user profile by user
        const retrieveProfile = {
            userID: jsonReturn
        }
        
        const request = new Request(`${API_HOST}/api/getprofilebyid`,{
            method: "post",
            body: JSON.stringify(retrieveProfile),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }       
        })
        
        fetch(request)
        .then(res=>{
            const profile = res.json();
            console.log(profile[0]);
            if(profile){
                userprofileComp.setState({username: profile[0].userProfileName, postNumber: profile[0].postNumber,userRanking: profile[0].userRanking,profileMessage: profile[0].profileMessage});
            }
   
        })
        .catch(err=>{
            console.log("error");
        })
    }
}

export const loadProfile = (app, uid) =>{

    const retrieveProfile = {
        userID: uid
    }
    
    const request = new Request(`${API_HOST}/api/getprofilebyid`,{
        method: "post",
        body: JSON.stringify(retrieveProfile),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }       
    })
    
    fetch(request)
    .then(res=>{
        const profile = res.json();

        return profile;

    })
    .then(profile=>{
        console.log(profile);

        let postArray = [];
        let numLikes = 0;
        for(let i = 0; i<profile[0].posts.length;i++){
            const databasePost = profile[0].posts[i];
            let userPost = {
                name: false,
                votes: databasePost.number_likes,
                challenge: databasePost.challenge + " Challenge",
                photo: databasePost.image_url,
                artist: databasePost.creator[0].userprofilename,
                photoName: databasePost.creator[0].photoname,
                downVote: false,
                upVote: false
            }
            numLikes += databasePost.number_likes;
            postArray.push(userPost);
        }
        app.setState({userVotes: numLikes, username: profile[0].userProfileName, postNumber: postArray.length+1,userRanking: profile[0].userRanking,profileMessage: profile[0].profileMessage, posts: postArray});
})
}

export const userUpvotePageUpdate = (explorePagePosts)=>{


    const url = `${API_HOST}/users/check-session`;
    let jsonReturn;
    console.log("here userprofile");

    fetch(url)
    .then(res=>{
        //user logged in
        if(res.status===200){
            return res.json();
        }
    })
    .then(json => {
        //if server gave back json correctly
        jsonReturn = json.userID;
        console.log(jsonReturn);
        
        const url = `${API_HOST}/api/getExploreElems`
        
        fetch(url)
        .then(res=>{
            const explorePosts = res.json();
            return explorePosts;
        })
        .then(explorePosts=>{
 

            let postArray = [];
            
            for(let i = 0; i < explorePosts.length;i++){
                
                const dataPost = explorePosts[i];
                console.log(dataPost);
                const found = dataPost.users_liked.find(elem=>{
                    if(elem.userID_liked === jsonReturn){
                        return true;
                    }
                })
                
                let userPost = {
                    name: true,
                    votes: dataPost.number_likes,
                    artist: dataPost.creator[0].userprofilename,
                    photo: dataPost.image_url,
                    challenge: dataPost.challenge + " Challenge",
                    photoName: dataPost.creator[0].photoname,
                    downVote: false,
                    upVote: found?true:false,
                    userID: dataPost.creator[0].userID,
                    photoID: dataPost._id
                }

                postArray.push(userPost);
                
            }
            
            if(explorePosts){
                explorePagePosts = explorePosts;
                 //explorePagePosts.setState({ posts: postArray});
            }

            return explorePosts;
        })
        .then(profile=>{
            console.log("explorepagehello")
        })
        .catch(err=>{
            console.log("error");
        })

    })
    .catch(err=>{
        console.log("wrong info");
    })
 
}

export const userUpvoteEvent= (photo_id) =>{
    
    const newLikeObject = {
        photo_id: photo_id
    }

    console.log(photo_id);

    const request = new Request(`${API_HOST}/api/likeevent`, {
        method: "PATCH",
        body: JSON.stringify(newLikeObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(res=>{
        if(res.status===200){
            return;
        }
        if(res.status===404){
            alert("Please login or Register an account for your vote to count!");
            return;
        }
    })
    .catch(

    )

}

export const userDownVoteEvent = (photo_id) =>{
    
    const newLikeObject = {
        photo_id: photo_id
    }
    
    console.log(photo_id);

    const request = new Request(`${API_HOST}/api/dislikeevent`, {
        method: "PATCH",
        body: JSON.stringify(newLikeObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request)
    .then(res=>{
        if(res.status===200){
            return;
        }
        if(res.status===404){
            alert("Please login or Register an account for your vote to count!")
            return;
        }
    })
    .catch(

    )

}
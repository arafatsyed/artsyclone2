import ENV from './../config.js'
const API_HOST = ENV.api_host;


export const initChallenge= (app)=>{
    
    //returns currChallenge previousChallenge and winner posts 
    const url = `${API_HOST}/api/init-challenge`;
    
    //console.log("here app");
    fetch(url)
    .then(res=>{
        
        if(res.status===200){
            return res.json();
        }
    })
    .then(json => {
        //if server gave back json correctly
        if(json && json.prevChallenge && json.currChallenge){
            let winPosts = [];
            for (let i = 0 ; i < json.winnerPosts.length; i++){
                const winPostElement = json.winnerPosts[i]
                let officialWinPostElement = {   
                    name: false,
                    votes: winPostElement.number_likes,
                    challenge: `${winPostElement.challenge} Challenge`, 
                    photo: winPostElement.image_url,
                    artist: winPostElement.creator[0].userprofilename,
                    photoName: winPostElement.creator[0].photoname
    
                }
                winPosts.push(officialWinPostElement)
            }
            app.setState({prevChallenge: json.prevChallenge, currChallenge: json.currChallenge, winnerPosts: winPosts});
        }
    })
    .catch(err=>{
        console.log("wrong info");
    })

}
export const initUsers = (app) =>{
    const url = `${API_HOST}/api/all-users`;
    
    //console.log("here app");
    fetch(url)
    .then(res=>{
        
        if(res.status===200){
            return res.json();
        }
    }).then(json=>{
        if(json){
            let usersArr = []
            for (let i = 0; i< json.length; i++){
                const arrElem = json[i]
                let officialUserElem = {
                    n: arrElem.userprofilename,
                    login: arrElem.username

                }
                usersArr.push(officialUserElem)
            }
            app.setState({allUsers: usersArr})
        }
    }).catch (error=>{
        console.log("no users")
    })
}
export const removeUser = (app,username)=>{
    return new Promise((resolve,reject)=>{ 
        const bodyObject = {
            userToRemove: username
        }

        const request = new Request(`${API_HOST}/api/remove-user`,{
            method: "DELETE",
            body: JSON.stringify(bodyObject),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }       
        })

        fetch(request).then(res=>{
            if(res.status===200){
                return res.json();
            }
            else{
                reject();
            }
        }).then(json=>{
            if(json){
                let usersArr = []
                for (let i = 0; i< json.length; i++){
                    const arrElem = json[i]
                    let officialUserElem = {
                        n: arrElem.userprofilename,
                        login: arrElem.username
    
                    }
                    usersArr.push(officialUserElem)
                }
                app.setState({allUsers: usersArr})
                
                resolve();
            }else{
                reject();
            }
        }).catch(err=>{
            console.log("wrong info");
            reject()
        })
    })
}
export const updateChallenge = (app, nextChallenge)=>{
    return new Promise((resolve,reject)=>{
        //console.log(app.state.currChallenge + ' ' + nextChallenge)
    const bodyObject = {
        currChallenge: app.state.currChallenge,
        nextChallenge: nextChallenge
    }

    let bool = true;

    const request = new Request(`${API_HOST}/api/update-challenge`,{
        method: "PATCH",
        body: JSON.stringify(bodyObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }       
    })

    //console.log("here app");
    fetch(request)
    .then(res=>{
        
        if(res.status===200){
            return res.json();
        }
        else{
            reject();
        }
    })
    .then(json => { 
        if(json){
            let winPosts = [];
            for (let i = 0 ; i < json.winnerPosts.length; i++){
                const winPostElement = json.winnerPosts[i]
                let officialWinPostElement = {   
                    name: false,
                    votes: winPostElement.number_likes,
                    challenge: `${winPostElement.challenge} Challenge`, 
                    photo: winPostElement.image_url,
                    artist: winPostElement.creator[0].userprofilename,
                    photoName: winPostElement.creator[0].photoname
    
                }
                winPosts.push(officialWinPostElement)
            }
            
            app.setState({prevChallenge: json.newPrevChallenge, currChallenge: json.newCurrChallenge, winnerPosts: winPosts});
            resolve()
        }else{
            reject()
        }

    })
    .catch(err=>{
        console.log("wrong info");
        reject()
    })

    
    })
   
}
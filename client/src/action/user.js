import ENV from './../config.js'
const API_HOST = ENV.api_host;
//check if session is active and user is logged in
export const checkSession = (app) => {

    const url = `${API_HOST}/users/check-session`;

    console.log("here app");
    fetch(url)
        .then(res => {
            //user logged in
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            //if server gave back json correctly
            if (json && json.currentUser) {
                //set logged in as true and user as current user, and admin rights
                app.setState({ loggedIn: true, user: json.currentUser, admin: json.admin });
            }
        })
        .catch(err => {
            console.log("wrong info");
        })



}

export const refresh = () => {
    const url = `${API_HOST}/profile`;

    console.log("here refresh");
    fetch(url)
        .then(res => {
            //user logged in
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(err => {
            console.log("wrong info");
        })
}

export const login = (app) => {

    return new Promise((resolve, reject) => {
        const loginObject = {
            username: app.state.loginID,
            password: app.state.password,

        }

        const request = new Request(`${API_HOST}/users/login`, {
            method: "post",
            body: JSON.stringify(loginObject),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        fetch(request)
            .then(res => {
                //success
                if (res.status === 200) {
                    return res.json()
                }
            })
            .then(json => {
                if (json.currentUser !== undefined) {
                    app.setState({ loggedIn: true, user: json.currentUser, admin: json.admin, password: "" });
                    resolve(json);
                }
                reject();
            })
            .catch(error => {
                console.log("bad login");
                reject();
            });
    })

}

export const registerAccount = (app) => {

    return new Promise((resolve, reject) => {

        const createAccountObject = {
            username: app.state.registerusername,
            password: app.state.createpassword,
            userprofilename: app.state.registerprofilename,
            admin: false
        }

        const request = new Request(`${API_HOST}/api/createaccount`, {
            method: "post",
            body: JSON.stringify(createAccountObject),
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            }
        })

        fetch(request)
            .then(res => {
                if (res.status === 200) {
                    app.setState({ password: createAccountObject.password, loginID: createAccountObject.username })
                    resolve();
                }
                reject();
            }
            )
            .catch(err => {
                reject();
            })

    })

}

export const updateName = (profileComp) => {

    console.log(profileComp.state.changeNameValue);
    const newNameObject = {
        newName: profileComp.state.changeNameValue
    }

    const request = new Request(`${API_HOST}/api/changeprofilename`, {
        method: "PATCH",
        body: JSON.stringify(newNameObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(res => {
        console.log(res);
    })
        .catch(err => {
            console.log(err);
        });

}

export const updateBioDB = (profileComp) => {

    console.log(profileComp.state.changeBioValue);
    const newNameObject = {
        newBio: profileComp.state.changeBioValue
    }

    const request = new Request(`${API_HOST}/api/changebio`, {
        method: "PATCH",
        body: JSON.stringify(newNameObject),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })

    fetch(request).then(res => {
        console.log(res);
    })
        .catch(err => {
            console.log(err);
        });

}
export const logout = (app)=>{
    const url = `${API_HOST}/users/logout`
    fetch(url).then(res => {
        //success
        if (res.status === 200) {
            console.log("logged out")
            app.setState({loggedIn: false, user: "", admin: false, password:""})
        }else{
            
        }
    }).catch(error => {
        console.log("bad logout");
        
    });
}
export const getExplorePageElems = (app) => {
    
    const url1 = `${API_HOST}/users/check-session`;
    let jsonReturn;
    console.log("here userprofile");
    fetch(url1)
    .then(res=>{
        //user logged in
        if(res.status===200){
            return res.json();
        }
    })
    .then(json => {

        jsonReturn = json.userID;
        return jsonReturn
    }
    )
    .then(userID=>{

        const url = `${API_HOST}/api/getExploreElems`;

        fetch(url)
        .then(res => {if(res.status === 200){return res.json()}})
        .then(posts => {
            let exploreArray = []
                
            for (let i = 0; i < posts.length; i++) {
                const dataPost = posts[i]

                const found = dataPost.users_liked.find(elem=>{
                    if(elem.userID_liked === userID){
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
                exploreArray.push(userPost)
            }
            app.setState({explorePosts: exploreArray})
    
        }).catch(err => {
                console.log(err);
            });
    }).catch(err=>{

   const url = `${API_HOST}/api/getExploreElems`;

       

    fetch(url).then(res => {if(res.status === 200){return res.json()}})
    .then(posts => {
        let exploreArray = []    
        
        for (let i = 0; i < posts.length; i++) {
            const dataPost = posts[i]
            
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
                upVote: false,
                userID: dataPost.creator[0].userID,
                photoID: dataPost._id
            }
            exploreArray.push(userPost)
        }
        app.setState({explorePosts: exploreArray})

    }).catch(err => {
            console.log(err);
        });       

    })     
    
    
    
    // const url = `${API_HOST}/api/getExploreElems`;

       

    // fetch(url).then(res => {if(res.status === 200){return res.json()}})
    // .then(posts => {
    //     let exploreArray = []

    //     const found = databasePost.users_liked.find(elem=>{
    //         if(elem.userID_liked === jsonReturn){
    //             return true;
    //         }
    //     })       
        
    //     for (let i = 0; i < posts.length; i++) {
    //         const dataPost = posts[i]
    //         let userPost = {
    //             name: true,
    //             votes: dataPost.number_likes,
    //             artist: dataPost.creator[0].userprofilename,
    //             photo: dataPost.image_url,
    //             challenge: dataPost.challenge + " Challenge",
    //             photoName: dataPost.creator[0].photoname,
    //             downVote: false,
    //             upVote: false,
    //             userID: dataPost.creator[0].userID,
    //             photoID: dataPost._id
    //         }
    //         exploreArray.push(userPost)
    //     }
    //     app.setState({explorePosts: exploreArray})

    // }).catch(err => {
    //         console.log(err);
    //     });

}
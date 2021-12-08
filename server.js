"use strict";

const log = console.log;
const path = require('path')

const express = require("express");
const { join } = require('path');
// starting the express server
const app = express();

const cors = require('cors');
app.use(cors());

const { mongoose } = require("./db/mongoose");

const { User } = require("./models/user");
const { UserProfile } = require("./models/userprofile")
const { UserPost } = require("./models/userpost");
const {Challenge} = require("./models/challenge")

// body-parser: middleware for parsing parts of the request into a usable object (onto req.body)
const bodyParser = require('body-parser') 
app.use(bodyParser.json()) // parsing JSON body
app.use(bodyParser.urlencoded({ extended: true })); // parsing URL-encoded form data (from form POST requests)

// express-session for managing user sessions
const session = require("express-session");
const MongoStore = require('connect-mongo'); // to store session information on the database in production
const { application } = require('express');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()  
    }   
}




app.use(express.static(path.join(__dirname, "/Client/build")));

// const TestSchema = mongoose.Schema({
//     name: String
// });

/********************Session Handling */

//create a session 
app.use(

    session({
        secret: "testsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 6000000,
            httpOnly: true
        }
    })

)


//POST route to log in
app.post("/users/login", (req,res)=>{
    log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    User.findByUserPass(username,password).then(user=>{
        req.session.user = user._id;
        req.session.username = user.username; 
        req.session.admin = user.admin;

        res.send({currentUser: user.username, admin: user.admin});
        res.status(200)

    }).catch(err =>{
        res.status(400).send("Wrong password or username");
    })

})
// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})
//checks to see if a user is logged in
app.get("/users/check-session", (req,res)=>{
    //if user logged in
    log(req.session);
    
    if(req.session.user){
        res.status(200).send({currentUser: req.session.username, admin: req.session.admin, userID: req.session.user});
    }
    else if(req.session.username){
        //send json back with current user
        res.status(200).send({currentUser: req.session.username, admin: req.session.admin});
    }
    else{
        res.status(401).send("user not logged in");
    }

})

/*****************API ROUTES******************/


app.patch("/api/changeprofilename", mongoChecker, async (req,res)=>{

    const userID = req.session.user;
    const newName = req.body.newName;
    log("change name user: " + userID)
    try{

        //find user 
        const user = await User.findById(userID);

        user.userprofilename = newName;

        log("1")
        await user.save()
        log("2")

        //find user profile
        const userProfile = await UserProfile.findOne({userID: userID});
        log("3")
        if(!userProfile){
            res.status(404).send("bad request");
            return;
        }

        userProfile.userProfileName = newName;
        
        //update user posts

        const userPosts = await UserPost.updateMany({"creator.0.userID": userID}, {$set: {"creator.0.userprofilename": newName}});
        log("4")
        const userPosts2 = await UserPost.find({"creator.0.userID": userID});
        log("5")
        
        if(!userPosts2){
            res.status(404).send("Bad request + kekl");
            return;
        }
        
        userProfile.posts = userPosts2;
        log("6")
        await userProfile.save();
        log("7")
        res.status(200).send("Succesfully changed username");

    }
    catch(err){
        res.status(404).send("Bad request");
    }

})

app.patch("/api/changebio", mongoChecker, async (req,res)=>{

    const userID = req.session.user;
    const newBio = req.body.newBio;

    log(req.body);

    if(userID===undefined){
        res.status(404).send("bad request");
        return;
    }
    
    try{

        const userProfile = await UserProfile.findOne({userID: userID});

        if(!userProfile){
            res.status(404).send("bad request");
            return;
        }

        userProfile.profileMessage = newBio;
        //userProfile.updateOne({"profileMessage": newBio});

        await userProfile.save();

        res.status(200).send("Succesfully changed bio");


    }
    catch(err){
        res.status(404).send("Bad request");
    }


})

app.get("/api/init-challenge", mongoChecker,async(req,res)=>{
    try{
        const dummy = await Challenge.find()
       // log(dummy)
        const currChallenge = await Challenge.findOne({active: "true"}) 
        const prevChallenge = await Challenge.findOne({previous:"true"})
        
        //log(prevChallenge)
        const winnerPosts =  prevChallenge.winners
        res.status(200).send({currChallenge : currChallenge.name, prevChallenge : prevChallenge.name, winnerPosts: winnerPosts});
    }catch(error){
        log(error)
		res.status(500).send("Internal Server Error")
    }
})



app.get("/api/getExploreElems", mongoChecker, async (req, res)=>{

    try{
        const challenge = await Challenge.findOne({active: "true"})
        const posts = await UserPost.find({challenge: challenge.name})
        
        res.status(200).send(posts)
    } catch (error){
        res.status(500).send("Internal Server Error")
    }
})



app.patch("/api/update-challenge", mongoChecker, async (req,res) => {
        const currChallenge = req.body.currChallenge
        const nextChallenge = req.body.nextChallenge
        //log(currChallenge)
        //check for admin req.session.admin
    try{
        const allPosts = await UserPost.find({challenge: currChallenge}).sort({"number_likes" : -1})
        let winnerPosts = [];
        if(allPosts.length >= 3){
            winnerPosts.push(allPosts[2]);
            winnerPosts.push(allPosts[1]);
            winnerPosts.push(allPosts[0]);

            const prevChallenge = await Challenge.findOne({previous:"true"})
            prevChallenge.previous = false;
            await prevChallenge.save();

            const newPrevChallenge = await Challenge.findOne({active:"true"})
            newPrevChallenge.previous = true;
            newPrevChallenge.active = false;
            newPrevChallenge.winners = winnerPosts
            await newPrevChallenge.save();

            const newChallenge = new Challenge({
                name: nextChallenge,
                previous : false,
                active: true,
                winners: []
            })
            await newChallenge.save()
        
        res.status(200).send({newCurrChallenge : nextChallenge, newPrevChallenge : currChallenge, winnerPosts: winnerPosts});
        }
        else{
            res.status(402).send("Not enough submitted posts")
            return
        }
        
        

        
    }catch(error){
        log(error)
		res.status(500).send("Internal Server Error")

    }

})
//manual inserting into database for preloaded pictures
app.post("/api/insertphoto/manual/:userid", mongoChecker, async (req,res)=>{


    // if(req.session.user === undefined){
    //     res.status(404).send("bad request");
    //     return;
    // }
    const userId = req.params.userid;

    try{
        //find the user
        log(req.body);
        const user = await User.findById(userId);
        //find their profile
        log("found user");
        log(userId);
        const userProfile = await UserProfile.findOne({userID: userId})
        log("found profile");
  
        const newPost = new UserPost({
            image_id: req.body.public_id,
            image_url: req.body.public_url,
            users_liked: [],
            creator: {
                userID: user._id,
                userprofilename: user.userprofilename,
                photoname: req.body.photoname
            },
            challenge: req.body.challenge,
            number_likes: req.body.num_likes
    
        });

        //save post
        await newPost.save();

        //push post onto user profile
        userProfile.posts.push(newPost);
        log("pushed post");
        await userProfile.save();

        res.status(200).send({newPost: newPost, user: {userid: user._id, userprofilename: user.userprofilename}});

    }
    catch(err){
        res.status(500);
    }



})
app.delete("/api/remove-user", mongoChecker, async (req,res)=>{
    const userToDelete = req.body.userToRemove;
    try{
        let newUserArr = await User.findOneAndDelete({username: userToDelete});

        
       console.log(`in the delete : ${newUserArr}`)
        if(newUserArr){
            const userPosts = await UserPost.deleteMany({"creator.0.userID": newUserArr._id});
            console.log(userPosts)
            newUserArr = await User.find({admin:false})
            res.status(200).send(newUserArr)
        }else{
           // console.log("ASIOOIASHOIASJoi")
            res.status(404).send(newUserArr)
        }
        
        
        
    }catch(error){
        console.log(error)
        res.status(500)
    }
} )
app.get("/api/all-users", mongoChecker, async (req,res)=>{
    try{
        const userArray = await User.find({admin: false})
        res.status(200).send(userArray)
    }catch(error){
        console.log(error)
        res.status(500)
    }    

//append to users_liked and increase photo num_likes by 1
app.patch("/api/likeevent", mongoChecker , async (req,res) =>{

    const user_ID = req.session.user;
    const photo_id = req.body.photo_id;

    log(req.body);
    log(req.session.user);
    if(!user_ID){
        res.status(404).send("Not logged in");
        return;
    }

    try{

        const posts = await UserPost.findById(photo_id); 
        
        if(!posts){
            res.status(404).send("Didn't find post")
            return;
        }

        if(posts.users_liked){
            for(let i=0; i<posts.users_liked.length;i++){
                if(posts.users_liked[i]===user_ID){
                    res.status(404).send("double like");
                    return;
                }
            }
        }

        
        

        posts.number_likes++;
        posts.users_liked.push({userID_liked: user_ID});
        log(posts)
        await posts.save();

        res.status(200).send("Updated");

    }catch(err){
        res.status(404).send("Server error");
    }

})

//append to users_liked and increase photo num_likes by 1
app.patch("/api/dislikeevent", mongoChecker , async (req,res) =>{

    const user_ID = req.session.user;
    const photo_id = req.body.photo_id;

    if(!user_ID){
        res.status(404).send("Not logged in");
        return;
    }

    try{

        const posts = await UserPost.findById(photo_id); 
        
        if(!posts){
            res.status(404).send("Didn't find post")
        }

        const newUserLiked = posts.users_liked.filter(elem=>{
            return elem.userID_liked !== user_ID;
        })

        posts.number_likes--;
        posts.users_liked = newUserLiked;

        await posts.save();

        res.status(200).send("Updated");

    }catch(err){
        res.status(404).send("Server error");
    }

})

// cloudinary: configure using credentials found on your Cloudinary Dashboard
// sign up for a free account here: https://cloudinary.com/users/register/free
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dwta0wv9c',
    api_key: '249548546842724',
    api_secret: 'X_7JpEU32iThhVD7hVMon4ImM98'
});

app.post("/images", async (req, res) => {
    console.log(req.body.img);
    // Use uploader.upload API to upload image to cloudinary server.
    if(!req.session.user){
        res.send(400).send("login");
        return;
    }

    cloudinary.uploader.upload(
        req.body.img, // req.files contains uploaded files
        
        async function (result) {
            const id = result.public_id;
            const imgURL = result.url;
            const userID = req.session.user;
            
            try{
            const userprofileDB = await UserProfile.findOne({userID: userID})
            
            const challenge = await Challenge.findOne({active: true})

            const newPost = new UserPost({
                image_id: id,
                image_url: imgURL,
                users_liked: [],
                creator: {
                    userID: userID,
                    userprofilename: userprofileDB.userProfileName,
                    photoname: "Submission"
                },
                challenge: challenge.name,
                number_likes: 0
            });

            await newPost.save();

            userprofileDB.posts.push(newPost);
            
            await userprofileDB.save();

            res.status(200).send(newPost);
        }
        catch(err){
            res.status(500).send("bad upload")
        }
        });
        
});

})
//POST route to create an account
app.post("/api/createaccount", mongoChecker, async (req,res)=>{

    log(req.body);

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        userprofilename: req.body.userprofilename,
        admin: req.body.admin
    })

    try{
        
        const newUser = await user.save();

        let num =  await User.countDocuments({admin: false});
        
        
        const userProfile =  new UserProfile({
            userProfileName: user.admin===true?null:user.userprofilename,
            postNumber: "0",
            userID: newUser._id,
            userRanking: user.admin===true?null:"#" + num,
            profileMessage: ""
        })

        const newProfile = await userProfile.save()

        res.status(200).send("successful request");
    }
    catch(error){
        res.status(400).send("bad request");
    }


    //create an empty profile for new user

})



//get the logged in users profile data
app.post("/api/getprofilebyid", mongoChecker, async (req,res)=>{

    log(req.body.userID);
    try{
       
        const userProfile = await UserProfile.find({userID: req.body.userID});
        const userPosts = await UserPost.find({"creator.0.userID": req.body.userID});

        userProfile[0].posts = userPosts;
        await userProfile[0].save()
        res.status(200).send(userProfile);
    }
    catch(err){
        res.status(500).send("bad request");
    }
})
/*
app.get("/userprofile1/:id", mongoChecker, async (req, res)=>{

    const uid = req.params.id
    try{
        console.log(uid + "asjkdhnnakjsd")
        res.sendFile(path.join(__dirname, "/client/build/index.html"))
    } catch (error){
        res.status(500).send("Internal Server Error")
    }
})
*/

app.get("*", (req,res)=>{

    const goodPageRoutes = ["/","/profile","/shop" , "/leaderboard", '/explore','/canvas', "/userprofile1/:id"];

    if(!goodPageRoutes.includes(req.url)){
        res.status(404);
    }
    res.status(200);
    res.sendFile(path.join(__dirname, "/client/build/index.html"))
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
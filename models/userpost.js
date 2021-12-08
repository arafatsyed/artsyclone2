const mongoose = require('mongoose');


const UserPostSchema = mongoose.Schema({
    //image name on cloudinary (public)
    image_id: {
        type: String,
        required: true
    },
    //public url of the image
    image_url: {
        type: String,
        required: true
    },
    //arary of users that liked this
    users_liked: [{
        userID_liked:{type:String}
    }],

    //who created the post
    creator: [{userID:String, userprofilename:String, photoname:String}],

    //challenge post related to
    challenge: String,
    //number of likes on post
    number_likes: Number

})


const UserPost = mongoose.model("UserPost", UserPostSchema, "UserPost" );

module.exports = {UserPost, UserPostSchema};
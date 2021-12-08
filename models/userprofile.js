const mongoose = require('mongoose')

const { UserPostSchema } = require("./userpost.js")

const UserProfileSchema = mongoose.Schema({

    userProfileName: {
        type: String,
        required: false,
    },
    postNumber: {
        type: String
    },
    userID: {
        type: String,
        required: true
    },
    userRanking: {
        type: String
    },
    profileMessage: {
        type: String
    },
    currentDrawing: [],
    posts: [UserPostSchema],
    numberlikes: Number
})

const UserProfile = mongoose.model('UserProfile', UserProfileSchema, "UserProfile");
module.exports = {UserProfile}
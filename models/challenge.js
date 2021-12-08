const mongoose = require('mongoose')

const { UserPostSchema } = require("./userpost")

const ChallengeSchema = mongoose.Schema({
    name : String,
    active: Boolean,
    previous: Boolean,
    winners: [UserPostSchema]

})

const Challenge = mongoose.model('Challenge', ChallengeSchema, "Challenge");
module.exports = {Challenge}
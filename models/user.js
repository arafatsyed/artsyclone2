const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const UserSchema = new mongoose.Schema({

    username: { //login user
        type: String,
        required: true,
        minlength: 4,
        trim: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true,
        minlength: 4
    },
    userprofilename:{ //profile name, custom
        type: String,
        minlength: 4,
        required: false
    },
    admin: {
        type: Boolean,
        required: true
    }

})

//hash password
UserSchema.pre('save',function(next){
    const user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                user.password = hash;
                next();
            })
        })
    }
    else{
        next();
    }
})

UserSchema.statics.findByUserPass = function(username,password){
    const user = this;

    //first search by username
    return user.findOne({username: username}).then((user)=>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve,reject)=>{
            bcrypt.compare(password, user.password, (err,result)=>{
                if(result){
                    resolve(user);
                }
                else{
                    reject();
                }
            })
        })
    })
}

const User = mongoose.model('User',UserSchema,"User");
module.exports = {User}
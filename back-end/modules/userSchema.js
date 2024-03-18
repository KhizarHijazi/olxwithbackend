import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwtSecret from "../config/jwt.js";



const { Schema } = mongoose

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    tokens : {
        default : [],
        type : []
    }

})

userSchema.pre('save', function(next){
    const user = this
    if (user.isModified('password')) {
        // console.log('user this',user)
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        // console.log('msaly wala password',hash)
        user.password = hash
        }
    next()
})

userSchema.methods.comparePassword = function(password) {
    const user = this
    console.log('db password', user.password)
    console.log('frontend password', password)
  return  bcrypt.compareSync(password, user.password);

}

userSchema.methods.generateToken = function (){
    const {_id } = this
    console.log(_id ,"this wali _id")
    const token = jwt.sign({ _id }, jwtSecret);
    console.log('jwt token' , token)
    return token
}

const users = mongoose.model('users', userSchema)

export default users
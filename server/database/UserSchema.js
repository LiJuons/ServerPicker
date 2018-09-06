const Mongoose = require("mongoose")
const {hashSync, compareSync} = require("bcrypt-nodejs")
const jwt = require("jsonwebtoken")


const UserSchema = new Mongoose.Schema({
  username : {
    trim: true,
    type:String
  },
  password : {
    trim: true,
    type:String
  }
})


UserSchema.pre("save", function(next) {
    if(!this.isModified()) return next()
    this.password = this._hashSync(this.password)
    return next()
})

UserSchema.methods = {
    _hashSync(password) {
        return hashSync(password)
    },
    comparePassword(password) {
        return compareSync(password, this.password)
    },
    createToken() {
        return jwt.sign({_id: this._id}, 'serv3rp1cker')
    },
    toAuthJson() {
        return {
            token: this.createToken(),
            ...this.toJson()
        }
    },
    toJson() {
        return {
            _id: this._id,
            username: this.username
        }
    }
}

module.exports = Mongoose.model('users', UserSchema);

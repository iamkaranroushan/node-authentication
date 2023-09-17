const mongoose  = require("mongoose");
const { isEmail } = require("validator")
const userSchema  = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'please enter an email '],
        unique: true,
        lowercase:true,
        validate: [isEmail,'please enter valide email']

    },
    password:{
        type:String,
        required:[true, 'please enter a password'],
        minlength: [6, 'min length of password is 6 characters']
        
    }
})

const user = mongoose.model('user', userSchema)



module.exports = user
const mongoose  = require("mongoose");
const { isEmail } = require("validator")

const bcrypt = require("bcrypt");

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



userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
})



const user = mongoose.model('user', userSchema)



module.exports = user
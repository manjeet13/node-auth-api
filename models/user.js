/**
 * @author : Manjeet Kumar
 * @description : defines mongoose schema for storing username, email and password. It further implements the password encryption and validation logic.
*/

const mongoose    = require("mongoose");
const bcrypt      = require("bcrypt-nodejs");

var userSchema  = new mongoose.Schema({
    name: String,
    local: {
        email: String,
        password: String
    }
});

//userSchema.plugin(passportLocalMongoose);

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
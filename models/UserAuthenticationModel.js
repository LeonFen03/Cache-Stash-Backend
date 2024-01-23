const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:  {type: mongoose.Schema.Types.ObjectId },
    email: { type: String },
    username: {type: String},
    passwordDigest:{ type: String },
    role: {type: String}
})

module.exports = mongoose.model('UsersAuth', userSchema);

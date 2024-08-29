const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    aadharNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
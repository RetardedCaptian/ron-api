
const mongoose = require('mongoose');

const otp= new mongoose.Schema({
    aadharNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    dateTime:{
        type:String,
        required:true
    }

});



module.exports =mongoose.model('otp', otp);
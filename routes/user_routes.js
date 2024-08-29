const r=require('express').Router();
const uf = require('../functions/user-functions');
const {registerValidation}=require('../validation/validation')

r.post('/user-register',async(req,res)=>{
    try {
        const {error}=registerValidation(req.body)
        if(error) res.json({s:false,m:error.details[0].message})
        const data=await uf.register(req.body)
        return res.json(data)
        
    } catch (error) {
        console.log(error);
        return res.json({s:false,m:error.message})
    }
})

r.get('/get-email-otp/:aadhar',async(req,res)=>{
    try {
        const data=await uf.getEmailOtp(req.params.aadhar);
        return res.json(data)
    } catch (error) {
        
        return res.json({s:false,m:error.message})
    }
})
r.get('/verify-email-otp/:aadhar/:otp',async(req,res)=>{
    try {
        const data=await uf.verifyEmailOtp(req.params.otp,req.params.aadhar)
        return res.json(data)
    } catch (error) {
        return res.json({s:false,m:error.message})
    }
})
module.exports=r
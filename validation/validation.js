const joi=require('joi')

module.exports.registerValidation=function (body){
    const schema=joi.object({
        name:joi.string().required().min(3).max(20),
        email:joi.string().required().email().min(10).max(1024),
        phoneNumber:joi.number(),
        aadharNumber:joi.number(),
        dob:joi.date().min('1990-01-01')
    })

    return schema.validate(body)
}
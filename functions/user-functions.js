const User = require('../models/user_model');
const nodemailer = require('nodemailer');
const { Validator } = require('esevajs');
const Otp = require('../models/otp-model');
// const otpGenerator = require('otp-generation');

const uf = {
    register: async (body) => {
        try {
            let user = await User.findOne({ email: body.email });
            if (!user) {
                const string = String(body.aadharNumber);
                console.log(string);

                let isValid = Validator.aadhaar(string);
                if (isValid) {
                    const data = await this.getEmailOtp(body.aadharNumber)
                    // const newUser = new User({
                    //     name: body.name,
                    //     email: body.email,
                    //     phoneNumber: body.phoneNumber,
                    //     aadharNumber: body.aadharNumber,
                    //     dateOfBirth: body.dob,
                    //     isEmailVerified: false,
                    //     isPhoneVerified: false
                    // });
                    // console.log(newUser);

                    // await newUser.save(newUser);
                    return data
                }

            } else {
                return { s: false, m: 'account exists' }
            }


        } catch (error) {
            console.log(error);

            return { s: false, message: error.message }
        }
    },
    getEmailOtp: async (aadharNumber) => {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'nemotheshipcaptian@gmail.com',
                    pass: process.env.APPPWD,
                },
            });
            const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
            const mailOptions = {
                // from: 'shijinjose333@gmail.com',
                to: 'shijinjose1999@gmail.com',
                subject: 'OTP VERIFICATION',
                text: String(otp),
            };
            const data = transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error)
                    return { success: false, msg: 'unsuccessfull' }
                } else {
                    // console.log(info);
                    return { success: true, msg: 'posted' }

                }

            });
            const date = new Date();

            const otpExpire = date.getTime() + (5 * 60 * 1000)
            console.log(otpExpire);
            console.log(date.getTime());
            console.log(otpExpire);
            // throw 'err'


            const isOtp = await Otp.findOne({ aadharNumber: aadharNumber })
            console.log(isOtp);

            if (!isOtp) {
                const otpData = new Otp({
                    aadharNumber: aadharNumber,
                    otp: otp,
                    dateTime: otpExpire,
                })
                const dat = await otpData.save()
                console.log(dat);
            } else {
                isOtp.otp = otp
                isOtp.dateTime = otpExpire
                console.log(isOtp);

                await isOtp.save()
            }
            return { s: true, m: 'otp sent' }

        } catch (error) {
            return { s: false, m: error.message }
        }
    },
    verifyEmailOtp: async (otp, body) => {
        try {
            const otpDb = await Otp.findOne({ aadharNumber: body.aadharNumber })
            if (otpDb) {
                const date = new Date();
                if (date.getTime() <= otpDb.dateTime) {
                    const verifyOtp = (otp === otpDb.otp)
                    if (verifyOtp) {
                        await otpDb.deleteOne()

                        const newUser = new User({
                            name: body.name,
                            email: body.email,
                            phoneNumber: body.phoneNumber,
                            aadharNumber: body.aadharNumber,
                            dateOfBirth: body.dob,
                            isEmailVerified: false,
                            isPhoneVerified: false
                        });
                        console.log(newUser);

                        await newUser.save(newUser);
                        return { s: true, m: 'registered' }

                    } else {
                        return { s: true, m: 'wrong otp' }

                    }
                } else {
                    await otpDb.deleteOne()
                    return { s: false, m: "otp Expired" }
                }
            }

        } catch (error) {
            return { s: false, m: error.message }
        }
    }
};

module.exports = uf
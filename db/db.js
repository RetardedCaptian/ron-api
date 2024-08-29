const mongoose = require('mongoose')

const dbconn = async () => {
    try{
        mongoose.set('strictQuery', false)
        let conn = await mongoose.connect(process.env.DBCONFIGSTRING)
        console.log(`connected to server: ${conn.connection.host}`);
    }catch(e){
        console.log(e.message);
    }
}



module.exports = dbconn
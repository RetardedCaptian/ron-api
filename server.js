const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./db/db');
const r=require('./routes/user_routes');
app.use(express.json());


app.use('/',r)

const port = process.env.PORT||3000
db().then(() => {

    // server.listen()
    app.listen(port,() => console.log(`server is connected on ${port}`))
})
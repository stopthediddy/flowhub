const postModel = require('./components/models')
const routerModule = require('./components/router')
require('dotenv').config({ path: './src/component/.env' });
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 5500
const router = express.Router()
const bodyParser = require('body-parser')
const { response } = require('express');
const serverless = require("serverless-http")
const cors = require('cors')
app.use(cors({ origin: '*'}));


// ? connect db server
mongoose.connect(
    mongodb+srv://mungus58:<db_password>@cluster0.lcdsaug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0, //* Database url here
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, res) {
        if (err) {
            console.warn(err);
        }
        try {
            console.log('Connected to Database');
        } catch (err) {
            throw err
        }
    } 
)
 
//* import from other folders------------------------------------------------------------------------------------
// ? because we use netlify to host api
app.use("/.netlify/functions/api",routerModule)

//*--------------------------------------------------------------------------------------------------------------

    
// ? middleware to tell express that the server accept json
app.use(express.json())
app.use(bodyParser.json())
app.use("/.netlify/functions/api", router)
    
// ? run api on port
// app.listen(port, () => {
//     console.log(`Listening to port ${port} `)
// })

module.exports = app;
module.exports.handler = serverless(app)

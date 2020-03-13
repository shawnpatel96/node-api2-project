const express = require("express");
const dbRouter= require('../data/db-router.js') 
// var cors = require('cors')
const server = express(); // this is what we are exporting 

server.use(express.json())

server.use(cors())

server.get('/', (req,res)=>{
    res.status(200).send('Welcome to Node-Api2-Project')
});
server.use('/api/posts', dbRouter)



module.exports=server
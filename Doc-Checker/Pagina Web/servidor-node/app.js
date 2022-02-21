const express = require('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json);
    
const dotenv = require('dotenv');

app.get('/', (req, res)=>{
    res.send('HOLA MUNDO');
})

app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN ...');
})
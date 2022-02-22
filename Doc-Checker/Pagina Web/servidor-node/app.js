// 1 - Invocamos a Express
const express = require('express');
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json);

//3- Invocamos a dotenv
const dotenv = require('dotenv');
/*
//6 -Invocamos a bcrypt
const bcryptjs = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));*/

app.get('/', (req, res)=>{
    res.send('HOLA MUNDO');
})

//11 - Metodo para la autenticacion
app.post('/auth', async (req, res)=> {
    console.log(req);
});


app.listen(3000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:3000');
})
// 1 - Invocamos a Express
const express = require('express');
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env'});
 
//6 -Invocamos a bcrypt
const bcryptjs = require('bcryptjs');

//7- variables de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// 8 - Invocamos a la conexion de la DB
const connection = require('./db/db');

app.get('/', (req, res)=>{
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.send('HOLA MUNDO');
	console.log('Cliente');
	res.end();
})

//11 - Metodo para la autenticacion
app.post('/auth', async (req, res)=> {
    const user = req.body.user;
	const pass = req.body.pass;
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Credentials', true);
    //let passwordHash = await bcrypt.hash(pass, 8);
	if (user && pass) {
		connection.query('SELECT * FROM Doctor WHERE CorreoE = ?', [user], async (error, results, fields)=> {
			//if( results.length == 0 || !(await bcrypt.compare(pass, results[0].pass)) ) {
			//console.log(results[0]);
			if( results.length == 0 || !(pass == results[0].Contrasenia) ) {
				//Contrasenia incorrecta
				res.send("/");
			} else {
				req.session.loggedin = true;                
				req.session.name = results[0].name;
				//console.log(req.session);
				res.send("pacientes");        			
			}			
			res.end();
		});
	} else {
		res.send('/');
		res.end();
	}
});

app.post('/registrar', async (req, res)=> {
    const Cedula = req.body.cedula;
	const Nombre = req.body.nombre;
	const ApellidoP = req.body.apellidoPaterno;
	const ApellidoM = req.body.apellidoMaterno;
	const Apellidos = ApellidoP + " " + ApellidoM;
	const CorreoE = req.body.correo;
	const Contrasenia = req.body.contrasenia;
	const Telefono = req.body.tel1;
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Credentials', true);
    //let passwordHash = await bcrypt.hash(pass, 8);
	const sql = 'INSERT INTO Doctor(CedulaProf,Nombre,Apellidos,CorreoE,Contrasenia,Sexo,FechaNac,Especialidad,Direccion,Telefono,IdAdmin) VALUES (?)';
	const valores =  [
						Cedula,
						Nombre,
						Apellidos,
						CorreoE,
						Contrasenia,
						'Masculino',
						'1999-01-01',
						'Doctor',
						'Lugar en que reside',
						Telefono,
						'1'];
	//console.log(valores);
	connection.query(sql, [valores], async (error, results)=> {
		//console.log(error)
		res.send("/");		
		res.end();
	});
});


//12 - Método para controlar que está auth en todas las páginas
app.get('/validar', (req, res)=> {
	//console.log(req.session);
	var dirigir = req.query.ruta.toLowerCase();
	//console.log(dirigir);
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		if(dirigir == 'undefined')
			res.send('/');
		else
			res.send(dirigir);
	} else {
		res.send("/");
	}
	res.end();
});

//función para limpiar la caché luego del logout
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
		res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
		res.setHeader('Access-Control-Allow-Credentials', true);
		//res.setHeader('credentials', 'include');
		//res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.send('/');
		res.end();
	})
});

app.listen(8081, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:8081');
})
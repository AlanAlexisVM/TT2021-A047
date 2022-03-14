// 1 - Invocamos a Express
const express = require('express');
const app = express();
//Const ip = "192.168.1.101"; //Funciona en el navegador de otro dispositivo
const ip = "localhost";
const port = "8080";

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//3- Invocamos a dotenv
const dotenv = require('dotenv');
dotenv.config({ path: './env/.env' });

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

app.get('/', (req, res) => {
	res.header('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	//console.log('Cliente');
	res.send("Hola mundo");
	res.end();
})

//11 - Metodo para la autenticacion
app.post('/auth', async (req, res) => {
	const user = req.body.user;
	const pass = req.body.pass;
	//console.log(req.body)
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (user && pass) {
		connection.query('SELECT * FROM Doctor WHERE CorreoE = ?', [user], async (error, results, fields) => {
			if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].Contrasenia))) {
				//console.log(results[0]);
				//Contrasenia incorrecta
				res.send("/");
			} else {
				req.session.loggedin = true;
				req.session.name = results[0].CorreoE;
				req.session.cedula = results[0].CedulaProf;
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

app.post('/registrar', async (req, res) => {
	const Cedula = req.body.cedula;
	const Nombre = req.body.nombre;
	const ApellidoP = req.body.apellidoPaterno;
	const ApellidoM = req.body.apellidoMaterno;
	const Apellidos = ApellidoP + " " + ApellidoM;
	const CorreoE = req.body.correo;
	const Contrasenia = req.body.contrasenia;
	let ContraHaash = await bcryptjs.hash(Contrasenia, 8);
	const Sexo = req.body.sexo;
	const FechaNacimiento = req.body.fechaNacimiento;
	const Especialidad = req.body.especialidad;
	const Direccion = req.body.direccion;
	const Telefono1 = req.body.tel1;
	const Telefono2 = req.body.tel2;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	const sql = 'INSERT INTO Doctor(CedulaProf, Nombre, Apellidos, CorreoE, Contrasenia, Sexo, FechaNac, Especialidad, Direccion, Telefono1, Telefono2, IdAdmin) VALUES (?)';
	const valores = [
		Cedula,
		Nombre,
		Apellidos,
		CorreoE,
		ContraHaash,
		Sexo,
		FechaNacimiento,
		Especialidad,
		Direccion,
		Telefono1,
		Telefono2,
		'1'];
	//console.log(valores);
	connection.query(sql, [valores], async (error, results) => {
		//console.log(error)
		res.send("/");
		res.end();
	});
});

app.post('/cambiarcontra', async (req, res) => {
	const user = req.session.name;
	const Contrasenia = req.body.contrasenia;
	const newContrasenia = req.body.newcontrasenia;
	const newContrasenia2 = req.body.newcontrasenia2;
	if(newContrasenia == newContrasenia2){
		connection.query('SELECT * FROM Doctor WHERE CorreoE = ?', [user], async (error, results, fields) => {
		if (results.length == 0 || !(await bcryptjs.compare(Contrasenia, results[0].Contrasenia))) {
			//console.log(results[0]);
			//Contrasenia incorrecta
			//alert("Contraseña incorrecta");
			res.send("configuracion");
		}else{
			let ContraHaash = await bcryptjs.hash(newContrasenia, 8);

			const sql = 'UPDATE Doctor SET Contrasenia = "'+ ContraHaash +'" WHERE CorreoE = "'+ user +'"';
			//console.log(sql);
			connection.query(sql, async (error, results) => {
				//console.log(error)
				res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
				res.setHeader('Access-Control-Allow-Credentials', true);
				res.send("configuracion");
				//res.alert("Good");
				res.end();
			});
		}
	});
}
});

app.post('/agregarPaciente', async (req, res) => {
	const Id = req.body.id;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	if(req.session.cedula!=null){
		//console.log("Existe");
		const sql = 'INSERT INTO Atiende(CedulaProf,CURP) VALUES (?)';
		valores = [
			req.session.cedula,
			req.body.id
		];
		//console.log(valores);
		connection.query(sql, [valores], async (error, results) => {
			//console.log(error)
			res.send("/");
			res.end();
		});
	}else{
		//console.log("No existe");
		res.send("/buscador");
		res.end();
	}
});

app.post('/obtenerPaciente', async (req, res) => {
	const CURP = req.body.curp;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	if(req.session.cedula!=null && req.session.loggedin){
		//console.log("Existe");
		const sql = "SELECT Nombre, Apellidos, CURP, FechaNac, Sexo, Telefono1, Telefono2, CorreoE, Direccion, Estado, IdDCH, IdSi FROM Paciente WHERE Paciente.CURP = (?)";
		valores = [CURP]
		connection.query(sql, [valores], async (error, results) => {
			res.send(results);
			res.end();
		});
	}else{
		//console.log("No existe");
		res.send("/");
		res.end();
	}
});

app.post('/obtenerPaciente2', async (req, res) => {
	const CURP = req.body.curp;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	if(req.session.cedula!=null && req.session.loggedin){
		//console.log("Existe");
		const sql1 = "SELECT Nombre, Apellidos, CURP, FechaNac, Sexo, Telefono1, Telefono2, CorreoE, Direccion, Estado, IdDCH, IdSi FROM Paciente WHERE Paciente.CURP = (?)";
		const sql = "SELECT ExposicionSolar, VariacionesdeTemperatura, VariacionesdeHumedad, ExposicionRuido, IdInforme, ActividadFisica, Educacion, HorasDeSuenio, EstadoCivil, PersonasDependientes, ConsumoDeFarmacos FROM InformePaciente WHERE InformePaciente.CURP = (?)";
		valores = [CURP]
		connection.query(sql, [valores], async (error, results) => {
			res.send(results);
			res.end();
		});
	}else{
		//console.log("No existe");
		res.send("/");
		res.end();
	}
});

app.post('/registrarPaciente', async (req, res) => {
	const Nombre = req.body.nombre;
	const ApellidoP = req.body.apellidoPaterno;
	const ApellidoM = req.body.apellidoMaterno;
	const Apellidos = ApellidoP + " " + ApellidoM;
	const FechaNacimiento = req.body.fechaNacimiento;
	const Sexo = req.body.sexo;
	const CURP = req.body.curp;
	const CorreoE = req.body.correo;
	const Telefono1 = req.body.tel1;
	const Telefono2 = req.body.tel2;
	const Direccion = req.body.direccion;
	const Estado = req.body.estado;
	const Placa = req.body.numPlaca;
	let IdSi = req.session.id;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	//let passwordHash = await bcrypt.hash(pass, 8);
	connection.query("INSERT INTO SignosVitales(IdSi) VALUES (NULL)", async (error, results) => {
		//console.log(error)
		IdSi = results.insertId;
		let sql = 'INSERT INTO Paciente(Nombre,Apellidos,CURP,FechaNac,Sexo,Telefono1,Telefono2,CorreoE,Direccion,Estado,IdDCH,IdSi) VALUES (?)';
		let valores = [
			Nombre,
			Apellidos,
			CURP,
			FechaNacimiento,
			Sexo,
			Telefono1,
			Telefono2,
			CorreoE,
			Direccion,
			Estado,
			Placa,
			IdSi
		];
		//console.log(req.session);
		//console.log(valores);
		connection.query(sql, [valores], async (error, results) => {
			//console.log(error)
			sql = 'INSERT INTO Atiende(CedulaProf,CURP) VALUES (?)';
			valores = [
				req.session.cedula,
				CURP
			];
			//console.log(req.session);
			//console.log(valores);
			connection.query(sql, [valores], async (error, results) => {
				//console.log(error)
				res.send("Registropacientes2");
				res.end();
			});
		});
	});
});

app.post('/actualizarPaciente', async (req, res) => {
	const Nombre = req.body.nombre;
	const ApellidoP = req.body.apellidoPaterno;
	const ApellidoM = req.body.apellidoMaterno;
	const Apellidos = ApellidoP + " " + ApellidoM;
	const FechaNacimiento = req.body.fechaNacimiento;
	const Sexo = req.body.sexo;
	const CURP = req.body.curp;
	const CorreoE = req.body.correo;
	const Telefono1 = req.body.tel1;
	const Telefono2 = req.body.tel2;
	const Direccion = req.body.direccion;
	const Estado = req.body.estado;
	const Placa = req.body.numPlaca;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
		//console.log(error)
		let sql = "UPDATE Paciente SET Nombre = '"+Nombre+"', Apellidos = '"+Apellidos+"', FechaNac = '"+FechaNacimiento+"', Sexo = '"+Sexo+"', Telefono1 = '"+Telefono1+"', Telefono2 = '"+Telefono2+"', CorreoE = '"+ CorreoE +"', Direccion = '"+ Direccion + "', Estado = '"+Estado+"', IdDCH = '"+ Placa +"' WHERE CURP = '"+ CURP + "'";
		
		//console.log(req.session);
		//console.log(valores);
		connection.query(sql, async (error, results) => {
			//console.log(error)
			res.send("Registropacientes2");
			res.end();
		});
	
});

app.post('/registrarPaciente2', async (req, res) => {
	const CURP = req.body.curp;
	const ActividadFisica = req.body.actividadFisica;
	const Adicciones = req.body.adicciones;
	const Antecedentes = req.body.antecedentes;
	const Farmacos = req.body.farmacos;
	const GradoEstudios = req.body.gradoEstudios;
	const EstadoCivil = req.body.estadoCivil;
	const ExpRuido = req.body.expRuido;
	const ExpSolar = req.body.expSolar;
	const HorasSuenio = req.body.horasSuenio;
	const Padecimientos = req.body.padecimientos;
	const PersonasDependientes = req.body.personasDependientes;
	const Trabajo = req.body.trabajo;
	const VarHumedad = req.body.varHumedad;
	const VarTemperatura = req.body.varTemperatura;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	let IdPac;
	let sql = 'INSERT INTO InformePaciente(ExposicionSolar, VariacionesdeTemperatura, VariacionesdeHumedad, ExposicionRuido, IdInforme, ActividadFisica, Educacion, HorasDeSuenio, EstadoCivil, PersonasDependientes, ConsumoDeFarmacos, CURP) VALUES (?)'
	let valores = [
		ExpSolar,
		VarTemperatura,
		VarHumedad,
		ExpRuido,
		null,
		ActividadFisica,
		GradoEstudios,
		HorasSuenio,
		EstadoCivil,
		PersonasDependientes,
		Farmacos,
		CURP
	];
	connection.query(sql, [valores], async (error, results) => {
		IdPac = results.insertId;
		//INSERT INTO `InformePaciente_Adicciones`(`Adicciones`, `IdInforme`) VALUES ('[value-1]','[value-2]')
		sqlAdic = 'INSERT INTO InformePaciente_Adicciones(Adicciones,IdInforme) VALUES ?';
		sqlAnt = 'INSERT INTO InformePaciente_AntecedentesFam(AntecedentesFam,IdInforme) VALUES ?';
		sqlPad = 'INSERT INTO InformePaciente_Padecimientos(Padecimientos,IdInforme) VALUES ?';
		sqlTrab = 'INSERT INTO InformePaciente_Trabajo(Trabajo,IdInforme) VALUES ?';
		valAdic = [];
		valAnt = [];
		valPad = [];
		valTrab = [];
		if(Adicciones.length>1){
			for (const adic of Adicciones.split(",")) {
				valAdic.push([adic,IdPac])
			}
		}
		if(Antecedentes.length>1){
			for (const ant of Antecedentes.split(",")) {
				valAnt.push([ant,String(IdPac)])
			}
		}
		if(Padecimientos.length>1){
			for (const pad of Padecimientos.split(",")) {
				valPad.push([pad,String(IdPac)])
			}
		}
		if(Trabajo.length>1){
			for (const trab of Trabajo.split(",")) {
				valTrab.push([trab,String(IdPac)])
			}
		}
		connection.query(sqlAdic, [valAdic], function (error, results, fields) {
			connection.query(sqlAnt, [valAnt], function (error, results, fields) {
				connection.query(sqlPad, [valPad], function (error, results, fields) {
					connection.query(sqlTrab, [valTrab], function (error, results, fields) {
						res.send("/");
						res.end();
					})
				})
			})
		});
	});
});

//12 - Método para controlar que está auth en todas las páginas
app.get('/validar', (req, res) => {
	//console.log(req.session);
	var dirigir = req.query.ruta.toLowerCase();
	//console.log(dirigir);
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		if (dirigir == 'undefined')
			res.send('/');
		else
			res.send(dirigir);
	} else {
		res.send("/");
	}
	res.end();
});

app.get('/solicitarPacientes', (req, res) => {
	//console.log(req.session);
	//console.log(dirigir);
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		let sql = "SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Doctor INNER JOIN Atiende ON Doctor.CedulaProf=Atiende.CedulaProf INNER JOIN Paciente on Atiende.CURP=Paciente.CURP WHERE Doctor.CorreoE = ?";
		//console.log(sql)
		connection.query(sql, [req.session.name], async (error, results) => {
			res.send(results);
			res.end();
		});
	} else {
		res.send("/");
		res.end();
	}
});

//función para limpiar la caché luego del logout
app.use(function (req, res, next) {
	if (!req.user)
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	next();
});

//Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
		res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
		res.setHeader('Access-Control-Allow-Credentials', true);
		//res.setHeader('credentials', 'include');
		//res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		res.send('/');
		res.end();
	})
});

app.get('/buscarPacientes', (req, res) => {
	//console.log(req.session);
	//console.log(dirigir);
	var cadena = req.query.cad;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		req.session.cedula
		let sql = "SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Tiene INNER JOIN DocCheckerH ON Tiene.Clave=DocCheckerH.Clave INNER JOIN Paciente on DocCheckerH.IdDCH=Paciente.IdDCH WHERE Tiene.CedulaProf=" + req.session.cedula + " AND (Paciente.Nombre LIKE '%"+cadena+"%' OR Paciente.Apellidos LIKE '%"+cadena+"%');";
		//console.log(sql)
		//SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Tiene INNER JOIN DocCheckerH ON Tiene.Clave=DocCheckerH.Clave INNER JOIN Paciente on DocCheckerH.IdDCH=Paciente.IdDCH WHERE Paciente.Nombre LIKE '%R%';
		//SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Tiene INNER JOIN DocCheckerH ON Tiene.Clave=DocCheckerH.Clave INNER JOIN Paciente on DocCheckerH.IdDCH=Paciente.IdDCH WHERE Tiene.CedulaProf=18345 AND (Paciente.Nombre LIKE '%a%' OR Paciente.Apellidos LIKE '%a%');
		connection.query(sql, [req.session.cedula], async (error, results) => {
			//console.log(results)
			res.send(results);
			res.end();
		});
	} else {
		res.send("/");
		res.end();
	}
});


app.listen(8081, (req, res) => {
	console.log('SERVER RUNNING IN http://localhost:8081');
})

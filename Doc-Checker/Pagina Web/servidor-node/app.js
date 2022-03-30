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
				connection.query('SELECT * FROM Administrador WHERE CorreoE = ?', [user], async (error, results, fields) => {
					if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].Contrasenia))) {
						res.send("/");
					}else{
						req.session.loggedin = true;
						req.session.name = results[0].CorreoE;
						req.session.admin = true;
						//console.log(req.session);
						res.send("pacientes");
					}
					res.end();
				});
			} else {
				req.session.loggedin = true;
				req.session.name = results[0].CorreoE;
				req.session.cedula = results[0].CedulaProf;
				//console.log(req.session);
				res.send("pacientes");
				res.end();
			}
		});
	} else {
		res.send("/");
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
	connection.query(sql, [valores], async (error, results) => {
		res.send("/");
		res.end();
	});
});

app.post('/cambiarcontra', async (req, res) => {
	const user = req.session.name;
	const Contrasenia = req.body.contrasenia;
	const newContrasenia = req.body.newcontrasenia;
	const newContrasenia2 = req.body.newcontrasenia2;
	if(req.session.admin){
		if(newContrasenia == newContrasenia2){
			connection.query('SELECT * FROM administrador WHERE CorreoE = ?', [user], async (error, results, fields) => {
			if (results.length == 0 || !(await bcryptjs.compare(Contrasenia, results[0].Contrasenia))) {
				//console.log(results[0]);
				//Contrasenia incorrecta
				console.log("Contraseña incorrecta");
				res.send(false);
			}else{
				let ContraHaash = await bcryptjs.hash(newContrasenia, 8);

				const sql = 'UPDATE administrador SET Contrasenia = "'+ ContraHaash +'" WHERE CorreoE = "'+ user +'"';
				//console.log(sql);
				connection.query(sql, async (error, results) => {
					//console.log(error)
					res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
					res.setHeader('Access-Control-Allow-Credentials', true);
					res.send(true);
					//res.alert("Good");
					res.end();
				});
			}
			});
		}
	}else{
		if(newContrasenia == newContrasenia2){
			connection.query('SELECT * FROM Doctor WHERE CorreoE = ?', [user], async (error, results, fields) => {
			if (results.length == 0 || !(await bcryptjs.compare(Contrasenia, results[0].Contrasenia))) {
				//console.log(results[0]);
				//Contrasenia incorrecta
				//alert("Contraseña incorrecta");
				res.send(false);
			}else{
				let ContraHaash = await bcryptjs.hash(newContrasenia, 8);

				const sql = 'UPDATE Doctor SET Contrasenia = "'+ ContraHaash +'" WHERE CorreoE = "'+ user +'"';
				//console.log(sql);
				connection.query(sql, async (error, results) => {
					//console.log(error)
					res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
					res.setHeader('Access-Control-Allow-Credentials', true);
					res.send(true);
					//res.alert("Good");
					res.end();
				});
			}
			});
		}
	}
});

app.post('/agregar', async (req, res) => {
	const Id = req.body.id;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	if(req.session.cedula!=null){
		//console.log("Existe");
		const sql = 'INSERT INTO Atiende(CedulaProf,CURP) VALUES (?)';
		valores = [
			req.session.cedula,
			Id
		];
		//console.log(valores);
		connection.query(sql, [valores], async (error, results) => {
			//console.log(error)
			res.send("/");
			res.end();
		});
	}else if(req.session.admin){
		let sql = 'SELECT * FROM Administrador WHERE CorreoE = "'+ req.session.name +'"';
		connection.query(sql, async (error, results) => {
			console.log(error)
			console.log(results);
			sql = 'UPDATE Doctor SET IdAdmin = "'+ results[0].IdAdmin +'" WHERE CedulaProf = "'+ Id +'"';
			connection.query(sql, async (error, results) => {
				console.log(error)
				console.log(results);
				res.send("aceptardoc");
				res.end();
			});
		});
	}else{
		//console.log("No existe");
		res.send("/buscador");
		res.end();
	}
});

app.post('/rechazarardoc', async (req, res) => {
	const Id = req.body.id;
	console.log(req.body.id);
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true)
	if(req.session.admin){
		let sql = 'DELETE FROM Doctor WHERE CedulaProf = "'+ Id +'"';
		connection.query(sql, async (error, results) => {
			console.log(error)
			console.log(results);
				res.send("rechazardocs");
				res.end();
		});
	}else{
		console.log("No existe");
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
	let sql = "SELECT * FROM InformePaciente WHERE CURP = '"+CURP+"'"
	connection.query(sql, async (error, results) => {
		let existeRegistro = results.length
		if(existeRegistro>0){
			IdPac = results[0].IdInforme;
			sql = "UPDATE InformePaciente SET ExposicionSolar = '" + ExpSolar  + "', VariacionesdeTemperatura = '"+ VarTemperatura  +"', VariacionesdeHumedad = '" + VarHumedad  + "', ExposicionRuido = '" + ExpRuido  + "', ActividadFisica = '" + ActividadFisica  + "', Educacion = '" + GradoEstudios  + "', HorasDeSuenio = '" + HorasSuenio  + "', EstadoCivil = '" + EstadoCivil  + "', PersonasDependientes = '" + PersonasDependientes  + "', ConsumoDeFarmacos = '" + Farmacos  + "' WHERE IdInforme ='" + IdPac + "'"
		}else
			sql = "INSERT INTO InformePaciente(ExposicionSolar, VariacionesdeTemperatura, VariacionesdeHumedad, ExposicionRuido, IdInforme, ActividadFisica, Educacion, HorasDeSuenio, EstadoCivil, PersonasDependientes, ConsumoDeFarmacos, CURP) VALUES ('"+ExpSolar+"','"+VarTemperatura+"','"+VarHumedad+"','"+ExpRuido+"',null,'"+ActividadFisica+"','"+GradoEstudios+"','"+HorasSuenio+"','"+EstadoCivil+"','"+PersonasDependientes+"','"+Farmacos+"','"+CURP+"')"
		connection.query(sql, async (error, results) => {
			//INSERT INTO `InformePaciente_Adicciones`(`Adicciones`, `IdInforme`) VALUES ('[value-1]','[value-2]')
			if(existeRegistro<=0)
				IdPac = results.insertId;
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
			borrar = "DELETE FROM InformePaciente_Adicciones WHERE IdInforme="+IdPac
			connection.query(borrar, function (error, results, fields) {
				borrar = "DELETE FROM InformePaciente_AntecedentesFam WHERE IdInforme='"+IdPac+"'"
				connection.query(borrar, function (error, results, fields) {
					borrar = "DELETE FROM InformePaciente_Padecimientos WHERE IdInforme="+IdPac
					connection.query(borrar, function (error, results, fields) {
						borrar = "DELETE FROM InformePaciente_Trabajo WHERE IdInforme="+IdPac
						connection.query(borrar, function (error, results, fields) {
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
				});
			});
		});
	});
});

app.post('/existeRegistro', async (req, res) => {
	const CURP = req.body.curp;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	let sql = "SELECT * FROM InformePaciente WHERE CURP = '"+CURP+"'"
	connection.query(sql, async (error, results) => {
		if(results.length>0)
			res.send(true);
		else
			res.send(false);
		res.end();
	});
	
});

app.post('/obtener', async (req, res) => {
	const valor = req.body.valor;
	const CURP = req.body.curp;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true); 
	let sql = "SELECT "+valor+" FROM InformePaciente_"+valor+" INNER JOIN InformePaciente ON InformePaciente.IdInforme=InformePaciente_"+valor+".IdInforme WHERE InformePaciente.CURP='"+CURP+"'"
	//SELECT Adicciones FROM InformePaciente_Adicciones INNER JOIN InformePaciente ON InformePaciente.IdInforme=InformePaciente_Adicciones.IdInforme WHERE InformePaciente.CURP=ANDFKHQEROHQWOI"
	connection.query(sql, async (error, results) => {
		ret = []
		for(const result in results){
			ret.push(results[result][valor])
		}
		res.send(ret);
		res.end();
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
			res.send([req.session.admin,'/']);
		else
			res.send([req.session.admin,dirigir]);
	} else
		res.send([req.session.admin,'/']);
	res.end();
});

app.get('/solicitarPacientes', (req, res) => {
	//console.log(req.session);
	//console.log(dirigir);
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		if(req.session.admin){
			let sql = "SELECT DISTINCTROW Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Administrador INNER JOIN Doctor ON Administrador.IdAdmin=Doctor.IdAdmin INNER JOIN Atiende on Atiende.CedulaProf=Doctor.CedulaProf INNER JOIN Paciente ON Atiende.CURP=Paciente.CURP WHERE Administrador.CorreoE = ?";
			//console.log(sql)
			connection.query(sql, [req.session.name], async (error, results) => {
				res.send(results);
				res.end();
			});
		}else{
			let sql = "SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Doctor INNER JOIN Atiende ON Doctor.CedulaProf=Atiende.CedulaProf INNER JOIN Paciente on Atiende.CURP=Paciente.CURP WHERE Doctor.CorreoE = ?";
			//console.log(sql)
			connection.query(sql, [req.session.name], async (error, results) => {
				res.send(results);
				res.end();
			});
		}
	} else {
		res.send("/");
		res.end();
	}
});

app.get('/obtenerPlacas', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	const numMax = 3;
	if(req.session.cedula!=null && req.session.loggedin){
		//console.log("Existe");
		//SELECT DISTINCTROW count(*) FROM Pacientes where IdDCH = ?
		let sql = "SELECT DISTINCTROW DocCheckerH.IdDCH FROM DocCheckerH INNER JOIN Tiene ON DocCheckerH.Clave=Tiene.Clave WHERE Tiene.CedulaProf = ?";
		valores = [req.session.cedula]
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

app.get('/obtenerClaves', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if(req.session.cedula!=null && req.session.loggedin){
		//console.log("Existe");
		//SELECT DISTINCTROW count(*) FROM Pacientes where IdDCH = ?
		let sql = "SELECT Clave FROM Unidad";
		//valores = [req.session.cedula]
		connection.query(sql, async (error, results) => {
			console.log(results)
			res.send(results);
			res.end();
		});
	}else{
		//console.log("No existe");
		res.send("/");
		res.end();
	}
});

app.get('/doctoresSolicitantes', (req, res) => {
	//console.log(req.session);
	//console.log(dirigir);
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);
	if (req.session.loggedin) {
		if(req.session.admin){
			let sql = "SELECT DISTINCTROW Doctor.Nombre, Doctor.Apellidos, Doctor.CedulaProf FROM Doctor WHERE Doctor.IdAdmin = 1";
			//console.log(sql)
			connection.query(sql, async (error, results) => {
				res.send(results);
				res.end();
			});
		}
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

app.post('/registrarplaca', async (req, res) => {
	const IP = req.body.ip;
	const Clave = req.body.clave;
	res.setHeader('Access-Control-Allow-Origin', "http://"+ip+":"+port);
	res.setHeader('Access-Control-Allow-Credentials', true);

	const sqls = 'SELECT IdAdmin FROM Administrador WHERE CorreoE = "' + req.session.name + '"';
	connection.query(sqls, async (error, results) => {
		const id = results[0].IdAdmin;
		//res.end();
		const sql = 'INSERT INTO DocCheckerH(IP, Clave, IdAdmin) VALUES (?)';
	const valores = [
		IP,
		Clave,
		id];
	connection.query(sql, [valores], async (error, results) => {
		res.send("/pacientes");
		res.end();
	});
	});

	/*const sql = 'INSERT INTO DocCheckerH(IP, Clave, IdAdmin) VALUES (?)';
	const valores = [
		IP,
		Clave,
		results];
	connection.query(sql, [valores], async (error, results) => {
		res.send("/pacientes");
		res.end();
	});*/
});


app.listen(8081, (req, res) => {
	console.log('SERVER RUNNING IN http://localhost:8081');
})

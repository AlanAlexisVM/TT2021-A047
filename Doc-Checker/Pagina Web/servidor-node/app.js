var fork = require("child_process").fork;

var sp1 = fork("solicitarSignosVitales");

// 1 - Invocamos a Express
const express = require("express");
const app = express();

//2 - Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//3- Invocamos a dotenv
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

//6 -Invocamos a bcrypt
const bcryptjs = require("bcryptjs");

//7- variables de session
const session = require("express-session");
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// 8 - Invocamos a la conexion de la DB
const connection = require("./db/db");
sp1.on("message", (msj) => {
  if (msj.msj == "Hijo cargado") {
    console.log("message from child", msj);
    connection.query(
      "SELECT paciente.CURP, doccheckerh.IP FROM paciente INNER JOIN doccheckerh ON doccheckerh.IdDCH=paciente.IdDCH",
      async (error, results) => {
        sp1.send({ placas: results });
      }
    );
  } else {
    const lect = msj.msj.split('"');
    //Posicion 1
    var temp = lect[1];
    //Posicion 3
    var frec = lect[3];
    //Posicion 5
    var ox = lect[5];

    var ip = lect[6].substring(4, lect[6].length);
    var sql = "SELECT IdSi FROM doccheckerh INNER JOIN paciente ON doccheckerh.IdDCH=paciente.IdDCH WHERE doccheckerh.IP=?";
    connection.query(sql, ip, async (error, results) => {
      var idsi = results[0].IdSi;
      sql = "INSERT INTO signosvitales_frecuenciacardiaca(FrecuenciaCardiaca, IdSi) VALUES (?)";
      const valores = [
        frec,
        idsi
      ];
      connection.query(sql, [valores], async (error, results) => {
        sql = "INSERT INTO signosvitales_oxigenación(Oxigenación, IdSi) VALUES (?)";
        const valores = [
          ox,
          idsi
        ];
        connection.query(sql, [valores], async (error, results) => {
          sql = "INSERT INTO signosvitales_temperatura(Temperatura, IdSi) VALUES (?)";
          const valores = [
            temp,
            idsi
          ];
          connection.query(sql, [valores], async (error, results) => {
          });
        });
      });
    });
  }
});

app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.get("origin") != undefined)
    res.setHeader("Access-Control-Allow-Origin", req.get("origin"));
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
  res.end();
});

//11 - Metodo para la autenticacion
app.post("/auth", async (req, res) => {
  const user = req.body.user;
  const pass = req.body.pass;
  //console.log(req.body);
  if (user && pass) {
    connection.query(
      "SELECT * FROM Doctor WHERE IdAdmin<>1 AND CorreoE = ?",
      [user],
      async (error, results, fields) => {
        if (
          results.length == 0 ||
          !(await bcryptjs.compare(pass, results[0].Contrasenia))
        ) {
          connection.query(
            "SELECT * FROM Administrador WHERE CorreoE = ?",
            [user],
            async (error, results, fields) => {
              if (
                results.length == 0 ||
                !(await bcryptjs.compare(pass, results[0].Contrasenia))
              ) {
                res.send("/");
              } else {
                req.session.loggedin = true;
                req.session.name = results[0].CorreoE;
                req.session.admin = true;
                res.send("gestion");
              }
              res.end();
            }
          );
        } else {
          req.session.loggedin = true;
          req.session.name = results[0].CorreoE;
          req.session.cedula = results[0].CedulaProf;
          res.send("pacientes");
          res.end();
        }
      }
    );
  } else {
    res.send("/");
    res.end();
  }
});

/* A POST request that is receiving a JSON object with the IP address of the device. */
app.post("/monitorplaca", async (req, res) => {
  const ip = req.body.ip;
  res.send("Placa confirmada");
  res.end;
  var fork = require("child_process").fork;
  connection.query(
    "SELECT paciente.CURP, doccheckerh.IP FROM paciente INNER JOIN doccheckerh ON doccheckerh.IdDCH=paciente.IdDCH WHERE doccheckerh.IP=?",
    ip,
    async (error, results) => {
      var sp = fork("signosVitales");
      sp.send({ placa: results[0] });
      sp.on("message", (msj) => {
        const lect = msj.msj.split('"');
        //Posicion 1
        var temp = lect[1];
        //Posicion 3
        var frec = lect[3];
        //Posicion 5
        var ox = lect[5];

        var ip = lect[6].substring(4, lect[6].length);
        const sql = "SELECT IdSi FROM doccheckerh INNER JOIN paciente ON doccheckerh.IdDCH=paciente.IdDCH WHERE doccheckerh.IP=?";
        connection.query(sql, ip, async (error, results) => {
          var idsi = results
          sql = "INSERT INTO signosvitales_frecuenciacardiaca(FrecuenciaCardiaca, IdSi) VALUES (?)";
          const valores = [
            frec,
            idsi
          ];
          connection.query(sql, [valores], async (error, results) => {
            sql = "INSERT INTO signosvitales_oxigenación(Oxigenación, IdSi) VALUES (?)";
            const valores = [
              ox,
              idsi
            ];
            connection.query(sql, [valores], async (error, results) => {
              sql = "INSERT INTO signosvitales_temperatura(Temperatura, IdSi) VALUES (?)";
              const valores = [
                temp,
                idsi
              ];
              connection.query(sql, [valores], async (error, results) => {
              });
            });
          });
        });
      });
    }
  );
});

app.post("/problemaPaciente", async (req, res) => {
  const ip = req.body.ip;
  console.log(ip);
  res.send("Problema informado");
  res.end;
});

/* Taking the data from the form and inserting it into the database. */
app.post("/registrar", async (req, res) => {
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

  const sql =
    "INSERT INTO Doctor(CedulaProf, Nombre, Apellidos, CorreoE, Contrasenia, Sexo, FechaNac, Especialidad, Direccion, Telefono1, Telefono2, IdAdmin) VALUES (?)";
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
    "1",
  ];
  connection.query(sql, [valores], async (error, results) => {
    res.send("/");
    res.end();
  });
});

/* Changing the password of the user. */
app.post("/cambiarcontra", async (req, res) => {
  const user = req.session.name;
  const Contrasenia = req.body.contrasenia;
  const newContrasenia = req.body.newcontrasenia;
  const newContrasenia2 = req.body.newcontrasenia2;
  if (req.session.admin) {
    if (newContrasenia == newContrasenia2) {
      connection.query(
        "SELECT * FROM administrador WHERE CorreoE = ?",
        [user],
        async (error, results, fields) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(Contrasenia, results[0].Contrasenia))
          ) {
            console.log("Contraseña incorrecta");
            res.send(false);
          } else {
            let ContraHaash = await bcryptjs.hash(newContrasenia, 8);

            const sql =
              'UPDATE administrador SET Contrasenia = "' +
              ContraHaash +
              '" WHERE CorreoE = "' +
              user +
              '"';
            connection.query(sql, async (error, results) => {
              res.send(true);
              res.end();
            });
          }
        }
      );
    }
  } else {
    if (newContrasenia == newContrasenia2) {
      connection.query(
        "SELECT * FROM Doctor WHERE CorreoE = ?",
        [user],
        async (error, results, fields) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(Contrasenia, results[0].Contrasenia))
          ) {
            res.send(false);
          } else {
            let ContraHaash = await bcryptjs.hash(newContrasenia, 8);
            const sql =
              'UPDATE Doctor SET Contrasenia = "' +
              ContraHaash +
              '" WHERE CorreoE = "' +
              user +
              '"';
            connection.query(sql, async (error, results) => {
              res.send(true);
              res.end();
            });
          }
        }
      );
    }
  }
});

/* Inserting a new row into the Atiende table. */
app.post("/agregar", async (req, res) => {
  const Id = req.body.id;

  if (req.session.cedula != null) {
    //console.log("Existe");
    const sql = "INSERT INTO Atiende(CedulaProf,CURP) VALUES (?)";
    valores = [req.session.cedula, Id];
    connection.query(sql, [valores], async (error, results) => {
      res.send("/");
      res.end();
    });
  } else if (req.session.admin) {
    let sql =
      'SELECT * FROM Administrador WHERE CorreoE = "' + req.session.name + '"';
    connection.query(sql, async (error, results) => {
      console.log(error);
      console.log(results);
      sql =
        'UPDATE Doctor SET IdAdmin = "' +
        results[0].IdAdmin +
        '" WHERE CedulaProf = "' +
        Id +
        '"';
      connection.query(sql, async (error, results) => {
        console.log(error);
        console.log(results);
        res.send("aceptardoc");
        res.end();
      });
    });
  } else {
    res.send("/buscador");
    res.end();
  }
});

/* Deleting a row from the database. */
app.post("/rechazarardoc", async (req, res) => {
  const Id = req.body.id;
  console.log(req.body.id);
  if (req.session.admin) {
    let sql = 'DELETE FROM Doctor WHERE CedulaProf = "' + Id + '"';
    connection.query(sql, async (error, results) => {
      console.log(error);
      console.log(results);
      res.send("rechazardocs");
      res.end();
    });
  } else {
    console.log("No existe");
    res.send("/buscador");
    res.end();
  }
});

/* A POST request that is being sent to the server. */
app.post("/obtenerPaciente", async (req, res) => {
  const CURP = req.body.curp;

  if (req.session.cedula != null && req.session.loggedin) {
    const sql =
      "SELECT Nombre, Apellidos, CURP, FechaNac, Sexo, Telefono1, Telefono2, CorreoE, Direccion, Estado, IdDCH, IdSi FROM Paciente WHERE Paciente.CURP = (?)";
    valores = [CURP];
    connection.query(sql, [valores], async (error, results) => {
      res.send(results);
      res.end();
    });
  } else {
    res.send("/");
    res.end();
  }
});

/* A POST request that is being sent to the server. */
app.post("/obtenerPaciente2", async (req, res) => {
  const CURP = req.body.curp;

  if (req.session.cedula != null && req.session.loggedin) {
    const sql1 =
      "SELECT Nombre, Apellidos, CURP, FechaNac, Sexo, Telefono1, Telefono2, CorreoE, Direccion, Estado, IdDCH, IdSi FROM Paciente WHERE Paciente.CURP = (?)";
    const sql =
      "SELECT ExposicionSolar, VariacionesdeTemperatura, VariacionesdeHumedad, ExposicionRuido, IdInforme, ActividadFisica, Educacion, HorasDeSuenio, EstadoCivil, PersonasDependientes, ConsumoDeFarmacos FROM InformePaciente WHERE InformePaciente.CURP = (?)";
    valores = [CURP];
    connection.query(sql, [valores], async (error, results) => {
      res.send(results);
      res.end();
    });
  } else {
    res.send("/");
    res.end();
  }
});

/* Inserting data into the database. */
app.post("/registrarPaciente", async (req, res) => {
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
  connection.query(
    "INSERT INTO SignosVitales(IdSi) VALUES (NULL)",
    async (error, results) => {
      IdSi = results.insertId;
      let sql =
        "INSERT INTO Paciente(Nombre,Apellidos,CURP,FechaNac,Sexo,Telefono1,Telefono2,CorreoE,Direccion,Estado,IdDCH,IdSi) VALUES (?)";
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
        IdSi,
      ];
      connection.query(sql, [valores], async (error, results) => {
        sql = "INSERT INTO Atiende(CedulaProf,CURP) VALUES (?)";
        valores = [req.session.cedula, CURP];
        connection.query(sql, [valores], async (error, results) => {
          res.send("Registropacientes2");
          res.end();
        });
      });
    }
  );
});

app.post("/actualizarPaciente", async (req, res) => {
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
  let sql =
    "UPDATE Paciente SET Nombre = '" +
    Nombre +
    "', Apellidos = '" +
    Apellidos +
    "', FechaNac = '" +
    FechaNacimiento +
    "', Sexo = '" +
    Sexo +
    "', Telefono1 = '" +
    Telefono1 +
    "', Telefono2 = '" +
    Telefono2 +
    "', CorreoE = '" +
    CorreoE +
    "', Direccion = '" +
    Direccion +
    "', Estado = '" +
    Estado +
    "', IdDCH = '" +
    Placa +
    "' WHERE CURP = '" +
    CURP +
    "'";
  connection.query(sql, async (error, results) => {
    res.send("Registropacientes2");
    res.end();
  });
});

app.post("/registrarPaciente2", async (req, res) => {
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
  let IdPac;
  let sql = "SELECT * FROM InformePaciente WHERE CURP = '" + CURP + "'";
  connection.query(sql, async (error, results) => {
    let existeRegistro = results.length;
    if (existeRegistro > 0) {
      IdPac = results[0].IdInforme;
      sql =
        "UPDATE InformePaciente SET ExposicionSolar = '" +
        ExpSolar +
        "', VariacionesdeTemperatura = '" +
        VarTemperatura +
        "', VariacionesdeHumedad = '" +
        VarHumedad +
        "', ExposicionRuido = '" +
        ExpRuido +
        "', ActividadFisica = '" +
        ActividadFisica +
        "', Educacion = '" +
        GradoEstudios +
        "', HorasDeSuenio = '" +
        HorasSuenio +
        "', EstadoCivil = '" +
        EstadoCivil +
        "', PersonasDependientes = '" +
        PersonasDependientes +
        "', ConsumoDeFarmacos = '" +
        Farmacos +
        "' WHERE IdInforme ='" +
        IdPac +
        "'";
    } else
      sql =
        "INSERT INTO InformePaciente(ExposicionSolar, VariacionesdeTemperatura, VariacionesdeHumedad, ExposicionRuido, IdInforme, ActividadFisica, Educacion, HorasDeSuenio, EstadoCivil, PersonasDependientes, ConsumoDeFarmacos, CURP) VALUES ('" +
        ExpSolar +
        "','" +
        VarTemperatura +
        "','" +
        VarHumedad +
        "','" +
        ExpRuido +
        "',null,'" +
        ActividadFisica +
        "','" +
        GradoEstudios +
        "','" +
        HorasSuenio +
        "','" +
        EstadoCivil +
        "','" +
        PersonasDependientes +
        "','" +
        Farmacos +
        "','" +
        CURP +
        "')";
    connection.query(sql, async (error, results) => {
      if (existeRegistro <= 0) IdPac = results.insertId;
      sqlAdic =
        "INSERT INTO InformePaciente_Adicciones(Adicciones,IdInforme) VALUES ?";
      sqlAnt =
        "INSERT INTO InformePaciente_AntecedentesFam(AntecedentesFam,IdInforme) VALUES ?";
      sqlPad =
        "INSERT INTO InformePaciente_Padecimientos(Padecimientos,IdInforme) VALUES ?";
      sqlTrab =
        "INSERT INTO InformePaciente_Trabajo(Trabajo,IdInforme) VALUES ?";

      valAdic = [];
      valAnt = [];
      valPad = [];
      valTrab = [];
      if (Adicciones.length > 1) {
        for (const adic of Adicciones.split(",")) {
          valAdic.push([adic, IdPac]);
        }
      }
      if (Antecedentes.length > 1) {
        for (const ant of Antecedentes.split(",")) {
          valAnt.push([ant, String(IdPac)]);
        }
      }
      if (Padecimientos.length > 1) {
        for (const pad of Padecimientos.split(",")) {
          valPad.push([pad, String(IdPac)]);
        }
      }
      if (Trabajo.length > 1) {
        for (const trab of Trabajo.split(",")) {
          valTrab.push([trab, String(IdPac)]);
        }
      }
      borrar =
        "DELETE FROM InformePaciente_Adicciones WHERE IdInforme=" + IdPac;
      connection.query(borrar, function (error, results, fields) {
        borrar =
          "DELETE FROM InformePaciente_AntecedentesFam WHERE IdInforme='" +
          IdPac +
          "'";
        connection.query(borrar, function (error, results, fields) {
          borrar =
            "DELETE FROM InformePaciente_Padecimientos WHERE IdInforme=" +
            IdPac;
          connection.query(borrar, function (error, results, fields) {
            borrar =
              "DELETE FROM InformePaciente_Trabajo WHERE IdInforme=" + IdPac;
            connection.query(borrar, function (error, results, fields) {
              connection.query(
                sqlAdic,
                [valAdic],
                function (error, results, fields) {
                  connection.query(
                    sqlAnt,
                    [valAnt],
                    function (error, results, fields) {
                      connection.query(
                        sqlPad,
                        [valPad],
                        function (error, results, fields) {
                          connection.query(
                            sqlTrab,
                            [valTrab],
                            function (error, results, fields) {
                              res.send("/");
                              res.end();
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            });
          });
        });
      });
    });
  });
});

app.post("/existeRegistro", async (req, res) => {
  const CURP = req.body.curp;
  let sql = "SELECT * FROM InformePaciente WHERE CURP = '" + CURP + "'";
  connection.query(sql, async (error, results) => {
    if (results.length > 0) res.send(true);
    else res.send(false);
    res.end();
  });
});

app.post("/obtener", async (req, res) => {
  const valor = req.body.valor;
  const CURP = req.body.curp;
  let sql =
    "SELECT " +
    valor +
    " FROM InformePaciente_" +
    valor +
    " INNER JOIN InformePaciente ON InformePaciente.IdInforme=InformePaciente_" +
    valor +
    ".IdInforme WHERE InformePaciente.CURP='" +
    CURP +
    "'";
  connection.query(sql, async (error, results) => {
    ret = [];
    for (const result in results) {
      ret.push(results[result][valor]);
    }
    res.send(ret);
    res.end();
  });
});

//12 - Método para controlar que está auth en todas las páginas
app.get("/validar", (req, res) => {
  const dirigir = req.query.ruta.toLowerCase();
  if (req.session.loggedin) {
    if (dirigir == "undefined") res.send([req.session.admin, "/"]);
    else res.send([req.session.admin, dirigir]);
  } else res.send([req.session.admin, "/"]);
  res.end();
});

app.get("/solicitarPacientes", (req, res) => {
  if (req.session.loggedin) {
    if (req.session.admin) {
      let sql =
        "SELECT DISTINCTROW Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Administrador INNER JOIN Doctor ON Administrador.IdAdmin=Doctor.IdAdmin INNER JOIN Atiende on Atiende.CedulaProf=Doctor.CedulaProf INNER JOIN Paciente ON Atiende.CURP=Paciente.CURP WHERE Administrador.CorreoE = ?";
      connection.query(sql, [req.session.name], async (error, results) => {
        res.send(results);
        res.end();
      });
    } else {
      let sql =
        "SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Doctor INNER JOIN Atiende ON Doctor.CedulaProf=Atiende.CedulaProf INNER JOIN Paciente on Atiende.CURP=Paciente.CURP WHERE Doctor.CorreoE = ?";
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

app.get("/obtenerPlacas", async (req, res) => {
  const numMax = 3;
  if (req.session.cedula != null && req.session.loggedin) {
    let sql =
      "SELECT DISTINCTROW DocCheckerH.IdDCH FROM DocCheckerH INNER JOIN Tiene ON DocCheckerH.Clave=Tiene.Clave WHERE Tiene.CedulaProf = ?";
    valores = [req.session.cedula];
    connection.query(sql, [valores], async (error, results) => {
      res.send(results);
      res.end();
    });
  } else {
    res.send("/");
    res.end();
  }
});

app.get("/obtenerClaves", async (req, res) => {
  let sql = "SELECT Clave FROM Unidad";
  connection.query(sql, async (error, results) => {
    res.send(results);
    res.end();
  });
});

app.get("/doctoresSolicitantes", (req, res) => {
  if (req.session.loggedin) {
    if (req.session.admin) {
      let sql =
        "SELECT DISTINCTROW Doctor.Nombre, Doctor.Apellidos, Doctor.CedulaProf FROM Doctor WHERE Doctor.IdAdmin = 1";
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
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

//Logout
//Destruye la sesión.
app.get("/logout", function (req, res) {
  req.session.destroy(() => {
    res.send("/");
    res.end();
  });
});

app.get("/buscarPacientes", (req, res) => {
  const cadena = req.query.cad;
  if (req.session.loggedin) {
    req.session.cedula;
    let sql =
      "SELECT Paciente.Nombre, Paciente.Apellidos, Paciente.CURP FROM Tiene INNER JOIN DocCheckerH ON Tiene.Clave=DocCheckerH.Clave INNER JOIN Paciente on DocCheckerH.IdDCH=Paciente.IdDCH WHERE Tiene.CedulaProf=" +
      req.session.cedula +
      " AND (Paciente.Nombre LIKE '%" +
      cadena +
      "%' OR Paciente.Apellidos LIKE '%" +
      cadena +
      "%');";
    connection.query(sql, [req.session.cedula], async (error, results) => {
      res.send(results);
      res.end();
    });
  } else {
    res.send("/");
    res.end();
  }
});

app.get("/buscarDoctoresAdmin", (req, res) => {
  const cadena = req.query.cad;
  req.session.cedula;
  let sql;
  sql = "SELECT Nombre, Apellidos, CedulaProf FROM Doctor";
  if (cadena != "*")
    sql =
      sql +
      " WHERE (Doctor.Nombre LIKE '%" +
      cadena +
      "%' OR Doctor.Apellidos LIKE '%" +
      cadena +
      "%')";
  connection.query(sql, async (error, results) => {
    res.send(results);
    res.end();
  });
});

app.get("/buscarPlacasAdmin", (req, res) => {
  const cadena = req.query.cad;
  req.session.cedula;
  let sql = "SELECT IdDCH, Clave FROM doccheckerh";
  if (cadena != "*")
    sql = sql + " WHERE doccheckerh.IdDCH LIKE '%" + cadena + "%'";
  connection.query(sql, async (error, results) => {
    res.send(results);
    res.end();
  });
});

app.get("/buscarPacientesAdmin", (req, res) => {
  const cadena = req.query.cad;
  req.session.cedula;
  let sql = "SELECT Curp, Nombre, Apellidos FROM Paciente";
  if (cadena != "*")
    sql =
      sql +
      " WHERE (Paciente.Nombre LIKE '%" +
      cadena +
      "%' OR Paciente.Apellidos LIKE '%" +
      cadena +
      "%')";
  connection.query(sql, async (error, results) => {
    res.send(results);
    res.end();
  });
});

app.post("/registrarplaca", async (req, res) => {
  const IP = req.body.ip;
  const Clave = req.body.clave;

  const sqls =
    'SELECT IdAdmin FROM Administrador WHERE CorreoE = "' +
    req.session.name +
    '"';
  connection.query(sqls, async (error, results) => {
    const id = results[0].IdAdmin;
    //res.end();
    const sql = "INSERT INTO DocCheckerH(IP, Clave, IdAdmin) VALUES (?)";
    const valores = [IP, Clave, id];
    connection.query(sql, [valores], async (error, results) => {
      res.send("/gestion");
      res.end();
    });
  });
});

app.post("/placa", async (req, res) => {
  const CURP = req.body.curp;
  const sql =
    'SELECT doccheckerh.IP FROM paciente INNER JOIN doccheckerh ON paciente.IdDCH=doccheckerh.IdDCH WHERE  paciente.CURP = "' +
    CURP +
    '"';
  connection.query(sql, async (error, results) => {
    res.send(results[0].IP);
    res.end();
  });
});

app.post("/eliminar", async (req, res) => {
  const id = req.body.id;
  let sql = 'DELETE FROM paciente WHERE paciente.CURP = "' + id + '"';
  let ret = false;
  connection.query(sql, async (error, results) => {
    sql = 'DELETE FROM doctor WHERE  doctor.CedulaProf = "' + id + '"';
    if (results != undefined && results.affectedRows >= 1) ret = true;
    connection.query(sql, async (error, results) => {
      sql = "DELETE FROM doccheckerh WHERE  doccheckerh.IdDCH = " + id;
      if (results != undefined && results.affectedRows >= 1) ret = true;
      connection.query(sql, async (error, results) => {
        if (results != undefined && results.affectedRows >= 1) ret = true;
        res.send(ret);
        res.end();
      });
    });
  });
});

app.use(express.static("pdfs"));

app.use("*", (req, res) => {
  return res.status(404).json({ error: "No se encontro" });
});

app.listen(8081, (req, res) => {
  console.log("SERVER RUNNING IN http://localhost:8081");
});
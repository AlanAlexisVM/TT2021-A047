ip = "";
process.on("message", (msj) => {
  //console.log(msj.placa)
  //console.log(msj.placa.IP)
  ip = msj.placa.IP;
  const http = require("request");
  const options = {
    url: "http://" + msj.placa.IP,
    form: {
      seg: "30",
    },
  };
  pedirSignos(http, options);
});

function pedirSignos(http, options) {
  http
    .post(options, (err, res, body) => {
      if (body == undefined) process.exit(1);
      else if (body.length > 0) {
        console.log(body);
        //console.log("conectado")
        process.send({ msj: body + ip });
        pedirSignos(http, options);
      } else process.exit(1);
    })
    .on("error", (err) => {
      //console.log("Error: " + err.message);
      process.exit(1);
    });
};
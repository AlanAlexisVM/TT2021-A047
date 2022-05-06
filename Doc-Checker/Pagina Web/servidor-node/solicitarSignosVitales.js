var fork = require("child_process").fork;

process.send({ msj: "Hijo cargado" });

process.on("message", (msj) => {
  //console.log(msj)
  for (const placa in msj.placas) {
    var sp1 = fork("signosVitales");
    sp1.send({ placa: msj.placas[placa] });
    sp1.on("message", (msj) => {
      process.send({ msj: msj.msj });
    });
  }
});
var fork = require("child_process").fork;

process.send({msj: "Hijo cargado"})

process.on('message', msj => {
    for(const placa in msj.placas){
        fork("signosVitales").send({placa:msj.placas[placa]});
    }
});
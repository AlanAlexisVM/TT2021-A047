process.on('message', msj => {
    console.log(msj.placa)
    console.log(msj.placa.IP)
    const http = require('http');
    http.get('http://'+msj.placa.IP, (resp) => {
        console.log(resp)
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        process.exit(1)
    });
});
const express = require('express');

const PORT = 3000;

const app = express();

app.get('/',(req, res) => {
    res.send(`Conectados al puerto ${PORT}`);
});

app.get('/arqsoft/bbox:202202.1',(req, res) => {
    res.send(`Conectados al puerto ${PORT}`);
})

app.listen(PORT,() => {console.log("Escuchando en el puerto",PORT)});
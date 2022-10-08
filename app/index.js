import express from 'express';
import axios from 'axios';

const PORT = 3000;
const TIMEOUT = 5*1000;
const app = express();
const end_point = 'http://bbox:';
const port_async = '9091';
const port_sync = '9090';

app.get('/',(req, res) => {
    res.send("Ping \n");
});

app.get('/heavy',async (req, res) => {
    for(let t = new Date();new Date() - t < TIMEOUT;);
    res.status(200).send('Heavy Hello World \n');
});

app.get('/async',async (req, res) => {
    axios.get(`${end_point}${port_async}`).then( response => {
        res.status(200).send(`Response Async Data: ${response.data} \n`);
    });
});

app.get('/sync',async (req, res) => {
    axios.get(`${end_point}${port_sync}`).then( response => {
        res.status(200).send(`Response sync Data: ${response.data} \n`);
    });
});

app.listen(PORT,() => {console.log(`Conectados al puerto ${PORT} \n`)});
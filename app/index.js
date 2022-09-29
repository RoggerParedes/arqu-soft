import express from 'express';
import axios from 'axios';

const PORT = 3000;
const TIMEOUT = 5*1000;
const app = express();

app.get('/',(req, res) => {
    res.send("Ping");
});

app.get('/bbox_async',async (req, res) => {
    axios.get('http://bbox:9090/').then( response => {
        res.status(200).send(`${response.data} \n`);
    }).catch( error => {
        console.log(`ERROR: ${error}`);
    });
})

app.get('/bbox_sync',async (req, res) => {
    axios.get('http://bbox:9091/').then( response => {
        res.status(200).send(`${response.data} \n`);
    }).catch( error => {
        console.log(`ERROR: ${error}`);
    });
})

app.get('/heavy',async (req, res) => {
    for(let t = new Date();new Date() - t < TIMEOUT;);
    res.status(200).send('Heavy Hello World \n')
})

app.listen(PORT,() => {console.log(`Conectados adl puerto ${PORT} \n`)});
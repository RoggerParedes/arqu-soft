import express from 'express';
import axios from 'axios';

const PORT = 3000;
const TIMEOUT = 5*1000;
const app = express();

app.get('/',(req, res) => {
    res.send("Ping");
});

app.get('/heavy',async (req, res) => {
    for(let t = new Date();new Date() - t < TIMEOUT;);
    res.status(200).send('Heavy Hello World \n')
})

app.listen(PORT,() => {console.log(`Conectados adl puerto ${PORT} \n`)});
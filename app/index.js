import express from 'express';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';
import lynx from 'lynx';

const PORT = 3000;
const TIMEOUT = 5*1000;
const app = express();
const end_point = 'http://bbox:';
const port_async = '9090';
const port_sync = '9091';
const uuid_ = uuidv4();
var opt = {};
opt.prefix = 'MetrixNodeApp';
var metrics = new lynx('arqu-soft-graphite-1',8125,opt);

app.get('/',(req, res) => {
    var startTime = Date.now();
    res.send(`Ping token: ${uuid_} \n`);
    var endTime = Date.now();
    var latency =  (endTime - startTime);
    metrics.gauge('Ping.latency',latency);
});

app.get('/heavy',async (req, res) => {
    var startTime = Date.now();
    for(let t = new Date();new Date() - t < TIMEOUT;);
    res.status(200).send(`Heavy Hello World latency ms: ${latency} latency s: ${latency/1000}\n`);
    var endTime = Date.now();
    var latency =  (endTime - startTime);
    metrics.gauge('Heavy.latency',latency);
});

app.get('/async',async (req, res) => {
    var startTime = Date.now();
    axios.get(`${end_point}${port_async}`).then( response => {
        var endTime = Date.now();
        var latency =  (endTime - startTime);
        metrics.gauge('Async.latency',latency);
        res.status(200).send(`Response Async Data: ${response.data} 
        token: ${uuid_} latency ms: ${latency} latency s: ${latency/1000}\n`);
    });
});

app.get('/sync',async (req, res) => {
    var startTime = Date.now();
    axios.get(`${end_point}${port_sync}`).then( response => {
        var endTime = Date.now();
        var latency =  (endTime - startTime);
        metrics.gauge('Sync.latency',latency);
        res.status(200).send(`Response sync Data: ${response.data} token: ${uuid_} 
        latency ms: ${latency} latency s: ${latency/1000}\n`);
    });
});

app.listen(PORT,() => {console.log(`Conectados al puerto ${PORT}  token: ${uuid_} \n`)});
const express = require('express')
const compression = require('compression')
const next = require('next')
const routes = require('../../common/routes')
const http = require('http')
const https = require('https')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dir: './src/client', dev})
const handler = routes.getRequestHandler(app);
const api = require('./api/handler')
const config = require('../../common/config')
const trustIP = require('../utils/trustIP')
const conn = require('../mongoDB/conn')
conn();

app.prepare().then(() => {  
  const server = express();
  server.use(express.urlencoded({extended : true}));
  server.use(compression());

  server.get('/api/:id/:msg', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return req.params.msg === undefined ? app.render(req, res, '/') : api(req, res);
  });

  server.get('/admin', (req, res) => trustIP(req) === true ? app.render(req, res, '/admin') : app.render(req, res, '/'));

  server.get('*', (req, res) => handler(req, res));

  config.createServer === 'http' ? createHttpServer(server) : createHttpsServer(server);
});

const createHttpServer = server => {
  http.createServer(server).listen(config.port, () => {
    console.log(config.name, 'http listen (', config.port, ')');
  });
}

const createHttpsServer = server => {
  var options = {  
    key: fs.readFileSync(config[process.env.NODE_ENV].key),
    cert: fs.readFileSync(config[deprocess.env.NODE_ENV].cert)
  };

  https.createServer(server).listen(options, config.port, () => {
    console.log(config.name, 'https listen (', config.port, ')');
  });
}
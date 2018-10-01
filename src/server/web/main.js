const express = require('express')
var compression = require('compression')
const next = require('next')
const routes = require('../../common/routes')
const http = require('http')
const https = require('https')
const fs = require('fs')

const mobxReact = require('mobx-react')
mobxReact.useStaticRendering(true)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './src/client', dev })
const handler = routes.getRequestHandler(app)

const api = require('./api/handler')
const config = require('../../common/config')
const trustIP = require('../utils/trustIP')

app.prepare().then(() => {
  const server = express();
  server.use(express.urlencoded({ extended : true }));
  server.use(compression());

  server.get('/api/:id/:msg', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return req.params.msg === undefined ? app.render(req, res, '/') : api(req, res);
  });

  server.get('/admin', (req, res) => trustIP(req) === true ? app.render(req, res, '/admin') : app.render(req, res, '/'));

  server.get('*', (req, res) => {
    //console.log('aaa');
    //console.log(req);
    //console.log(res);
    handler(req, res);
  });

  dev !== 'production' ? createHttpServer(server) : createHttpsServer(server);
});

const createHttpServer = server => {
  http.createServer(server).listen(config.port, () => {
    console.log(config.name, 'http listen (', config.port, ')');
  });
}

const createHttpsServer = server => {
  var options = {  
    key: fs.readFileSync(config[dev].key),
    cert: fs.readFileSync(config[dev].cert)
  };

  https.createServer(server).listen(options, config.port, () => {
    console.log(config.name, 'https listen (', config.port, ')');
  });
}

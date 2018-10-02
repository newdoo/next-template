//const express = require('express')
const express = require('koa');
const Router = require('koa-router');
var compression = require('compression')
const next = require('next')
const routes = require('../../common/routes')
const http = require('http')
const https = require('https')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dir: './src/client', dev })
const handler = routes.getRequestHandler(app)

const api = require('./api/handler')
const config = require('../common/config')
const trustIP = require('./utils/trustIP')

app.prepare().then(() => {
  const server = new express();
  const router = new Router();
  //server.use(express.urlencoded({extended : true}));
  //server.use(compression());

  console.log(0);

  router.get('/api/:id/:msg', (ctx, next) => {
    ctx.set("Access-Control-Allow-Origin", "*");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set("Access-Control-Allow-Methods", "GET");
    ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    console.log(ctx);

    return ctx.request.params.msg === undefined ? app.render(ctx.request, ctx.response, '/') : api(ctx.request, ctx.response);
  });

  console.log(1);

  router.get('/admin', (ctx, next) => {

    console.log(ctx);

    trustIP(ctx.request) === true ? app.render(ctx.request, ctx.response, '/admin') : app.render(ctx.request, ctx.response, '/')
  });

  console.log(2);

  router.get('*', (ctx, next) => {

    console.log('aaa');
    console.log(ctx);

    ctx.respond = false;
    ctx.res.statusCode = 200; // because koa defaults to 404
    handler(ctx.req, ctx.res);
  });

  console.log(3);

  server.use(router.routes());
  server.use(router.allowedMethods());

  console.log(4);

  // server.get('/api/:id/:msg', (req, res) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Credentials", "true");
  //   res.header("Access-Control-Allow-Methods", "GET");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  //   return req.params.msg === undefined ? app.render(req, res, '/') : api(req, res);
  // });

  // server.get('/admin', (req, res) => trustIP(req) === true ? app.render(req, res, '/admin') : app.render(req, res, '/'));

  // server.get('*', (req, res) => handler(req, res));

  dev !== 'production' ? createHttpServer(server) : createHttpsServer(server);
});

const createHttpServer = server => {
  http.createServer(server.callback()).listen(config.port, () => {
    console.log(config.name, 'http listen (', config.port, ')');
  });
}

const createHttpsServer = server => {
  var options = {  
    key: fs.readFileSync(config[dev].key),
    cert: fs.readFileSync(config[dev].cert)
  };

  https.createServer(server.callback()).listen(options, config.port, () => {
    console.log(config.name, 'https listen (', config.port, ')');
  });
}
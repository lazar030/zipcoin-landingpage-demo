// main.js
const express = require('express')

const app = express()

let UWS = require('express-uws')
let WebSocket = require('ws')
let http = require('http').Server(app)
let uwsServer = UWS(app, http)
global.uwsServer = uwsServer
const wss = new WebSocket.Server({server: http})
// let io = require('socket.io').listen(http);
const Sequelize = require('sequelize')
const logger = require('./logger')
const modules = require('./routes/modules')
const sockets = require('./routes/sockets')
const serveIndex = require('serve-index')
const path = require('path')
const correlator = require('express-correlation-id')

// api v1
let entities = require('./routes/v1/entities')

const cors = require('cors')
const bodyParser = require('body-parser')

// add correlation id to response and log messages and trace the start of request (SS: has to be the first app.use())
app.use(correlator())
// app.use(sockets.init())
app.use(
  function (req, res, next) {
    let correlationId = req.correlationId()
    // let token = req.header('Application-Token')
    logger.print('correlationId', correlationId)
    res.set('X-Correlation-ID', correlationId)
    if (req.originalUrl.indexOf('/.websocket') === -1) {
      logger.print('Executing route: ' + req.method + ' "' + req.originalUrl + '"')
    }
    return next()
  })
// app.use(sockets.checkAuthorizationToken())
// app.use(sockets.checkApplicationToken())
// app.use(modules.checkAuthorizationToken())
// app.use(modules.checkApplicationToken())
app.use(cors())
app.use(bodyParser.json())

// api v1
app.use('/v1/subscriptions', entities)
app.ws('/v1/subscriptions', entities)

// force SSL
const forceSSL = function () {
  return function (req, res, next) {
    let env = process.env.NODE_ENV || 'development'
    if (env !== 'development' && req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      )
    }
    next()
  }
}
app.use(forceSSL())

// error handlers
app.use(function (req, res, next) {
  logger.failed('not found: ' + req.url)
  if (req.originalUrl.indexOf('/.websocket') === -1) {
    return res.status(404).send({message: 'not found: ' + req.url})
  } else {
    return res.ws.send(JSON.stringify({message: 'not found: ' + req.url, status: 400}))
  }
})

app.use(function (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  if (err.name === 'UnauthorizedError') {
    logger.warning(err.message)
  } else {
    logger.failed(err.message, err)
  }
  return res.status(err.status || 500).send({message: err.message || 'Internal error', code: err.code || 'unknown'})
}) 

// Start the app by listening on the default
logger.completed('Application started - listening on port ' + process.env.PORT + '...')
http.listen(parseInt(process.env.PORT))

// salt of authorization

let keypress = require('keypress');

keypress(process.stdin);

let complete = false;
process.stdin.on('data', function (ch) {

  if (Number(ch.join('')) === 27 || Number(ch.join('')) === 3) {
    process.exit()
  }

  if (!complete) {
    try {
      const phrase = String(ch);
      global.mySecretSalt = phrase;
      complete = true;
      logger.completed("Complete!");
    } catch (e) {
      logger.failed("Wrong format, please try again.");
    }
  }
});

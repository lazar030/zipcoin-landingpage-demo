// let shared = require('./shared');
const logger = require('../logger')
const _ = require('lodash')
const validator = require('validator')
const dJSON = require('dirty-json')

const models = require('../models/index')

module.exports = {
  init: function () {
    return function (ws, req, next) {

      ws.query = ws.query ? ws.query : req.query

      if(ws.query && ws.query.name && ws.query.pass) {
        ws.query['Application-Token'] = ws.query['Application-Token'] ? ws.query['Application-Token'] : 'empty'
        ws.query['Authorization'] = ws.query['Authorization'] ? ws.query['Authorization'] : 'empty'
      }
      if (req.headers) ws.id = req.headers['sec-websocket-key']
      // req.set = req.set ? req.set : function () {}
      // ws.header = headerImitator(ws)

      ws.customerSocketIdentifier = ws.originalUrl
        ? (ws.originalUrl.indexOf('/.websocket') !== -1)
        : false

      // logger.print('ws.query : ', ws.query)

      return next()
    }
  },

  checkApplicationToken: function () {
    return function (ws, res, next) {
      if (ws.customerSocketIdentifier) {
        const tokenHeader = ws.query['Application-Token']
        if (!tokenHeader) {
          logger.failed('Invalid application token - application token missing')
          ws.ws.send(JSON.stringify({
            message: 'Invalid application token - application token missing',
            status: 400
          }))
          return ws.ws.close()
        } else {
          // TODO: need to add the token validation here
          return next()
        }
      } else {
        return next()
      }
    }
  },

  checkAuthorizationToken: function () {
    return function (ws, res, next) {
      if (ws.customerSocketIdentifier) {
        const tokenHeader = ws.query['Authorization']
        if (!tokenHeader) {
          logger.failed('Invalid authorization token - authorization token missing')
          ws.ws.send(JSON.stringify({
            message: 'Invalid authorization token - authorization token missing',
            status: 400
          }))
          return ws.ws.close()
        } else {
          // TODO: need to add the token validation here
          return next()
        }
      } else {
        return next()
      }
    }
  },

  checkGlobals: function(){
    return function (ws, res, next) {
      if(global.mySecretSalt) return next()
      else {
        logger.failed('# global variables was not set!!!')
        ws.send(JSON.stringify({
          message: 'Some server error',
          status: 500
        }))
        return ws.close()
      }
    }
  },

  sequelizeErrorHandlerWS: function (ws) {
    return function (err) {
      logger.failed(err.message, err)
      ws.send(JSON.stringify({
        message: err.message || 'Internal error',
        code: err.code || 'unknown'
      }))
    }
  },

  sendToAll: function (req, data) {
    sendToAll(req, data)
  },

  isUUID: function (uuid) {
    return validator.isUUID(uuid, 4)
  }
}

function sendToAll (req, data) {
  const currentUrl = String(req.url).split('.websocket')[0]
  global.uwsServer.getWss().clients.forEach(function each (client) {
    const clientUrl = String(client.url).split('.websocket')[0]
    if (clientUrl === currentUrl) {
      typeof data === 'string' ? client.send(data) : client.send(JSON.stringify(data))
    }
  })
}

function headerImitator (ws) {
  return function (key) {
    return ws.query[key]
  }
}
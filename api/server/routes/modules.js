const Kafka = require('no-kafka')

const cryptoJs = require('crypto-js')
const dJSON = require('dirty-json')
const validator = require('validator')
const moment = require('moment')

const producer = new Kafka.Producer()
const consumer = new Kafka.SimpleConsumer()

const logger = require('../logger')
const constants = require('../constants')

module.exports = {

  checkApplicationToken: function () {
    return function (req, res, next) {
      if (!req.customerSocketIdentifier) {
        const tokenHeader = req.header('Application-Token')
        if (!tokenHeader) {
          logger.failed('Invalid application token - application token missing')
          return res.status(400).send({
            message: 'Invalid application token - application token missing',
            code: '400-000'
          })
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
    return function (req, res, next) {
      if (!req.customerSocketIdentifier) {
        const tokenHeader = req.header('Authorization')
        if (!tokenHeader) {
          logger.failed('Invalid authorization token - authorization token missing')
          return res.status(400).send({
            message: 'Invalid authorization token - authorization token missing',
            code: '400-000'
          })
        } else {
          // TODO: need to add the token validation here
          return next()
        }
      } else {
        return next()
      }
    }
  },

  sequelizeErrorHandler: function (res) {
    return function (err) {
      logger.failed(err.message, err)
      res.status(400).send({
        message: err.message || 'Internal error',
        code: err.code || 'unknown'
      })
    }
  },

  getConsumer: function (id) {
    return consumer.init().then(function () {
      // TODO: didn't work without the topics creating  in advance
      return consumer.subscribe(String(id), dataHandler)
    })
  },

  getProducer: function (id, key, message) {
    return producer.init()
      .then(function () {
        logger.print('# producer send')
        return producer.send({
          // TODO: didn't work without the topics creating  in advance
          topic: String(id),
          partition: 0,
          message: {
            key: key,
            value: message
          }
        })
      })
      .then(function (result) {
        logger.print('# result: ', result)
      })
  },
  // authorization function
  signPassword: function (pass) {
    return global.mySecretSalt
      ? synthesizePrivateKey(pass)
      : false
  },
  checkPassword: function (pass, hash) {
    const result = global.mySecretSalt
      ? synthesizePrivateKey(pass) === hash
      : false
    return result
  },
  signToken: function (data) {
    const expiration = moment().add(constants.OTHER.TOKEN_EXPIRATION, 'seconds')
    return global.mySecretSalt
      ? dataEncrypt({data, expiration}, global.mySecretSalt)
      : false
  },
  getToken: function (hash) {
    return global.mySecretSalt
      ? parsableData(hashDecrypt(hash, global.mySecretSalt))
      : false
  },
  passwordIsValid: function (pass) {
    return pass ? true : false
  },
  nameIsValid: function (name) {
    return name ? true : false
  },
  dataTokenIsValid: function (data) {
    if (typeof data === 'object'
      && validator.isUUID(data.id, 4)
      && data.name
      && typeof data.name === 'string'
    ) {
      return true
    }
    return false
  },
  tokenHasNotExpired: function (expiration) {
    const expirationTime = moment(expiration)
    // logger.print('expiration: ', expirationTime, ' , now: ', now, ' , result: ', result, ' , type: ', typeof result)
    return expirationTime.isAfter()
  },
  parsableData: parsableData,
  types: constants.OTHER.ENTITY_TYPES
}

const dataHandler = function (messageSet, topic, partition) {
  messageSet.forEach(function (m) {
    console.log(topic, partition, m.offset, String(m.message.value), String(m.message.key))
  })
}

function dataEncrypt (data, key) {
  if (data && key) {
    return typeof data === 'object'
      ? cryptoJs.AES.encrypt(JSON.stringify(data), key).toString()
      : cryptoJs.AES.encrypt(String(data), key).toString()
  } else {
    return false
  }
}

function hashDecrypt (hash, key) {
  if (key && hash) {
    const bytes = cryptoJs.AES.decrypt(hash, key)
    const decryptedData = bytes.toString(cryptoJs.enc.Utf8)
    return decryptedData
  } else {
    return false
  }
}

function synthesizePrivateKey (key) {
  if (key) {
    return cryptoJs.HmacSHA512(global.mySecretSalt, key).toString()
  } else {
    return false
  }
}

function parsableData(data){
  try {
    const jsonObj = dJSON.parse(data)
    return jsonObj
  }catch (e) {
    return false
  }
}
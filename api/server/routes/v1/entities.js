let express = require('express')
let router = express.Router()
let multipart = require('connect-multiparty')
const fs = require('fs')
const path = require('path')
const validator = require('validator')

let models = require('../../models/index')
let modules = require('../modules')
let sockets = require('../sockets')
let sequelize = require('sequelize')
const logger = require('../../logger')

const uuidv4 = require('uuid/v4')

const {param, query, body} = require('express-validator/check')
const {sanitizeQuery, sanitizeBody} = require('express-validator/filter')

// add subscriptions
router.post('/add',

  function (req, res, next) {
    const data = req.body
    logger.print('body-data : ', data)
    if (!data.email) {
      logger.failed('# email was not set')
      return res.status(400).send({message: 'Email was not set.'})
    }
    if (!validator.isEmail(data.email)) {
      logger.failed('# email is not valid, \nEmail: ', data.email)
      return res.status(400).send({message: 'Email is not valid.'})
    }
    models.Entity.findOne({where: {email: data.email}})
      .then(sub => {
        if (sub) { 
          if (!sub.newsletter) {
            sub.update({
              newsletter: true
            })
              .then(updated => {
                logger.print('# subscription updated')
                return res.status(200).send({message: 'Was subscribed!'})
              })
              .catch(modules.sequelizeErrorHandler(res))
          } else {
            logger.print('# email already subscribed')
            return res.status(400).send(JSON.stringify({message: 'Email already subscribed.'}))
          }
        } else {
          models.Entity.create({
            id: uuidv4(),
            email: data.email,
            type: modules.types.SUBSCRIPTION_TYPE,
            newsletter: true
          })
            .then(result => {
              logger.print('# subscription was added')
              return res.status(200).send({result: result})
            })
            .catch(modules.sequelizeErrorHandler(res))
        }
      })
      .catch(modules.sequelizeErrorHandler(res))

  })

// get unsubscribe
router.get('/disable/:id',

  function (req, res, next) {
    const subId = req.params.id
    logger.print('unsubscribe id : ', subId)
    if (!validator.isUUID(req.params.id, 4)) {
      logger.failed('# Not a valid ID')
      return res.status(400).send(JSON.stringify({message: 'Not a valid ID'}))
    }

    models.Entity.findOne({where: {id: subId}})
      .then(sub => {
        if (sub) {
          if (!sub.newsletter) {
            logger.failed('# email already unsubscribed')
            return res.status(400).send(JSON.stringify({message: 'Email already unsubscribed.'}))
          }
          sub.update({
            newsletter: false
          })
            .then(updated => {
              logger.print('# subscription updated')
              return res.status(200).send({message: 'Was unsubscribed!'})
            })
            .catch(modules.sequelizeErrorHandler(res))
        } else {
          logger.failed('# subscription not found')
          return res.status(404).send({message: 'Subscription not found.'})
        }
      })
      .catch(modules.sequelizeErrorHandler(res))
  })

module.exports = router
module.exports.root = 'v1/subscriptions'


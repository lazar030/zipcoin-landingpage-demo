const Web3 = require('web3')
const Subject = require('rxjs/Rx')
const path = require('path')
const BigNumber = require('bignumber.js').BigNumber
const request = require('request')

const blockchainEnabled = process.env.BLOCKCHAIN_ENABLED === 'true'

const logger = require('../logger')

module.exports = {
  web3: web3,
  isEnabled: function () {
    logger.print('# blockchainEnabled: ', blockchainEnabled)
    return blockchainEnabled
  }

}

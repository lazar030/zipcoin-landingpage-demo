let express = require('express');
let router = express.Router();
let throttle = require("express-throttle");
let shared = require('./shared');

const {name, version, product_version, description} = require('../../package.json');

router.get(
  '/',
  throttle(shared.throttleOptions),
  function (req, res, next) {
    res.json({
      "name": name,
      "description": description,
      "product_version": product_version,
      "api_version": version
    });
  });

module.exports = router;
module.exports.root = '/version';
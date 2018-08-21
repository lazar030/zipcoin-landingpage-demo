'use strict';

let path = require('path');
let Sequelize = require('sequelize');
let db = {};
const logger = require('../logger');

let sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    dialect: process.env.DATABASE_SEQUELIZE_DIALECT,
    seederStorage: process.env.DATABASE_SEQUELIZE_SEEDER_STORAGE,
    logging: (msg) => logger.print(msg)
  });

// load models
let models = [
  'entity'
];
models.forEach(function(m) {
  let model = sequelize['import'](path.join(__dirname, m));
  db[model.name] = model;
});

// add associations


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

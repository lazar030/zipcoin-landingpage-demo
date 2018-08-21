'use strict';
module.exports = function (sequelize, DataTypes) {
  let Entity = sequelize.define('Entity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('USER', 'SUBSCRIPTION'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
        args: true,
        msg: 'Email address already exists!'
      }
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    data: {
      type: DataTypes.JSONB
    }
  }, {
    indexes: [
      {
        fields: ['tags'],
        using: 'GIN'
      },
      {
        fields: ['external_id'],
        using: 'FULLTEXT'
      }
    ]
  });
  return Entity;
};

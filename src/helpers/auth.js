const jwt = require('jsonwebtoken');
const moment = require('moment');
const {config} = require('../config/server');

module.exports.makeToken = async ({ role, _id }, Users) => {
  const token = await jwt.sign({
    _id: _id,
    role: role,
    exp: moment().add(1, 'week').unix() // in seconds
  }, config.JWT_SECRET);

  return token;
}

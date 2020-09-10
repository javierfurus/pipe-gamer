const environment = process.env.NODE_ENV || 'development';
const config = require('../config/database.json')[environment];
module.exports = require('knex')(config);

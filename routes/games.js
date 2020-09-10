var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const games = await knex('game_list').select();
  res.render('games', { title: 'Games', games });
});

module.exports = router;

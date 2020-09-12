var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const user = await knex('player_list').select()
    .where('player_id', 1);
  const collection = await knex('collection')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', 'collection.game_id')
    .select('collection.*', 'game_list.*');
  res.render('profile', { title: 'Profile', user, collection });
});

module.exports = router;

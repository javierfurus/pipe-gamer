var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const profile = await knex('player_list').select()
    .where('player_id', 1);
  const collection = await knex('collection')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', 'collection.game_id')
    .select('collection.*', 'game_list.*');
  res.render('profile', { title: 'Profile', profile, collection });
});

module.exports = router;

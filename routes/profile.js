var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const user = await knex('player_list').select()
    .where('player_id', 1)
    .first();
  const cart = await knex('cart')
    .select()
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id');
  const games = await knex('game_list')
    .leftJoin('collection', 'collection.game_id', 'game_list.game_id')
    .leftJoin('cart', 'cart.game_id', '=', 'game_list.game_id')
    .select('collection.*', 'game_list.*', 'cart.game_id as cartgameid');
  console.log(games);
  const collection = await knex('collection')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', 'collection.game_id')
    .select('collection.*', 'game_list.*');
  res.render('profile', { title: 'Profile', user, collection, cart });
});

module.exports = router;

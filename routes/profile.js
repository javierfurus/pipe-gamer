var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await knex('player_list').select()
      .where('player_id', 1)
      .first();
    const cart = await knex('cart')
      .select()
      .where('player_id', 1)
      .join('game_list', 'game_list.game_id', '=', 'cart.game_id');
    const sum = await knex('cart')
      .where('player_id', 1)
      .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
      .sum('price as total')
      .first();
    const collection = await knex('collection')
      .where('player_id', 1)
      .join('game_list', 'game_list.game_id', 'collection.game_id')
      .select('collection.*', 'game_list.*');
    res.render('profile', { title: 'Profile', user, collection, cart, sum });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

var express = require('express');
const knex = require('../db/knex');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const games = await knex('game_list').select().limit(6);
    const sum = await knex('cart')
      .where('player_id', 1)
      .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
      .sum('price as total')
      .first();
    const user = await knex('player_list').select()
      .where('player_id', 1)
      .first();
    const cart = await knex('cart')
      .select()
      .where('player_id', 1)
      .join('game_list', 'game_list.game_id', '=', 'cart.game_id');
    const review = await knex('review').select().limit(10)
      .join('game_list', 'game_list.game_id', '=', 'review.game_id')
      .join('player_list', 'player_list.player_id', '=', 'review.player_id');
    res.render('home', { title: 'Home', games, sum, user, cart, review });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;

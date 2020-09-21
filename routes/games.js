var express = require('express');
const knex = require('../db/knex');
var router = express.Router();
let lowCredit = false;
const cartBuild = knex('cart')
  .select()
  .where('player_id', 1)
  .join('game_list', 'game_list.game_id', '=', 'cart.game_id');
const userBuild = knex('player_list').select().where('player_id', 1).first();
router.use((req, res, next) => {
  // Itt megnézzük, hogy a hívás, amit kapunk, az mi
  if (req.query._method === 'DELETE') {
    // Ezzel megváltoztatjuk az eredeti metódust DELETE-re
    req.method = 'DELETE';
    // Majd visszalakítjuk az eredeti URL-t, pl. /todos/1
    req.url = req.path;
  }
  if (req.query._method === 'PUT') {
    // Putnál ismét megcsináljuk ugyanezt
    req.method = 'PUT';
    req.url = req.path;
  }
  if (req.query._method === 'POST') {
    // Postnál ismét megcsináljuk ugyanezt
    req.method = 'POST';
    req.url = req.path;
  }
  next();
});

// Render the game list
router.get('/', async (req, res, next) => {
  const user = await userBuild;
  const games = await knex('game_list')
    .leftJoin('collection', 'collection.game_id', 'game_list.game_id')
    .leftJoin('cart', 'cart.game_id', '=', 'game_list.game_id')
    .select('collection.*', 'game_list.*', 'cart.game_id as cartgameid');
  const sum = await knex('cart')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
    .sum('price as total')
    .first();
  const cart = await cartBuild;
  res.render('games', { title: 'Games', games, user, cart, sum, lowCredit });
});
// Get more info about a game
router.get('/details/:id', async (req, res, next) => {
  const id = req.params.id;
  const user = await userBuild;
  const game = await knex('game_list')
    .select()
    .where('game_list.game_id', id)
    .first();
  const sum = await knex('cart')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
    .sum('price as total')
    .first();
  const review = await knex('review')
    .select()
    .where('review.game_id', id)
    .join('player_list', 'player_list.player_id', '=', 'review.player_id');
  const cart = await cartBuild;
  res.render('details', { game, id: id, review, cart, user, sum });
});
// Add a review to a game!
router.post('/details/:id', async (req, res, next) => {
  const review = req.body;
  if (await isReviewValid(review)) {
    const review = {
      player_id: 1,
      score: req.body.score,
      review: req.body.review,
      game_id: req.params.id
    };
    await knex('review').insert(review);
    res.redirect('back');
  }
});
// Add a game to the collection of a player (now hardcoded: 1)
router.post('/:id/favorite/add', async (req, res, next) => {
  const id = req.params.id;
  await knex('collection')
    .where('game_id', '=', id)
    .update('favorite', 1);
  res.redirect('back');
});
router.post('/:id/favorite/remove', async (req, res, next) => {
  const id = req.params.id;
  await knex('collection')
    .where('game_id', '=', id)
    .update('favorite', 0);
  res.redirect('back');
});
// Buy, buy, buy!
router.put('/buy', async (req, res, next) => {
  const user = await userBuild;
  const sum = await knex('cart')
    .where('player_id', 1)
    .join('game_list', 'game_list.game_id', '=', 'cart.game_id')
    .sum('price as total')
    .first();
  const games = await knex('cart').select('player_id', 'game_id')
    .where('player_id', 1);
  if (isCreditEnough(sum.total, user.credits)) {
    await knex('player_list')
      .where('player_id', 1)
      .decrement('credits', sum.total);
    await knex('collection').insert(games);
    await knex('cart')
      .where('player_id', 1)
      .del();
    res.redirect('back');
  } else {
    res.status(400);
    res.render('error', { message: 'You don\'t have enough credit!' });
  }
});
// Add items to your cart
router.post('/cart/:id', async (req, res, next) => {
  const id = req.params.id;
  const cart = {
    player_id: 1,
    game_id: id
  };
  await knex('cart').insert(cart);
  res.redirect('back');
});
// Remove something from your cart!
router.delete('/cart/:id', async (req, res, next) => {
  const id = req.params.id;
  await knex('cart').where('game_id', id).del();
  res.redirect('back');
});

const isReviewValid = (review) => {
  return review.score && review.review;
};
const isCreditEnough = (sum, credit) => {
  if (sum > credit) {
    console.log('Falsey');
    lowCredit = true;
    return false;
  }
  console.log('truthy');
  lowCredit = false;
  return true;
};
module.exports = router;

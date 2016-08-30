var express = require('express');
var router = express.Router();
var myPokedex= require('../lib/pokedex.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'My Pokedex', myPokedex:myPokedex });
  // console.log(myPokedex);
});

module.exports = router;

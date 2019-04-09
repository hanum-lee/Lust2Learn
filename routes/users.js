var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',function(req,res,next){
  // logging in
  res.send('login request');
});

router.get('/username',function(req,res,next){
  // getting user name for guest
   res.send('get random username');
});

router.post('/user',function(req,res,next){
  //create username
  res.send('create username');
});

router.get('/test',function(req,res,next){
  res.send('testing the restart');
  //res.send('new test');
});


module.exports = router;

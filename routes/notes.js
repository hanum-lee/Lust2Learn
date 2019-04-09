var express = require('express');
var router = express.Router();


router.post('/notes',function(req,res,next){
    // receiving notes from user to save it in db
    // I don't think we need this
});

router.get('/notes',function(req,res,next){
    res.send('get the list of the notes');
});

router.post('/content',function(req,res,next){
    // receiving notes from the user to save it in db
});

router.get('/content',function(req,res,next){
   res.send('sending the content of the note')
});


module.exports = router;

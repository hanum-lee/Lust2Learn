var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
    res.send('returns list of subject');
});


router.get('/title',function(req,res,next){
   res.send('returns the note with the title');
});

router.post('/notes',function (req,res,next){
    // posting notes...?
});

module.exports = router;
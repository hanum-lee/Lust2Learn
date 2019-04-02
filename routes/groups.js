var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {
   res.send('returns group infomation for user');
});

router.get('/chat',function (req,res,next) {
   res.send('returns chat information to user');
});

router.get('/note',function (req,res,next) {
    res.send('returns list of the notes for user');
});

router.get('/note/content',function (req,res,next) {
   res.send('returns the content of the note to user'); 
});

router.post('/note/content',function (req,res,next) {
   //post the note info from the user to save it to db
});

router.post('/note/comment',function (req,res,next) {
   // post the comment for the note
});

router.get('/note/comment',function (req,res,next) {
   res.send('returns comments for the note to user');
});
module.exports = router;

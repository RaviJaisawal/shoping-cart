var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var csurf = require('csurf');
var csurfProtection = csurf();
var passport =  require('passport');



router.use(csurfProtection);

router.get('/profile',isLoggedIn, function(req,res,next){
  console.log('inside user profile')
  res.render('user/profile');
});

router.get('/logout',isLoggedIn, function(req,res,next){
	console.log('request come for logout');	
    req.logout();	
	res.redirect('/');	

});

router.use('/',notLoggedIn,function(req,res,next){
   console.log('check / for notLoggedIn');
   next();
});





router.get('/signup', function(req, res, next) {  
  var messages = req.flash('error');
  console.log(messages);
  res.render('user/signup', { csrfToken	: req.csrfToken(),messages:messages,hasError : messages.length > 0});
});

router.post('/signup', passport.authenticate('local.signup',{
successRedirect: '/user/profile',
failureRedirect:'/user/signup',
failureFlash:true
}));

router.get('/signin',function(req,res,next){
  var messages = req.flash('error');
  console.log(messages);
  res.render('user/signin', { csrfToken	: req.csrfToken(),messages:messages,hasError : messages.length > 0});
});

router.post('/signin',passport.authenticate('local.signin',{
successRedirect: '/user/profile',
failureRedirect:'/user/signin',
failureFlash:true
}));



module.exports = router;

function isLoggedIn(req,res,next){
	console.log('isLoggedIn function called');
	if(req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}

function notLoggedIn(req,res,next){
	console.log('notLoggedIn function called');
	if(!req.isAuthenticated())
	{
		return next();
	}
	res.redirect('/');
}
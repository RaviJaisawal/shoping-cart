var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var csurf = require('csurf');
var csurfProtection = csurf();
var passport =  require('passport');

var Product =  require('../models/product');
var Cart =  require('../models/cart');


router.use(csurfProtection);


router.get('/', function(req, res, next) {
  Product.find(function(error,docs){
     var productChunk = [];
     var chunkSize = 6;
     for(var i=0; i<docs.length; i += chunkSize){
     	     	productChunk.push(docs.slice(i,i+chunkSize));     	
     }   
     //res.send(productChunk);  
     res.render('shop/index', { products: productChunk });
  });	
 
});

router.get('/add-to-cart/:id',function(req,res,next){
	var productid = req.params.id;
	console.log('productid ',productid);
	var cart  = new Cart(req.session.cart ? req.session.cart :  {});
    console.log(cart);
	Product.findById(productid,function(error,product){
		if(error){
			return res.redirect('/');
		}
		console.log(product);
		cart.add(product,product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/');
	});
});




module.exports = router;

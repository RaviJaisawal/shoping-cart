var product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('localhost:27017/shoping');

var products = [
	   new product({
		imagePath : "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
		title : "Gothic Video Game ",
		description: "Awesome Game",
		price : 10
	   }),
	   new product({
		imagePath : "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
		title : "Gothic Video Game ",
		description: "Awesome Game",
		price : 15
	   }),
	   new product({
		imagePath : "https://upload.wikimedia.org/wikipedia/en/5/5e/Gothiccover.png",
		title : "Gothic Video Game ",
		description: "Awesome Game",
		price : 25
	   })
   ];

 var done = 0;

 for(var i=0;i<products.length;i++){
   	products[i].save(function(error,result){
   		done++;
   		if(done === product.length){
   			exit();
   		}
   	  });
}

function exit(){
	mongoose.disconnect();
}
 

module.exports = function cart(oldCart){
	this.items = oldCart.items || {};
	this.totalQty = oldCart.totalQty || 0;
	this.totalPrice = oldCart.totalPrice || 0;

	this.add = function(item,id){
		var storeItem = this.items[id];
		if(!storeItem){
			storeItem = this.items[id] = {item:item,qty:0,price:0};
		}

		storeItem.qty++;
		storeItem.price = storeItem.item.price * storeItem.qty;
		this.totalQty++; 
		this.totalPrice +=  storeItem.item.price;

	}

    this.genearteArray = function(){
    	var arr = [];
    	for(var id  in this.items){
            arr.push(this.items[id]);
    	}
    	return arr;
    }

}
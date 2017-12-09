'use strict';

//Cart

var Cart = function(cart){
    this._customer = new Customer(cart.customer);
    this._order = (new Order(cart.lineItems));
    this.render = function(container){
        this._customer.renderBefore(container);
        this._order.render(container);
    };
};
'use strict';

//Customer

var Customer = function(customer){
    this._suffix = customer.suffix;
    this._name = customer.name;
    this._address = customer.address;
    this.renderBefore = function(container){
        container.before($("<h1>Hi " + this._suffix + " " + this._name + ",</h1>"))
            .before($("<h3>" + "address: " + this._address + "</h3>"));
    };
};
'use strict';

//Customer

var Customer = function(customer){
    this._suffix = customer.suffix;
    this._name = customer.name;
    this._address = customer.address;
    this.render = function(){
        var Greetingnode = $("<h1>Hi " + this._suffix + " " + this._name + ",</h1>");
        var Addressnode = $("<h3>" + "address: " + this._address + "</h3>");
        $("#order").before(Greetingnode);
        $("#order").before(Addressnode);
    };
};
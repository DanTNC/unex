'use strict';

//Customer

var Customer = function(customer){
    this._suffix = customer.suffix;
    this._name = customer.name;
    this._address = customer.address;
    this.render = function(){
        var Greetingnode = document.createElement("h1");
        Greetingnode.innerHTML = "Hi " + this._suffix + " " + this._name + ",";
        var Addressnode = document.createElement("h3");
        Addressnode.innerHTML = "address: " + this._address;
        document.getElementsByTagName("body")[0].insertBefore(Greetingnode, document.getElementById("order"));
        document.getElementsByTagName("body")[0].insertBefore(Addressnode, document.getElementById("order"));
    };
};
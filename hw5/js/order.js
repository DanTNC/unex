'use strict';

//Order

var Order = function(lineItems){
    this._lineItems = [];
    for (let lineItem of lineItems){
        this._lineItems.push(new LineItem(lineItem));
    }
    this.getOrderSkeletonNode = function(){//Create a DOM node for whole order skeleton.
        var Skeleton = $('<div class="table"><div class="tbody"><div class="tr header"><div class="th">Description</div><div class="th">Cost</div><div class="th righth">Quantity</div><div class="th righth">Total</div></div></div></div>');
        return Skeleton;
    };
    this.fillOrder = function(Skeleton){
        var SkeletonBody = Skeleton.find(".tbody");
        for (let i in this._lineItems){
            let item = this._lineItems[i];
            SkeletonBody.append(item.getItemNode(i));
        }
        var Ordernode = $("#order");
        Ordernode.html("").append(Skeleton);
        var Statementnode = $("<p>Here's your order:</p>");
        Skeleton.before(Statementnode);
        return Ordernode;
    };
    this.displayTotal = function(Ordernode){
        var TotalCostnode = $("<p>total cost : &nbsp;<span id='total'>" + getTotal() + "</span></p>");
        Ordernode.append(TotalCostnode);
    };
    this.render = function(){
        this.displayTotal(this.fillOrder(this.getOrderSkeletonNode()));
    };
};
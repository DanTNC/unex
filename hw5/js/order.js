'use strict';

//Order

var Order = function(lineItems){
    this._lineItems = [];
    for (let lineItem of lineItems){
        this._lineItems.push(new LineItem(lineItem));
    }
    this.getOrderSkeletonNode = function(){//Create a DOM node for whole order skeleton.
        return $('<div class="table">'
                +   '<div class="tbody">'
                +       '<div class="tr header">'
                +           '<div class="th">Description</div>'
                +           '<div class="th">Cost</div>'
                +           '<div class="th righth">Quantity</div>'
                +           '<div class="th righth">Total</div>'
                +       '</div>'
                +   '</div>'
                +'</div>');
    };
    this.fillOrder = function(container, Skeleton){
        var SkeletonBody = Skeleton.find(".tbody");
        for (let i in this._lineItems){
            let item = this._lineItems[i];
            item.appendTo(SkeletonBody, i);
        }
        container.html("").append($("<p>Here's your order:</p>")).append(Skeleton);
    };
    this.displayTotal = function(container){
        container.append($("<p>total cost : &nbsp;<span id='total'>" + getTotal() + "</span></p>"));
    };
    this.render = function(container){
        this.fillOrder(container, this.getOrderSkeletonNode());
        this.displayTotal(container);
    };
};
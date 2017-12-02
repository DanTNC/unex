'use strict';

//Order

var Order = function(lineItems){
    this._lineItems = [];
    for (let lineItem of lineItems){
        this._lineItems.push(new LineItem(lineItem));
    }
    this.getOrderSkeletonNode = function(){//Create a DOM node for whole order skeleton.
        var Skeleton = document.createElement("div");
        Skeleton.className = "table";
        Skeleton.innerHTML = '<div class="tbody"><div class="tr header"><div class="th">Description</div><div class="th">Cost</div><div class="th righth">Quantity</div><div class="th righth">Total</div></div></div>';
        return Skeleton;
    };
    this.fillOrder = function(Skeleton){
        var SkeletonBody = Skeleton.getElementsByClassName("tbody")[0];
        for (let i in this._lineItems){
            let item = this._lineItems[i];
            SkeletonBody.appendChild(item.getItemNode(i));
        }
        var Ordernode = document.getElementById("order");
        Ordernode.replaceChild(Skeleton, Ordernode.childNodes[0]);
        var Statementnode = document.createElement("p");
        Statementnode.innerHTML = "Here's your order:";
        Ordernode.insertBefore(Statementnode, Skeleton);
        return Ordernode;
    };
    this.displayTotal = function(Ordernode){
        var TotalCostnode = document.createElement("p");
        TotalCostnode.innerHTML = "total cost : &nbsp;<span id='total'>" + getTotal() + "</span>";
        Ordernode.appendChild(TotalCostnode);
    };
    this.render = function(){
        this.displayTotal(this.fillOrder(this.getOrderSkeletonNode()));
    };
};
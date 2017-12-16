'use strict';

//LineItem

var LineItem = function(lineItem){
    this._description = lineItem.description;
    this._cost = lineItem.cost;
    this._quantity = lineItem.quantity;
    this.getNode = function(tableEle, className){
        className = className || "";
        return $("<div/>",{
            "class": tableEle + " " + className
        });
    };
    this.getTdNode = function(className){
        return this.getNode("td", className);
    };
    this.getTrNode = function(className){
        return this.getNode("tr", className);
    };
    this.getDesNode = function(){
        return this.getTdNode().html(this._description);
    };
    this.getCosNode = function(){
        return this.getTdNode("cost").html(this._cost);
    };
    this.getQuaNode = function(i){
        var QuaInput = $("<input/>", {
            "class": "quantity",
            "id": "quantity_" + i,
            "type": "text",
            "onchange": "changeTotal(" + i + ");"
        }).val(this._quantity);
        return this.getTdNode("quantity_cell")
            .append($('<i class="fa fa-caret-square-o-up updownbutton" aria-hidden="true" onclick="upQuantity('+ i +');"></i>'))
            .append($('<i class="fa fa-caret-square-o-down updownbutton" aria-hidden="true" onclick="downQuantity('+ i +');"></i>'))
            .append(QuaInput);
    };
    this.getTotNode = function(){
        return this.getTdNode("item_total");
    };
    this.assembleItemSubNodes = function(Nodes){
        var Row = this.getTrNode();
        for (let node of Nodes){
            Row.append(node);
        }
        return Row;
    };
    this.appendTo = function(container, i){//Append a DOM node for an item to the container.
        container.append(this.assembleItemSubNodes([this.getDesNode(), this.getCosNode(), this.getQuaNode(i), this.getTotNode()]));
    };
};
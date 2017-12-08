'use strict';

//LineItem

var LineItem = function(lineItem){
    this._description = lineItem.description;
    this._cost = lineItem.cost;
    this._quantity = lineItem.quantity;
    this.getNode = function(tableEle, className){
        className = className || "";
        var Node = $("<div class='" + tableEle + " " + className + "'></div>");
        return Node;
    };
    this.getTdNode = function(className){
        return this.getNode("td", className);
    };
    this.getTrNode = function(className){
        return this.getNode("tr", className);
    };
    this.getDesNode = function(){
        var Des = this.getTdNode();
        Des.html(this._description);
        return Des;
    };
    this.getCosNode = function(){
        var Cos = this.getTdNode("cost");
        Cos.html(this._cost);
        return Cos;
    };
    this.getQuaNode = function(i){
        var Qua = this.getTdNode("quantity_cell");
        var QuaInput = $("<input class='quantity' id='quantity_" + i + "'></input>");
        QuaInput.val(this._quantity);
        QuaInput.attr("type", "text");
        QuaInput.attr("onchange", "changeTotal(" + i + ");");
        Qua.append($('<i class="fa fa-caret-square-o-up updownbutton" aria-hidden="true" onclick="upQuantity('+ i +');"></i>'));
        Qua.append($('<i class="fa fa-caret-square-o-down updownbutton" aria-hidden="true" onclick="downQuantity('+ i +');"></i>'));
        Qua.append(QuaInput);
        return Qua;
    };
    this.getTotNode = function(){
        var Tot = this.getTdNode("item_total");
        return Tot;
    };
    this.assembleItemSubNodes = function(Nodes){
        var Row = this.getTrNode();
        for (let node of Nodes){
            Row.append(node);
        }
        return Row;
    };
    this.getItemNode = function(i){//Create a DOM node for an item.
        return this.assembleItemSubNodes([this.getDesNode(), this.getCosNode(), this.getQuaNode(i), this.getTotNode()]);
    };
};
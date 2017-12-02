'use strict';

//LineItem

var LineItem = function(lineItem){
    this._description = lineItem.description;
    this._cost = lineItem.cost;
    this._quantity = lineItem.quantity;
    this.getNode = function(tableEle, className){
        className = className || "";
        var Node = document.createElement("div");
        Node.classList = tableEle + " " + className;
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
        Des.innerHTML = this._description;
        return Des;
    };
    this.getCosNode = function(){
        var Cos = this.getTdNode("cost");
        Cos.innerHTML = this._cost;
        return Cos;
    };
    this.getQuaNode = function(i){
        var Qua = this.getTdNode("quantity_cell");
        var QuaInput = document.createElement("input");
        QuaInput.id = "quantity_"+i;
        QuaInput.className = "quantity";
        QuaInput.value = this._quantity;
        QuaInput.setAttribute("type", "text");
        QuaInput.setAttribute("onchange", "changeTotal(" + i + ");");
        Qua.innerHTML += ('<i class="fa fa-caret-square-o-up updownbutton" aria-hidden="true" onclick="upQuantity('+ i +');"></i>');
        Qua.innerHTML += ('<i class="fa fa-caret-square-o-down updownbutton" aria-hidden="true" onclick="downQuantity('+ i +');"></i>');
        Qua.appendChild(QuaInput);
        return Qua;
    };
    this.getTotNode = function(){
        var Tot = this.getTdNode("item_total");
        return Tot;
    };
    this.assembleItemSubNodes = function(Nodes){
        var Row = this.getTrNode();
        for (let node of Nodes){
            Row.appendChild(node);
        }
        return Row;
    };
    this.getItemNode = function(i){//Create a DOM node for an item.
        return this.assembleItemSubNodes([this.getDesNode(), this.getCosNode(), this.getQuaNode(i), this.getTotNode()]);
    };
};
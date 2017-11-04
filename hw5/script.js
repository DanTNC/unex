'use strict';

var Order;

var resolve = (order)=>{
    Order = JSON.parse(order);
};

var getTotal = (o)=>{
    var TotalCost = 0;
    for (var i of o){
        TotalCost += Number(i.cost) * Number(i.quantity);
    }
    return Math.round(TotalCost*100)/100;
};

var changeTotal = (index)=>{
    var input = document.getElementById("quantity_"+index);
    if (input.value < 0){
        input.value = 0;
    }
    input.value = Math.round(input.value)
    if(isNaN(input.value)){
        input.value = 0;
    }
    if(input.value == 0){
        input.parentNode.parentNode.style.display = "none";
    }
    Order[index].quantity = input.value;
    document.getElementById("total").innerHTML = getTotal(Order);
};

var render = ()=>{
    var Table = document.createElement("div");
    Table.className = "table";
    Table.innerHTML = '<div class="tbody"><div class="tr"><div class="th">Description</div><div class="th">Cost</div><div class="th">Quantity</div></div></div>';
    
    for ( var i in Order ){
        let item = Order[i];
        var Row = document.createElement("div");
        Row.className = "tr";
        var Des = document.createElement("div");
        Des.className = "td";
        Des.innerHTML = item.description;
        var Cos = document.createElement("div");
        Cos.className = "td";
        Cos.innerHTML = item.cost;
        var Qua = document.createElement("div");
        Qua.className = "td";
        var QuaInput = document.createElement("input")
        QuaInput.id = "quantity_"+i;
        QuaInput.className = "quantity";
        QuaInput.value = item.quantity;
        QuaInput.setAttribute("type", "text");
        QuaInput.setAttribute("onchange", "changeTotal(" + i + ");");
        Qua.appendChild(QuaInput);
        Row.appendChild(Des);
        Row.appendChild(Cos);
        Row.appendChild(Qua);
        Table.getElementsByClassName("tbody")[0].appendChild(Row);
    }
    
    var TotalCostnode = document.createElement("p");
    TotalCostnode.innerHTML = "total cost : &nbsp;<span id='total'>" +getTotal(Order) + "</span>"; //round off to the second decimal place
    
    var Ordernode = document.getElementById("order")
    Ordernode.replaceChild(Table, Ordernode.childNodes[0]);
    Ordernode.appendChild(TotalCostnode);
};

window.onload = ()=>{
    var req = new XMLHttpRequest();
    req.open('GET', 'json/order.json');
    req.onload = ()=>{
        if(req.status == 200){
            resolve(req.responseText);
            render();
        }else{
            console.error("Error on getting th order");
            document.getElementById("order").innerHTML = "Sorry, we can't find your order.";
        }
    }
    req.send();
};
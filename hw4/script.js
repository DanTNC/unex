'use strict';
window.onload = ()=>{
    
    var Order = [
        { description: "Apple", cost: "1.1", quantity: "10" },
        { description: "Banana", cost: "1.2", quantity: "9" },
        { description: "Lettuce", cost: "1.3", quantity: "8" },
        { description: "Milk", cost: "2.4", quantity: "7" },
        { description: "Soy milk", cost: "2.5", quantity: "6" },
        { description: "Beef", cost: "2.6", quantity: "5" },
        { description: "Pork", cost: "3.7", quantity: "4" },
        { description: "Pasta", cost: "3.8", quantity: "3" },
        { description: "Pizza", cost: "3.9", quantity: "2" },
        { description: "Coffee", cost: "4.0", quantity: "1" }
    ];
    
    var Table = document.createElement("div");
    Table.className = "table";
    Table.innerHTML = '<div class="tbody"><div class="tr"><div class="th">Description</div><div class="th">Cost</div><div class="th">Quantity</div></div></div>';
    
    var TotalCost = 0;
    
    for ( var item of Order ){
        var Row = document.createElement("div");
        Row.className = "tr";
        var Des = document.createElement("div");
        Des.className = "td"
        Des.innerHTML = item.description;
        var Cos = document.createElement("div");
        Cos.className = "td"
        Cos.innerHTML = item.cost;
        var Qua = document.createElement("div");
        Qua.className = "td"
        Qua.innerHTML = item.quantity;
        Row.appendChild(Des);
        Row.appendChild(Cos);
        Row.appendChild(Qua);
        Table.getElementsByClassName("tbody")[0].appendChild(Row);
        TotalCost += Number(item.cost) * Number(item.quantity);
    }
    
    var TotalCostnode = document.createElement("p");
    TotalCostnode.innerHTML = "total cost : &nbsp;" + Math.round(TotalCost*100)/100; //round off to the second decimal place
    
    var Ordernode = document.getElementById("order")
    Ordernode.replaceChild(Table, Ordernode.childNodes[0]);
    Ordernode.appendChild(TotalCostnode);
    
};
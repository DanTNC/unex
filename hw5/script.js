'use strict';

var getTotal = ()=>{//Calculate the totalCost for the lineItems in the DOM.
    var TotalCost = 0;
    for (var item of document.getElementsByClassName("tr")){
        if (item.classList.contains("header")){
            continue;
        }
        TotalCost += Number(item.getElementsByClassName("cost")[0].innerHTML) * Number(item.getElementsByClassName("quantity")[0].value);
    }
    return TotalCost.toFixed(2);
};

var filterValue = (index)=>{//Filter out float, negative value, and non-number string from the input value.
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
};

var changeTotal = (index)=>{//Event Handler to change the displayed totalCost.
    filterValue(index);
    document.getElementById("total").innerHTML = getTotal();
};

var getDesNode = (item)=>{
    var Des = document.createElement("div");
    Des.className = "td";
    Des.innerHTML = item.description;
    return Des;
};

var getCosNode = (item)=>{
    var Cos = document.createElement("div");
    Cos.classList = "td cost";
    Cos.innerHTML = item.cost;
    return Cos;
};

var getQuaNode = (item, i)=>{
    var Qua = document.createElement("div");
    Qua.className = "td";
    var QuaInput = document.createElement("input")
    QuaInput.id = "quantity_"+i;
    QuaInput.className = "quantity";
    QuaInput.value = item.quantity;
    QuaInput.setAttribute("type", "text");
    QuaInput.setAttribute("onchange", "changeTotal(" + i + ");");
    Qua.appendChild(QuaInput);
    return Qua;
};

var assembleItemSubNodes = (Des, Cos, Qua)=>{
    var Row = document.createElement("div");
    Row.className = "tr";
    Row.appendChild(Des);
    Row.appendChild(Cos);
    Row.appendChild(Qua);
    return Row;
};

var getItemNode = (item, i)=>{//Create a DOM node for an item.
    var Des = getDesNode(item);
    var Cos = getCosNode(item);
    var Qua = getQuaNode(item, i);
    return assembleItemSubNodes(Des, Cos, Qua);
};

var getOrderSkeletonNode = ()=>{//Create a DOM node for whole order skeleton. (table now but would be modified)
    var Skeleton = document.createElement("div");
    Skeleton.className = "table";
    Skeleton.innerHTML = '<div class="tbody"><div class="tr header"><div class="th">Description</div><div class="th">Cost</div><div class="th">Quantity</div></div></div>';
    return Skeleton;
};

var fillOrder = (Skeleton, Order)=>{
    for ( var i in Order ){
        let item = Order[i];
        Skeleton.getElementsByClassName("tbody")[0].appendChild(getItemNode(item, i));
        console.log(Skeleton);
    }
    var Ordernode = document.getElementById("order");
    Ordernode.replaceChild(Skeleton, Ordernode.childNodes[0]);
    return Ordernode;
};

var displayTotal = (Ordernode)=>{
    var TotalCostnode = document.createElement("p");
    TotalCostnode.innerHTML = "total cost : &nbsp;<span id='total'>" +getTotal() + "</span>";
    Ordernode.appendChild(TotalCostnode);
};

var render = (Order)=>{//Render the received order.
    displayTotal(fillOrder(getOrderSkeletonNode(), Order));
};

var loadOrderError = ()=>{
    console.error("Error on getting th order");
    document.getElementById("order").innerHTML = "Sorry, we can't find your order.";
};

window.onload = ()=>{
    var req = new XMLHttpRequest();
    req.open('GET', 'json/order.json');
    req.onload = ()=>{
        if(req.status == 200){
            render(req.response);
        }else{
            loadOrderError();
        }
    }
    req.responseType = "json";
    req.send();
};
'use strict';

var getItemTotal = (item)=>{//Calculate the totalCost for one lineItem in the DOM.
    var total =  Number(item.getElementsByClassName("cost")[0].innerHTML) * Number(item.getElementsByClassName("quantity")[0].value);
    item.getElementsByClassName("item_total")[0].innerHTML = total.toFixed(2);
    return total;
};

var getTotal = ()=>{//Calculate the totalCost for the lineItems in the DOM.
    var TotalCost = 0;
    for (var item of document.getElementsByClassName("tr")){
        if (item.classList.contains("header")){
            continue;
        }
        TotalCost += getItemTotal(item);
    }
    return TotalCost.toFixed(2);
};

var remove = ()=>{
    var index = document.getElementById("popup").getAttribute("data-index");
    document.getElementById("quantity_"+index).parentNode.parentNode.style.visibility = "collapse";
    document.getElementById("total").innerHTML = getTotal();
    popup(index, false);
};

var back = ()=>{
    var index = document.getElementById("popup").getAttribute("data-index");
    document.getElementById("quantity_"+index).value = 1;
    document.getElementById("total").innerHTML = getTotal();
    popup(index, false);
};


var popup = (index, show)=>{
    if(show){
        document.getElementById("popup").style.visibility = "visible";
        document.getElementById("popup").setAttribute("data-index", index);
        document.getElementById("popup_filter").style.visibility = "visible";
    }else{
        document.getElementById("popup").style.visibility = "collapse";
        document.getElementById("popup_filter").style.visibility = "collapse";
    }
};

var filterValue = (index)=>{//Filter out float, negative value, and non-number string from the input value.
    var input = document.getElementById("quantity_"+index);
    if (input.value < 0){
        input.value = 0;
    }
    input.value = Math.round(input.value);
    if(isNaN(input.value)){
        input.value = 0;
    }
    if(input.value == 0){
        //input.parentNode.parentNode.style.display = "none";
        popup(index, true);
        return false;
    }else{
        return true;
    }
};

var changeTotal = (index)=>{//Event Handler to change the displayed totalCost.
    if(filterValue(index)){
        document.getElementById("total").innerHTML = getTotal();
    }
};

var changeQuantity = (index, amount)=>{
    var QuaInput = document.getElementById("quantity_" + index);
    QuaInput.value = Number(QuaInput.value) + amount;
    changeTotal(index);
};

var upQuantity = (index)=>{
    changeQuantity(index, 1);
};

var downQuantity = (index)=>{
    changeQuantity(index, -1);
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
    Qua.classList = "td quantity_cell";
    var QuaInput = document.createElement("input");
    QuaInput.id = "quantity_"+i;
    QuaInput.className = "quantity";
    QuaInput.value = item.quantity;
    QuaInput.setAttribute("type", "text");
    QuaInput.setAttribute("onchange", "changeTotal(" + i + ");");
    Qua.innerHTML += ('<i class="fa fa-caret-square-o-up updownbutton" aria-hidden="true" onclick="upQuantity('+ i +');"></i>');
    Qua.innerHTML += ('<i class="fa fa-caret-square-o-down updownbutton" aria-hidden="true" onclick="downQuantity('+ i +');"></i>');
    Qua.appendChild(QuaInput);
    return Qua;
};

var getTotNode = ()=>{
    var Tot = document.createElement("div");
    Tot.classList = "td item_total";
    return Tot;
};

var assembleItemSubNodes = (Nodes)=>{
    var Row = document.createElement("div");
    Row.className = "tr";
    for (var node of Nodes){
        Row.appendChild(node);
    }
    return Row;
};

var getItemNode = (item, i)=>{//Create a DOM node for an item.
    return assembleItemSubNodes([getDesNode(item), getCosNode(item), getQuaNode(item, i), getTotNode()]);
};

var getOrderSkeletonNode = ()=>{//Create a DOM node for whole order skeleton.
    var Skeleton = document.createElement("div");
    Skeleton.className = "table";
    Skeleton.innerHTML = '<div class="tbody"><div class="tr header"><div class="th">Description</div><div class="th">Cost</div><div class="th righth">Quantity</div><div class="th righth">Total</div></div></div>';
    return Skeleton;
};

var fillOrder = (Skeleton, Order)=>{
    var SkeletonBody = Skeleton.getElementsByClassName("tbody")[0];
    for ( var i in Order ){
        let item = Order[i];
        SkeletonBody.appendChild(getItemNode(item, i));
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

var displayCustomer = (Customer)=>{
    
};

var render = (OrderInfo)=>{//Render the received order.
    displayCustomer(OrderInfo.customer);
    displayTotal(fillOrder(getOrderSkeletonNode(), OrderInfo.lineItems));
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
    };
    req.responseType = "json";
    req.send();
};
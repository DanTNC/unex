'use strict';

//EventListeners and their helper functions

var render = (OrderInfo)=>{//Render the received order.
    (new Cart(OrderInfo)).render();
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

var getItemTotal = (item)=>{//Calculate the totalCost for one lineItem in the DOM.
    var total =  Number(item.getElementsByClassName("cost")[0].innerHTML) * Number(item.getElementsByClassName("quantity")[0].value);
    item.getElementsByClassName("item_total")[0].innerHTML = total.toFixed(2);
    return total;
};

var getTotal = ()=>{//Calculate the totalCost for the lineItems in the DOM.
    var TotalCost = 0;
    for (let item of document.getElementsByClassName("tr")){
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
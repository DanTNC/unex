'use strict';
/*global $*/

//EventListeners and their helper functions

var render = (container, OrderInfo)=>{//Render the received order.
    (new Cart(OrderInfo)).render(container);
};

var loadOrderError = (container)=>{
    console.error("Error on getting th order");
    container.text("Sorry, we can't find your order.");
};

$( ()=>{
    var req = new XMLHttpRequest();
    req.open('GET', 'json/order.json');
    req.onload = ()=>{
        if(req.status == 200){
            render($("#order"), req.response);
        }else{
            loadOrderError($("#order"));
        }
    };
    req.responseType = "json";
    req.send();
} );

var getItemTotal = (item)=>{//Calculate the totalCost for one lineItem in the DOM.
    item = $(item);
    var total =  Number(item.find(".cost").html()) * Number(item.find(".quantity").val());
    item.find(".item_total").text(total.toFixed(2));
    return total;
};

var getTotal = ()=>{//Calculate the totalCost for the lineItems in the DOM.
    var TotalCost = 0;
    $(".tr").each( function(index, element){
        if (element.classList.contains("header")){
            return;
        }
        TotalCost += getItemTotal(element);
    });
    return TotalCost.toFixed(2);
};

var popupOption = (operation)=>{
    var index = $("#popup").attr("data-index");
    operation(index);
    $("#total").html(getTotal());
    popup(false);
}; 

var remove = ()=>{
    popupOption(function(index){
        $("#quantity_"+index).parents(".tr").css("visibility", "collapse");
    });
};

var back = ()=>{
    popupOption(function(index){
        $("#quantity_"+index).val(1);
    });
};

const popup_top = (window.screen.width < 640)? "60vw": "20vw";

var popup = (show)=>{
    $("#popup").css("top", show? popup_top: "-100vw");
    if(show){
        $("#popup_filter").fadeIn(500);
    }else{
        $("#popup_filter").fadeOut(500);
    }
};

var filterValue = (index)=>{//Filter out float, negative value, and non-number string from the input value.
    var input = $("#quantity_"+index);
    if (input.val() < 0){
        input.val(0);
    }
    input.val(Math.round(input.val()));
    if(isNaN(input.val())){
        input.val(0);
    }
    if(input.val() == 0){
        $("#popup").attr("data-index", index);
        popup(true);
        return false;
    }else{
        return true;
    }
};

var changeTotal = (index)=>{//Event Handler to change the displayed totalCost.
    if(filterValue(index)){
        $("#total").html(getTotal());
    }
};

var changeQuantity = (index, amount)=>{
    var QuaInput = $("#quantity_"+index);
    QuaInput.val(Number(QuaInput.val()) + amount);
    changeTotal(index);
};

var upQuantity = (index)=>{
    changeQuantity(index, 1);
};

var downQuantity = (index)=>{
    changeQuantity(index, -1);
};
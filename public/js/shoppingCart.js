let arrow = document.querySelectorAll(".calculateShipping");
var incrementButton = document.getElementsByClassName('plus');
var decrementButton = document.getElementsByClassName('minus');
var overallSubtotal = 0;
var subTotal = document.querySelectorAll("input[type='subtotal']");
var setSubTotal = document.getElementById('overallSubTotal');
var setTotalValue = document.getElementById('overallTotal');
var setDelivery = document.getElementById('delivery');

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement;//selecting main parent of arrow
        console.log(arrowParent)
        arrowParent.classList.toggle("showAddress");
    });
}

function calculateDeliveryFee(obj) {
    var state = obj.selectedIndex + 1;
    var westMalaysia = 8.25;
    var eastMalaysia = 10.20;
    if (state > 13) {

        setDelivery.value = eastMalaysia.toFixed(2);
    } else {
        setDelivery.value = westMalaysia.toFixed(2);
    }

    setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

}

if (subtotal.length == undefined) {
    overallSubtotal = parseFloat(subtotal.value);
    console.log(overallSubtotal);

} else {
    for (var i = 0; i < subtotal.length; i++) {



        overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

    }
}
setSubTotal.value = overallSubtotal.toFixed(2);

var totalPrice = parseFloat(setDelivery.value) + parseFloat(setSubTotal.value);
setTotalValue.value = totalPrice.toFixed(2);



for (var i = 0; i < incrementButton.length; i++) {
    var button = incrementButton[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var quantity = buttonClicked.parentElement.children[1];
        console.log(quantity);
        var itemPrice = buttonClicked.parentElement.parentElement.parentElement.children[2].children[0];
        console.log(itemPrice.value);
        var itemSubPrice = buttonClicked.parentElement.parentElement.parentElement.children[4].children[0];
        console.log(itemSubPrice);
        var newIncrementValue = parseInt(quantity.value) + 1;
        var newinputSubPrice = parseFloat(itemPrice.value) * newIncrementValue;
        itemSubPrice.value = newinputSubPrice.toFixed(2);
        quantity.value = newIncrementValue;
        overallSubtotal = 0;

        if (subtotal.length == undefined) {
            overallSubtotal = parseFloat(subtotal.value) + overallSubtotal
        } else {
            for (var i = 0; i < subtotal.length; i++) {

                overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

            }
        }
        setSubTotal.value = overallSubtotal.toFixed(2);
        setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

    })


}

for (var i = 0; i < decrementButton.length; i++) {
    var button = decrementButton[i];
    button.addEventListener('click', function (event) {
        var buttonClicked = event.target;
        var quantity = buttonClicked.parentElement.children[1];
        var itemPrice = buttonClicked.parentElement.parentElement.parentElement.children[2].children[0];
        console.log(itemPrice.value);
        var itemSubPrice = buttonClicked.parentElement.parentElement.parentElement.children[4].children[0];
        var newDecrementValue = parseInt(quantity.value) - 1;
        if (newDecrementValue == 0) {
            return;
        }
        var newinputSubPrice = parseFloat(itemPrice.value) * newDecrementValue;
        itemSubPrice.value = newinputSubPrice.toFixed(2);
        quantity.value = newDecrementValue;
        overallSubtotal = 0;
        if (subtotal.length == undefined) {
            overallSubtotal = parseFloat(subtotal.value) + overallSubtotal
        } else {
            for (var i = 0; i < subtotal.length; i++) {

                overallSubtotal = parseFloat(subtotal[i].value) + overallSubtotal;

            }
        }
        setSubTotal.value = overallSubtotal.toFixed(2);
        setTotalValue.value = (parseFloat(setDelivery.value) + parseFloat(setSubTotal.value)).toFixed(2)

    })
}






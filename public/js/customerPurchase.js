


let ratingButton = document.querySelectorAll(".rating");
for (var i = 0; i < ratingButton.length; i++) {
    ratingButton[i].addEventListener("click", (e) => {
        let ratingParent = e.target.parentElement.children[5];//selecting main parent of arrow
        console.log(ratingParent);
        ratingParent.classList.toggle("active");

    });

}


let ratingCloseBtn = document.querySelectorAll(".close-btn");
for (var i = 0; i < ratingCloseBtn.length; i++) {
    ratingCloseBtn[i].addEventListener("click", (e) => {
        let ratingCloseParent = e.target.parentElement.parentElement;//selecting main parent of arrow

        ratingCloseParent.classList.remove("active");

    });

}



var pendPrduct = document.getElementById("pendingProduct");
var completedProduct = document.getElementById("completedProduct");
var shipProduct = document.getElementById("shipProduct");
pendPrduct.style.display = 'block';
var btn = document.getElementById("btn");
function pendingProd() {

    pendPrduct.style.display = 'block';
    completedProduct.style.display = 'none';
    shipProduct.style.display = 'none';

    btn.style.left = "35.7%";
    btn.style.width = "20.5%";
}
function shipProd() {

    pendPrduct.style.display = 'none';
    completedProduct.style.display = 'none';
    shipProduct.style.display = 'block';

    btn.style.left = "56.4%";
    btn.style.width = "20.5%";
}

function completeProd() {

    pendPrduct.style.display = 'none';
    completedProduct.style.display = 'block';
    shipProduct.style.display = 'none';

    btn.style.left = "76.8%";
    btn.style.width = "20.5%";

}








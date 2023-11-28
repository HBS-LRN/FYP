// const RankNav = document.getElementById("RankNav");
// const reviewToUpBtn = document.getElementById("reviewToUp");
// const reviewToDownBtn = document.getElementById("reviewToDown");
// const commentBtn = document.getElementsByClassName("adminCommentBox");

// const rankBox = document.getElementsByClassName("rank");
// const adminCommentBoxBtn = document.getElementsByClassName("adminCommentBox");
// const commentdisplayBox = document.getElementsByClassName("commentdisplayBox");
// const rankPageButton = document.querySelectorAll(".rankButton");



// let qtyValue = 1;
// const MealOrderQtyShow = document.getElementById("MealOrderQty");
// const addToCartBtn = document.getElementById("addToCart");
// const open_btn = document.querySelector('.item');

// const pageR5 = document.getElementById("rank5B");
// const pageR4 = document.getElementById("rank4B");
// const pageR3 = document.getElementById("rank3B");
// const pageR2 = document.getElementById("rank2B");
// const pageR1 = document.getElementById("rank1B");

// const qtyReview5 = document.getElementById("rank5");
// const qtyReview4 = document.getElementById("rank4");
// const qtyReview3 = document.getElementById("rank3");
// const qtyReview2 = document.getElementById("rank2");
// const qtyReview1 = document.getElementById("rank1");


// for (let index = 0; index < adminCommentBoxBtn.length; index++) {
//     commentdisplayBox[index].style.display = "none";
//     adminCommentBoxBtn[index].addEventListener("click", function () {
//         if (commentdisplayBox[index].style.display == "none") {
//             commentdisplayBox[index].style.display = "block";
//         } else {
//             commentdisplayBox[index].style.display = "none";
//         }
//     });

// }
// const additionalList = document.getElementById('additionalList');
// reviewToUpBtn.addEventListener("click", function () {
//     RankNav.style.display = "block";
//     reviewToUpBtn.style.display = "none";
//     reviewToDownBtn.style.display = "flex";
//     additionalList.style.top = '3%';
//     additionalList.style.height = '70%';

//     for (let index = 0; index < rankBox.length; index++) {
//         rankBox[index].style.minHeight = "495px";
//         rankBox[0].style.display = "block";

//     }

// });
// reviewToDownBtn.addEventListener("click", function () {
//     RankNav.style.display = "none";
//     reviewToUpBtn.style.display = "flex";
//     reviewToDownBtn.style.display = "none";
//     additionalList.style.top = '65%';
//     additionalList.style.height = '25%';
//     for (let index = 0; index < rankBox.length; index++) {
//         rankBox[index].style.minHeight = "130px";
//         rankBox[index].style.display = "none";

//     }

// });
// function rankPageChangeFunction(x) {
//     switch (x) {
//         case 1:
//             if (parseInt(qtyReview5.innerHTML) > 0) {
//                 pageR5.style.display = "block";
//                 pageR4.style.display = "none";
//                 pageR3.style.display = "none";
//                 pageR2.style.display = "none";
//                 pageR1.style.display = "none";

//             }

//             break;
//         case 2:
//             if (parseInt(qtyReview4.innerHTML) > 0) {
//                 pageR5.style.display = "none";
//                 pageR4.style.display = "block";
//                 pageR3.style.display = "none";
//                 pageR2.style.display = "none";
//                 pageR1.style.display = "none";
//             }

//             break;
//         case 3:
//             if (parseInt(qtyReview3.innerHTML) > 0) {
//                 pageR5.style.display = "none";
//                 pageR4.style.display = "none";
//                 pageR3.style.display = "block";
//                 pageR2.style.display = "none";
//                 pageR1.style.display = "none";
//             }
//             break;
//         case 4:
//             if (parseInt(qtyReview2.innerHTML) > 0) {
//                 pageR5.style.display = "none";
//                 pageR4.style.display = "none";
//                 pageR3.style.display = "none";
//                 pageR2.style.display = "block";
//                 pageR1.style.display = "none";
//             }
//             break;
//         case 5:
//             if (parseInt(qtyReview1.innerHTML) > 0) {
//                 pageR5.style.display = "none";
//                 pageR4.style.display = "none";
//                 pageR3.style.display = "none";
//                 pageR2.style.display = "none";
//                 pageR1.style.display = "block";

//             }
//             break;
//         default:
//             break;
//     }
// }




// addToCartBtn.addEventListener("click", popupWindowFunction());
// function popupWindowFunction() {
//     Swal.fire({
//         title: 'Adding this meal inside your order cart?',
//         text: "You won't be able to revert this!",
//         icon: 'question',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Reserve'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             Swal.fire(
//                 'Added',
//                 'Your Meal have been sent.',
//                 'success',
//                 MealOrderQtyShow.style.display = "initial",
//                 popup.style.display = 'none'
//             )
//         } else {
//             popup.style.display = 'none';
//         }
//     })
// }
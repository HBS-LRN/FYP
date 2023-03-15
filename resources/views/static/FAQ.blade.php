<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>
    <link rel="stylesheet" href="../css/FAQ.css">
    <div class="FAQHeader">
        <div class="FAQBar"></div>
        <span class="FAQ">F&Q</span>
    </div>

    <section>
        <div class="container">
            <div class="question">
                <i class="fas fa-plus arrow"></i>How do I check on an food order I have placed?
                <div class="answer">
                    <p>
                        You can check the status of your food order online. Alternatively you may contact our Customer
                        Service Team on <a href="tel:03 6263 5859" class="mailtoHref">03 6263 5859</a> or email us at <a
                            href="mailto:GrandImperialGroup@gmail.com"
                            class="mailtoHref">GrandImperialGroup@gmail.com</a>
                        .Please provide your order number when making enquiries.
                    </p>
                </div>
            </div>
            <div class="question">
                <i class="fas fa-plus arrow"></i>Do you accept international orders?
                <div class="answer">
                    <p>
                        We're sorry Grand Imperial Group only delivers online orders to Malaysia addresses.
                    </p>
                </div>
            </div>
            <div class="question">
                <i class="fas fa-plus arrow"></i>Does anyone else see the information that I provide to Grand Imperial
                Group
                <div class="answer">
                    <p>
                        We respect your privacy. The information you provide will not be given to any third party
                        without your express consent.
                        Read our Privacy Policy for additional information
                    </p>
                </div>
            </div>

            <div class="question">
                <i class="fas fa-plus arrow"></i>What should I do if I have a complaint?
                <div class="answer">
                    <p>
                        Please visit the "Contact Us" section if you have a complaint, or e-mail <a
                            href="mailto:GrandImperialGroup@gmail.com"
                            class="mailtoHref">GrandImperialGroup@gmail.com</a>
                    </p>

                </div>
            </div>
            <div class="question">
                <i class="fas fa-plus arrow"></i>What should I do when I forget password?
                <div class="answer">
                    <p>

                        You are required to click on "Forget Password?" In the register page, then you can retrive back
                        your password by providing your email address and the code given.
                    </p>

                </div>
            </div>
            <div class="question">
                <i class="fas fa-plus arrow"></i>Can I cancel the item that have been ordered?
                <div class="answer">
                    <p>
                        Yes, You are absolute welcome to do so if the items are not confirmed by Our System ！
                    </p>

                </div>
            </div>
            <div class="question">
                <i class="fas fa-plus arrow"></i>You still have any doubts?
                <div class="answer">
                    <p>
                        It is very sorry that we are not able to even clear your doubts in the F.A.Q page. Kindly send
                        us an email to <a href="mailto:GrandImperialGroup@gmail.com"
                            class="mailtoHref">GrandImperialGroup@gmail.com</a> in order for us to clear your doubts.
                    </p>

                </div>
            </div>
        </div>
    </section>

    <script>
        let arrow = document.querySelectorAll(".arrow");

        for (var i = 0; i < arrow.length; i++) {
            arrow[i].addEventListener("click", (e) => {
                let arrowParent = e.target.parentElement;
                console.log(arrowParent)
                arrowParent.classList.toggle("showAnswer");
            });
        }
    </script>

</x-layout-customer>

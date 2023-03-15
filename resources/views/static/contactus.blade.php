<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>
    <link rel="stylesheet" href="../css/contactUS.css">
    <style>
        .Ourlocation {
            display: flex;
            justify-content: center;
        }

        .Ourlocation iframe {
            margin-top: 30px;
            margin-left: 0px;
            box-shadow: 0px 0px 5px rgb(255, 255, 255);
            width: 170vh;
            height: 80vh;
        }

        .companyContent {
            color: rgb(143, 143, 143);
            font-weight: bolder;
        }

        .info {
            margin-left: 150px;
            margin-top: 50px;
            margin-bottom: 100px;
        }
    </style>
    <div class="all">
        <div class="contactUsBar"></div>
        <span class="contactUs">Contact Us</span>
    </div>

    <div class="form">



        <div class="Ourlocation">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.534024663618!2d101.72677241475746!3d3.2162247976583376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc3843bfb6a031%3A0x2dc5e067aae3ab84!2z5ouJ5pu85aSn5a2m5a2m6Zmi!5e0!3m2!1szh-CN!2smy!4v1631079753794!5m2!1szh-CN!2smy"
                allowfullscreen loading="lazy"></iframe>
        </div>

        <div class="info">
            <div class="flex">
                <div class="companyName">Grand Imperial Group</div>
                <br>
                <div class="companyContent">
                    Kampus Utama, Jalan Genting Kelang,<br>
                    53300 Kuala Lumpur, <br>
                    Wilayah Persekutuan Kuala Lumpur<br>
                    <br>
                    Phone : +6011-9074322<br>
                    Email : GrandImperial@gmail.com<br><br>

                    <br>
                    <div class="operation">OPERATION HOUR<br><br></div>
                    Weekday : 9.30AM - 6PM<br><br>
                    Saturday : 9.30AM - 1PM<br>

                </div>
                <div><img src="../image/GrandImperialGroupLogoSmall.png" alt=""></div>
            </div>
        </div>


    </div>
    <br>

</x-layout-customer>

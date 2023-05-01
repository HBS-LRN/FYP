<!DOCTYPE html>
<html lang="en">

<head>
<title>Franchis Gifts</title>
<link rel="stylesheet" type="text/css" href="style.css">
    <style>
        h1.franchish1 {
			text-align: center;
			font-size: 2.5em;
			font-family: Arial, sans-serif;
			color: #333;
			margin-top: 50px;
			margin-bottom: 50px;
			text-shadow: 1px 1px #ccc;
		}

        header {
	        background-color: #ffffff;
	        box-shadow: 0 2px 2px lightgrey;
	        text-align: center;
        }

        header img {
	        width: 100%;
	        height: 150px;
        }

        div.desc{  
            font-size: 16px;
            font-weight: bold;
            font-family: Rockwell, serif;
            color: #333;
            text-align: center;
            padding: 30px;
            border: 2px solid #333;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .gallery {
           display:flex;
            text-align:center;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 20px;
            width:100%;
        }

        body{
            background-image:url("../image/wallbg.jpg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }

        .gallery-item {
            position: relative;
            margin:20px;
        }

        .gallery-item img {
            width:370px;
            height: 380px; 
        }

        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 0.8s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8);
            cursor: pointer;
        }

        .overlay:hover {
            opacity: 1;
        }

        .modal {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            color: #fff;
        }

        .modal img {
            width: 370px;
            height: 310px;
        }

        .modal p {
            max-width: 300px;
            text-align: center;
            margin:10px;
            font-family: Arial, sans-serif;
        }

        p.giftname{
            font-weight:bold;
            font-family: "Bodoni MT", serif;
            font-size:22px;
        }

        footer {
            margin-top:50px;
	        background-color: black;
	        text-align: center;
	        padding: 20px;
           
        }

        footer p {
	        font-size: 14px;
	        color: white;
	        margin: 0;
        }
    </style>
</head>

<body>

<header>
	<img src="../image/franchisheader.jpg" alt="Header Image">
</header>

<div class="content">
<h1 class="franchish1">Franchis Gifts</h1>

<div class="desc">
Franchis Gifts is a leading free gift supplier that provides high-quality and unique gift items to businesses, including restaurants. We specialize in providing free gifts to restaurants, helping them to increase customer satisfaction and loyalty. Our gift items are carefully selected to match the style and personality of your restaurant, and we ensure that they are of the highest quality. Our team of experts is dedicated to delivering outstanding customer service and support to our clients, making the entire process of ordering and receiving your free gifts as seamless as possible. Whether you're looking for branded merchandise or custom-made items, Franchis Gifts is your go-to supplier for all your free gift needs.
</div>

<div class="gallery">
  @foreach($freeGifts as $freeGift)
  <div class="gallery-item">
    <img src="../image/secretgift1.png" alt="Frachis Secret Gift">
    <div class="overlay">
      <div class="modal">
        <img src="../{{$freeGift['image']}}" alt="Gift Image">
        <p>{{$freeGift['description']}}</p>
      </div>
    </div>
    <p class="giftname">{{$freeGift['name']}}</p>
  </div>
  @endforeach
</div>

</div>
</body>

<footer>
		<p>&copy; 2023 Powered by Franchis&#8482</p>
</footer>
</html>
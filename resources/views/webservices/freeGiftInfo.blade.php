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
            background-color:#FFFFD8;
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
        }

        footer {
            margin-top:50px;
	        background-color: lightgrey;
	        text-align: center;
	        padding: 20px;
           
        }

        footer p {
	        font-size: 14px;
	        color: #333333;
	        margin: 0;
        }
    </style>
</head>

<body>

<header>
	<img src="../image/franchisheader.jpg" alt="Header Image">
</header>

<h1 class="franchish1">Franchis Gifts</h1>


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
  


</body>

<footer>
		<p>&copy; 2023 Powered by Franchis&#8482</p>
</footer>
</html>
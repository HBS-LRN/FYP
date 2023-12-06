<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
              
        .textCenter{
        	background-color:rgb(225, 245, 240);
            float:left;
            padding:20px 20px;
            border-radius:6px;
            margin:20px;
        }
        .buttonBox{
        	margin:10px 20px;
        }
        .buttonBox a{
           text-decoration:none;
		   color:white;
           background-color:blue;
		   padding:10px 20px;
		   border-radius:5px;
        }
		.buttonBox a:hover{
        background-color:rgb(70, 106, 255);
        }
    </style>
</head>
<body>
<p>
    Hi {{ $reservationData['cust_name'] }},
</p>
<b>Thank you for your reservation, Here is your reservation information:</b>
<div class="textCenter">
<h1>Grand Imperial Restaurant Reservation Information:</h1>
<hr/>
    <p>Table number: <b>{{$reservationData['table_id']}}</b></p>
    <p>Pax: <b>{{$reservationData['pax']}}</b></p>
    <p>Reservation date: <b>{{$reservationData['reservation_date']}}</b></p>
    <p>Reservation time session: <b>{{$reservationData['reservation_time']}}</b></p>
</div>

<p class="buttonBox">
    <a href="{{ url('http://localhost:3000/register') }}">Register Account?</a>
</p>
</body>
</html>

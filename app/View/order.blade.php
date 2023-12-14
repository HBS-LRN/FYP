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
        Hi {{ $order['user_name'] }},
    </p>
    <b>Thank you for your order. Here is your order information:</b>

    <div class="textCenter">
        <h1>Order Information:</h1>
        <hr />
        <p>Order ID: <b>OD{{ $order['order_id'] }}#</b></p>
        <p>Order Total: <b>RM{{ $order['order_total'] }}</b></p>
        <p>Order Date: <b>{{ $order['order_date'] }}</b></p>

        <h2>Meal Details:</h2>
        <ul>
            @foreach ($meal as $item)
            <li>
                <strong>{{ $item['meal_name'] }}</strong>
                <br>
                Price:RM {{ $item['meal_price'] }}, Quantity: {{ $item['order_quantity'] }}
            </li>
            @endforeach
        </ul>
    </div>

    <p class="buttonBox">
        <a href="{{ url('http://localhost:3000/register') }}">Register Account?</a>
    </p>
</body>
</html>

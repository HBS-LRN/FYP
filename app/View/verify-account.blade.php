<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .textCenter{
            text-align:center;
            font-weight: bold;
        }
        .textCenter a{
           text-decoration:none;
		   color:white;
           background-color:blue;
		   padding:10px 20px;
		   border-radius:5px;
        }
		.textCenter a:hover{
        background-color:rgb(70, 106, 255);
        }
    </style>
</head>
<body>
<p>
    Hi {{ $user->name }},
</p>

<p class="textCenter">
    Thank you for joining our member! Please click the following link to verify your account:
</p>

<p class="textCenter">
    <a href="{{ url('http://localhost:3000/verifyAccount/'.$user->id) }}">Verify Your Account</a>
</p>
</body>
</html>

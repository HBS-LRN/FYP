<!DOCTYPE html>
<html>
    <head>
        <title>Error {{ $code }} - {{ $message }}</title>
        <style>
            html{
                background-color:lightcyan;
            }

            div.back{
                display:table;
                margin:auto;
            }

            img#error{
                width:70%;
                height:35%;
                display:table;
                margin:25px auto;
            }

            a.redirect{
                padding:15px;
                text-decoration:none;
                background-color:#f5eb64;
                font-size:15px;
                font-weight:bold;
                font-family: Arial, sans-serif;
                color:black;
                margin:10px 20px;
                border-radius:20px;
                border:1px solid yellow;
            }

            a.redirect:hover{
                background-color:white;
                font-size:18px;
            }

            div.errormsg{
                display:table;
                margin:10px auto;
                text-align:center;
                font-size:15px;
                font-weight:bold;
                font-family:Arial,san-serif;
            }

        </style>
    </head>
    <body>
        <img id="error" src="../image/500error.png">
        <div class="errormsg">
            <p>Oops ... There was a server error ! Bad things had happened . <br/>
                Try to refresh this page or feel free to contact us if the problem persists !</p>
        </div>
        <div class="back">
            <a href="/" class="redirect">< Home Page</a>
            <script>
            document.write('<a class="redirect" href="' + document.referrer + '"> < Previous Page </a>');
            </script>
        </div>
    </body>
</html>
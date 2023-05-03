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
                height:50%;
                display:table;
                margin:50px auto;
            }

            a.redirect{
                padding:20px;
                text-decoration:none;
                background-color:#f5eb64;
                font-size:15px;
                font-weight:bold;
                font-family: Arial, sans-serif;
                color:black;
                margin:25px;
                border-radius:20px;
                border:1px solid yellow;
            }

            a.redirect:hover{
                background-color:white;
                font-size:18px;
            }

        </style>
    </head>
    <body>
        <img id="error" src="../image/404error.jpg">
        <div class="back">
            <a href="/" class="redirect">< Home Page</a>
            <script>
            document.write('<a class="redirect" href="' + document.referrer + '"> < Previous Page </a>');
            </script>
        </div>
    </body>
</html>
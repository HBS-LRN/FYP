<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">

    <title>Invoice</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

    <style>
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }
    </style>

</head>

<body class="login-page" style="background: white">
    <x-flash-message />
    <div>
        <div class="row">
            <div class="col-xs-7">
                <h4>From:</h4>
                <strong>Grand Imperial Group</strong><br>
                Lot 6 . 39 . 00, 168<br>
                Jalan Bukit Bintang, Bukit Bintang <br>
                55100 Kuala Lumpur<br>

                <br>
            </div>

            <div class="col-xs-4">

            </div>
        </div>

        <div style="margin-bottom: 0px">&nbsp;</div>

        <div class="row">
            <div class="col-xs-6">
                <h4>To:</h4>
                <address>
                    <strong>{{ auth()->user()->name }}</strong><br>
                    <span>{{ $deliveryAddress->street }}</span> <br>
                    <span>{{ $deliveryAddress->postcode }} {{ $deliveryAddress->area }}</span>
                </address>
            </div>

            <div class="col-xs-5">

                <div style="margin-bottom: 0px">&nbsp;</div>

                <table style="width: 100%; margin-bottom: 20px">

                </table>
            </div>
        </div>

        <table class="table" style="width:100%">
            <thead style="background: #6c9bf1;">
                <tr>
                    <th style="width:50%">Item</th>
                    
                    <th style="width:50%">Quantity</th>
                    <th style="width:50%">Member Point Cost</th>
                </tr>
            </thead>
            <tbody>


              
                    <tr>
                        <td>
                            <div><strong>{{ $selectedGift['product_name'] }}</strong></div>
                        </td>
                        <td class="text-center">{{ $quantity }}</td>
                        <td class="text-right">{{ $selectedGift['memberPoint_cost'] * $quantity }} Points</td>
                    </tr>
            </tbody>
        </table>

        <div class="row">
            <div class="col-xs-6"></div>
           
        </div>

        <div style="margin-bottom: 0px">&nbsp;</div>

        <div class="row">
            <div class="col-xs-8 invbody-terms">
                Thank you. <br>
                <br>
                <h4>Delivery Terms</h4>
                <p>Your Membership point has been deducted and Your Item Will Be Delivered On 3 Days,<br> Plase Call
                    03-61501578 if your item has not been delivered </p>
            </div>
        </div>
    </div>

</body>

</html>

<head>
<link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <style>
        .detailBtnBox{
            padding: 20px 70px;
        }

        .detailBtnBox .orderDetail {
             border: 1px solid black;
             border-radius: 5px;
             background-color: #95adbe;
             color: white;
             width: 100%;
             font-size: 15px;
             height: 30px;
         }
        .table-striped thead .OrderListTr{
            background-color: rgb(165, 200, 245);
        }

        .delete {
            margin-top:10px;
        }
         .row .col-md-6 .dataTables_filter {
            padding-left:110px;
        }
        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }
    </style>
</head>
<body>
    <div class="box">
        <div>
            <h2>List Of Orders
            </h2>
        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">
                <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->
                
                <table id="example" class="table table-striped">
                    <thead>
                        <tr class="OrderListTr" style="background-color: rgb(165, 200, 245);">
                            <th width="10%">Order No</th>
                            <th width="15%">Customer ID</th>
                            <th width="25%">Order Date & Time</th>
                            <th width="10%">Price(RM)</th>
                            <th width="10%">Payment Method</th>
                            <th width="10%">Status</th>
                            <th width="15%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="search">          
                        @foreach($orders as $order)

                                <tr>
                                    <td style="border:1px solid grey;"><a href="orderDetails/show/{{$order->id}}"><label for="lblOrderNumber">{{$order->id}}</a></label></td>
                                    <td style="border:1px solid grey;"><label for="lblCustomerID">{{$order->user_id}}</label></td>
                                    <td style="border:1px solid grey;"><label for="lblOrderDate">{{$order->order_date}}</label></td>
                                    <td style="border:1px solid grey;"><label for="lblOrderTotal">{{number_format($order->order_total, 2)}}</label></td>
                                    <td style="border:1px solid grey;"><label for="lblPaymentMethod">{{$order->payment_method}}</label></td>
                                    <td id="result" style="color: red; border:1px solid grey;"><label for="lblOrderStatus">{{$order->order_status}}</label></td>
                                    <td class="detailBtnBox" style="border:1px solid grey;">
                                        <button id="btnOrderDetail" class="orderDetail"  OnClick="redirectToOrderController({{$order->id}})">Order Detail</button>
                                        
                                    </td>

                                </tr>
                     
                        @endforeach

                    </tbody>

                </table>
               
            </div>
        </div>
    </div>
</body>

<script>
    function redirectToOrderController(orderID) {
    var url = '{{ route("orderDetails.show", ":id") }}';
    url = url.replace(':id', orderID);
    window.location.href = url;
    }

    $(document).ready(function () {
    $('#example').DataTable();
    });
</script>


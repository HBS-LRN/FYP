<head>
<link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    <style>
          .swal-wide {
            width: 512px !important;
            height: 333.98px !important;
            padding: 0.8em 1em 0 !important;
            color: #595959 !important;
            font-size: 1.03em !important;
            font-weight: 300 !important;
            text-align: center !important;
            text-transform: none !important;
        }
        
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

          .scroll-wrap {
            overflow: auto;
            height: 230px;
        }

        .box4 {
            margin-bottom: 400px;
            min-height: 550px;
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

        .titleorders{
    font-size: 40px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
}
    </style>
</head>
<body>
<div class="Pagebody">
    
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <div>
            <h2 class="titleorders">List Of Orders
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


<head>

<link rel="stylesheet" href="../../css/OrderDetail.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <style>
        .scroll-wrap {
            overflow: auto;
            height: 400px;
        }

        .td .img {
            width: 200px;
            height: 200px;
        }
        
        .completedOrder {
            color: white;
            font-weight: bold;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #12bddb;
            margin-right: -15px;
            padding: 5px 10px;
        }

        .deliveredOrder {
        
            color: white;
            font-weight: bold;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #1270db;
            margin-right: -15px;
            padding: 5px 10px;
        }
        .detail_cont {
            width: 655px;
            display: grid;
            grid-template-columns: 60% 100%;
            text-align: justify;
            margin-left: 50px;
            margin-top: 0px;
            
        }

        .details {
            float: left;
        }

        .cal {
            text-align: left;
            padding-left:300px;
        }
        .name_cust div:nth-child(2) {
            padding-right:10px;
            float:right;
            
        }
        .scroll-wrap {
            overflow:auto;
            height:530px;
        }
        .scroll-wrap .sortable {
        margin:0px 40px;
        }

    </style>
</head>
    <div class="Pagebody">
        <div class="content">
            <div class="title-container">
                <h1 class="Prodtitle">Product Order Detail</h1>
                <div class="add_content">
                    <div class="cust_cont">
                        <div class="name_cust">
                            <div class="title">
                                <h1>Order Number : <label for="lblOrderNumber">{{$order->id}}</label></h1>
                            </div>
                            <div>
                                <span>Customer ID : <label for="lblCustomerID">{{$order->user_id}}</label><br />
                                </span>
                            </div>
                        </div>
                        
                        <div class="auto-style2">
                            <input type="hidden" name="hiddenOrderNumber" value="{{$order->id}}" />
                            @if ($order->order_status == "preparing")
                            <button id="btnDelivered" class="deliveredOrder" OnClick="redirectToDeliveryClick({{$order->id}})">Click Here If Item Is Ready To Deliver</button>
                            @endif
                            @if($order->order_status == "delivering")
                            <button id="btnComplete" class="completedOrder" OnClick="redirectToCompletedClick({{$order->id}})">Click Here If Item Is Completely Delivered</button>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-wrap">
                <table class="sortable">
                    <tr class="tr">
                        <th class="th" width="3%">No</th>
                        <th class="th" width="15%">Image</th>
                        <th class="th" width="15%">Product</th>
                        <th class="th" width="8%">Price</th>
                        <th class="th" width="8%">Quantity</th>
                        <th class="th" width="8%">Total Price</th>
                        <th class="th" width="8%">Status</th>
                    </tr>
                    <tbody class="tbody" id="search">

                      @foreach($orderDetails as $key => $orderDetail)
                                <tr class="tr">

                                     <td class="td"> {{$key+1}}</td>
                                    <td class="td">
                                    <img class="img" src="{{ $orderDetail->Meal->meal_image ? asset('storage/' . $orderDetail->Meal->meal_image) : asset('/images/no-image.png') }}"
                                alt="" /></td>
                                       
                                    <td class="td">
                                        <label for="lblItemName">{{ $orderDetail->Meal->meal_name}}</label></td>
                                    <td class="td">RM
                                        <label for="lblItemPrice">{{ number_format($orderDetail->Meal->meal_price,2)}}</label></td>
                                    <td class="td">
                                        <label for="lblQuantity">{{ $orderDetail->order_quantity}}</label></td>
                                    <td class="td">RM{{number_format($orderDetail->Meal->meal_price * $orderDetail->order_quantity,2)}}</td>
                                    <td class="td" id="result">{{$orderDetail->meal_order_status}}</td>
                                </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <div class="detail_cont">
                <div class="details">
                    <span>Ordered Date And Time : <b>
                        <label for="lblOrderDate">{{$order->order_date}}</label></b></span><br>
                    <span>Payment Method :<b><label for="lblPaymentMethod">{{$order->payment_method}}</label></b></span>

                </div>
                <div class="cal">
                    <span>Delivery Fee : <b><label for="lblDeliveryFee">{{$order->delivery_fee}}</label></b></span><br/>
                    
                    <span>Overall Price : <b><label for="lblOverallPrice">{{$order->order_total}}</label></b></span><br/>

                     <span>Delivery To : <b><label for="lblDeliveryAddress">{{$order->Delivery->street}}, {{$order->Delivery->postcode}}, {{$order->Delivery->area}}</label></b></span>
                </div>
            </div>

        </div>

    </div>
    <script>
    function redirectToDeliveryClick(orderID) {
    var url = '{{ route("order.Delivering", ":id") }}';
    url = url.replace(':id', orderID);
    window.location.href = url;
    }
    
    function redirectToCompletedClick(orderID) {
    var url = '{{ route("order.Completed", ":id") }}';
    url = url.replace(':id', orderID);
    window.location.href = url;
    }
</script>






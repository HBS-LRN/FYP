<head>
    <link rel="stylesheet" href="../css/OrderDetail.css">
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
                            <button id="btnDelivered" class="deliveredOrder" OnClick="OrderDetailDelivery_Click">Click Here If Item Is Ready To Deliver</button>
                            <button id="btnComplete" class="completedOrder" OnClick="OrderDetailCompleted_Click">Click Here If Item Is Completly Delivered</button>
                
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
                                    <img class="img" src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                alt="" /></td>
                                       
                                    <td class="td">
                                        <label for="lblItemName">Text='<%# Eval("Meal.meal_Name")</label></td>
                                    <td class="td">RM
                                        <label for="lblItemPrice">Text='<%#Eval("Meal.meal_regular_price","{0:F2}")</label></td>
                                    <td class="td">
                                        <label for="lblQuantity">Text='<%#Eval("order_qty")</label></td>
                                    <td class="td">RM<%# string.Format("{0:0.00}", Convert.ToDouble(Eval("Meal.meal_regular_price")) * Convert.ToInt32(Eval("order_qty")))%></td>
                                    <td class="td" id="result">{{$order->order_status}}</td>
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

                     <span>Delivery To : <b><label for="lblDeliveryAddress">{{$order->payment_method}}</label></b></span>
                </div>
            </div>

        </div>

    </div>
     



     <!--//prompt the edited suceffuly data using sweertalert -->
         <%if (Session["successfullyUpdate"] != null)
                    {%>
                <div class="update-meesage" data-flashdata='<%=Session["successfullyUpdate"]%>'></div>
                <%Session.Remove("successfullyUpdate"); %>
                <%}%>

    <script src="../JavaScript/sweetalert2.all.min.js"></script>
    <script src="../JavaScript/jquery-3.6.0.min.js"></script>
     <script src="../JavaScript/popup.js"></script>
    <script src="http://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>
</asp:Content>

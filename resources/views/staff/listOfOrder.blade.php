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
                        <asp:ListView ID="lvCustomerOrder" runat="server" ItemType="Assignment.Models.Order" DataKeyNames="order_number" SelectMethod="BindCustomerOrderList">
                            
                            <ItemTemplate>

                                <tr>
                                    <td style="border:1px solid grey;"><a href="../staff/ListOfOrderDetail.aspx?orderNumber=<%#Eval("order_number") %>"></a><%#Eval("order_number") %></td>
                                    <td style="border:1px solid grey;"><asp:Label ID="lblCustomerID" runat="server" Text='<%# Eval("customer_ID") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;"><asp:Label ID="lblOrderDate" runat="server" Text='<%# Eval("order_dateTime") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;"><asp:Label ID="lblOrderTotal" runat="server" Text='<%# Eval("order_total","{0:F2}") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;"><asp:Label ID="lblPaymentMethod" runat="server" Text='<%# Eval("payment_method") %>'></asp:Label></td>
                                    <td id="result" style="color: red; border:1px solid grey;"><asp:Label ID="lblOrderStatus" runat="server" Text='<%# Eval("order_status") %>'></asp:Label></td>
                                    <td class="detailBtnBox" style="border:1px solid grey;">
                                        <asp:Button ID="btnOrderDetail" runat="server" Text="Order Detail" class="orderDetail" OnClick="OrderDetail_Click" CommandArgument='<%#Eval("order_number") %>'/>
                                        
                                    </td>

                                </tr>
                     


                    </tbody>

                </table>
               
            </div>
        </div>
    </div>
</body>

    <script>
        $(document).ready(function () {
            $('#example').DataTable();
        });
    </script>


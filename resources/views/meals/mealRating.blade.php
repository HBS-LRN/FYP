<head>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css ">
    <style>
        .edit {
            padding: 5px 20px;
            margin: 10px 30px;
        }

        .wrapStar {
            display: flex;
        }

        .mealRatingTr {
            background-color: rgb(165, 200, 245);
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
            <h2>Manage Meal Rating
            </h2>
        </div>
        <br />
        <br />

        <div class="box4">
            <div class="scroll-wrap">
                <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->

                <table id="example" class="table table-striped">

                    <thead>
                        <tr class="mealRatingTr" style="background-color: rgb(165, 200, 245);">

                            <th width="10%">Order Number</th>
                            <th width="18%">Customer ID</th>
                            <th width="20%">Product</th>
                            <th width="12%">Rating</th>
                            <th width="25%">Comment</th>
                            <th width="10%">Action</th>
                        </tr>

                    </thead>
                    <tbody id="search">
                        <!-- <asp:ListView ID="lvOrderDetail" runat="server" ItemType="Assignment.Models.MealOrderDetail" DataKeyNames="order_detail_number" SelectMethod="BindOrderDetailListComment"> -->

                            <!-- <ItemTemplate> -->
                                <tr style="border: 1px solid grey;">
                                    <td style="border: 1px solid grey;">
                                        <label for="lblOrderID"  Text='<%# Eval("order_number") %>'></label></td>
                                    <td style="border: 1px solid grey;">
                                        <label for="lblCustomerID" Text='<%# Eval("Order.customer_ID") %>'></label></td>
                                    <td style="border: 1px solid grey;">
                                        <label for="lblItemName" Text='<%# Eval("Meal.meal_Name") %>'></label></td>
                                    <!-- <asp:HiddenField ID="hiddenOrderDetailNumber" runat="server" Value='<%#Eval("order_detail_number") %>' /> -->

                                    <td style="border: 1px solid grey;">

                                        <div class="wrapStar">
                                            <div>
                                                <i class="fa fa-star checked" id="fa-star1"></i>
                                            </div>

                                            <div id="rate2" runat="server" visible='<%# ShowRating2Star(Eval("order_detail_number")) %>'>
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                            <div id="rate3" runat="server" visible='<%# ShowRating3Star(Eval("order_detail_number")) %>'>
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                            <div id="rate4" runat="server" visible='<%# ShowRating4Star(Eval("order_detail_number")) %>'>
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                            <div id="rate5" runat="server" visible='<%# ShowRating5Star(Eval("order_detail_number")) %>'>
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="border: 1px solid grey;">
                                        <label for="lblComment" runat="server" Text='<%# Eval("rating_comment") %>'></label></td>

                                    <td style="border: 1px solid grey; display: flex; justify-content: center; align-content: center; justify-items: center;"><a href="../staff/MealRatingEdit.aspx?orderDetailNumber=<%#Eval("order_detail_number") %>" class="edit">Reply</a></td>

                                </tr>
                            <!-- </ItemTemplate>
                        </asp:ListView> -->

                    </tbody>
                </table>



            </div>
        </div>
    </div>
    </body>

    <%if (Session["successfullyUpdate"] != null)
        {%>
    <div class="edit-message" data-editdata='<%=Session["successfullyUpdate"] %>'></div>
    <%Session.Remove("successfullyUpdate");%>
    <%}%>

    <script src="../JavaScript/jquery-3.6.0.min.js"></script>
    <script src="../JavaScript/sweetalert2.all.min.js"></script>
    <script src="../JavaScript/popup.js"></script>


    <script>
        $(document).ready(function () {
            $('#example').DataTable();
        });
        const editSuccess = $('.edit-message').data('editdata')
        if (editSuccess) {
            Swal.fire({
                title: "Message Has Been Reply To Customer",
                icon: "success",
                button: "OK",
            })
        }







    </script>

</asp:Content>

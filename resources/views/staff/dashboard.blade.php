

<head>
    <link rel="stylesheet" href="../css/staffDashBoard.css">

</head>

    <style>
        .scroll-wrap {
            overflow: auto;
            height: 500px;
        }

        .job_role {
            color: white;
        }
    </style>
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <div class="topBox">
            <div class="box1">

                <div>
                    <i class="fas fa-users"></i>
                </div>

                <div>
                    <h1>
                        1<!-- dynamic value -->
                    
                    </h1>

                    <p>
                        Customer
                    </p>
                </div>

            </div>

            <div class="box1">
                <div>
                    <i class="fas fa-shopping-cart"></i>
                </div>

                <div>
                    <h1>

                       2<!-- dynamic value -->
                    </h1>

                    <p>
                       Orders
                    </p>
                </div>



            </div>

            <div class="box1">

                <div>
                    <i class="far fa-comments"></i>
                </div>

                <div>
                    <h1>
                        3<!-- dynamic value -->

                    </h1>

                    <p>
                        Comments
                    </p>
                </div>



            </div>

            <div class="box1">

                <div>
                    <i class="fa fa-dollar"></i>
                </div>

                <div>
                    <h1>RM
                       4<!-- dynamic value -->
                    </h1>
                    <p>
                       Total Earning
                    </p>
                </div>


            </div>

        </div>

        <div class="box2">
            <div class="scroll-wrap">
                <h1>Today Orders
                            <!-- <button type="button">View All</button> -->
                    <input id="Search" type="text" placeholder="Search Here"
                        style="width: 200px; height: 40px; margin-left: 350px; border-radius: 5px;">
                </h1>
                <br>

                <table class="sortable">
                    <thead>
                        <tr>
                            <th>Customer ID</th>
                            <th>Product Name</th>
                            <th>Price & Order Quantity</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="search">
                   
                                <tr>

                                    <td>
                                      1 <!-- dynamic value -->
                                    <td>
                                      1  <!-- dynamic value -->
                                    <td>
                                      1 <!-- dynamic value -->
                                    <td>
                                      1 <!-- dynamic value -->

                                </tr>
                     





                    </tbody>
                </table>

            </div>
        </div>

        <div class="box3">
            <div class="scroll-wrap">
                <h1>Recent Customers
                </h1>
              
                        <div>
                            <asp:Image ID="Image1" runat="server" ImageUrl='<%# Eval("customer_Image") != null ? string.Format("data:Image/png;base64,{0}",Convert.ToBase64String((byte[])Eval("customer_Image"))) :""%>' Visible='<%#ShowCustomerImage(Eval("customer_ID")) %>' CommandArgument='<%#Eval("customer_ID") %>'/>

                            <br>
                            <h3>
                                <asp:Label ID="lblCustomerName" runat="server" Text='<%# Eval("customer_Name") %>'></asp:Label></h3>
                            <p>
                                <asp:Label ID="lblCustomerEmail" runat="server" Text='<%# Eval("customer_Email") %>'></asp:Label></p>
                        </div>
               





            </div>

        </div>

    </div>

    <script src="../JavaScript/jquery-3.6.0.min.js"></script>
    <script src="../JavaScript/sweetalert2.all.min.js"></script>
    <script>

        $(document).ready(function () {
            $("#Search").on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#search tr").filter(function () {
                    $(this).toggle($(this).text()
                        .toLowerCase().indexOf(value) > -1)
                });
            });
        });
    </script>



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
<div class="Pagebody">
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
                        {{ $customerCount }}

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

                        {{ $customerOrderCount }}
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

                        {{ $commentCount }}

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
                        {{ number_format($earning, 2) }}
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
                        @foreach ($customerOrders as $customerOrder)
                            <tr>

                                <td>
                                    {{ $customerOrder->order->user_id }}
                                <td>
                                    {{ $customerOrder->meal->meal_name }}
                                    <!-- dynamic value -->
                                <td>
                                    {{ number_format($customerOrder->meal->meal_price, 2) }} X
                                    {{ $customerOrder->order_quantity }}
                                    <!-- dynamic value -->
                                <td>
                                    {{ $customerOrder->meal_order_status }}
                                    <!-- dynamic value -->

                            </tr>
                        @endforeach




                    </tbody>
                </table>

            </div>
        </div>


        <div class="box3">
            <div class="scroll-wrap">
                <h1>Recent Customers
                </h1>
                @foreach ($customers as $customer)
                    <div>
                        @if (auth()->user()->image != null)
                            <img id="Image1" src="{{ asset('storage/' . $customer->image) }}" alt="" />
                        @else
                            <i class="fas fa-user"></i>
                        @endif
                        <br>
                        <h3>
                            <label id="lblCustomerName">{{ $customer->name }}</label>
                        </h3>
                        <p>
                            <label id="lblCustomerEmail">{{ $customer->email }}</label>
                        </p>
                    </div>
                @endforeach

            </div>

        </div>

    </div>
</div>


<script src="../JavaScript/jquery-3.6.0.min.js"></script>
<script src="../JavaScript/sweetalert2.all.min.js"></script>
<script>
    $(document).ready(function() {
        $("#Search").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#search tr").filter(function() {
                $(this).toggle($(this).text()
                    .toLowerCase().indexOf(value) > -1)
            });
        });
    });
</script>

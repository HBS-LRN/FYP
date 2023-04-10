<head>
    <link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <style>
      .image {
          height: 220px;
          width: 220px;
          margin-left: 26px;
      }
     .row .col-md-6 .dataTables_filter {
         padding-left:110px;
     }
     .row .col-md-7 .dataTables_paginate {
         padding-right: 30px;
     }
    </style>
</head>
    <div class="box">
        <div>

            <h2>Inventory Report -
                <label for="lblItemName">{{$meal->meal_name}}</label>
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">

                <table id="example" class="table table-striped">
                    <thead>
                        <tr style="background: rgb(165, 200, 245);">

                            <th width="10%">Date & Time</th>
                            <th width="10%">Product Price </th>
                            <th width="10%">Item Sold </th>
                            <th width="10%">Revenue</th>

                        </tr>
                    </thead>

                    <tbody id="search">
                      
                    @foreach($mealOrderDetails as $mealOrderDetail)
            
                                <tr style="border:1px solid grey;">
                                    <td style="border:1px solid grey;"><label for="lblOrderDateTime">{{$mealOrderDetail->Order->order_date}}</label></td>
                                    <td style="border:1px solid grey;"><label for="lblItemPrice">RM{{number_format($mealOrderDetail->Meal->meal_price,2)}} </label></td>
                                    <td style="border:1px solid grey;"><label for="lblQuantity"> {{$mealOrderDetail->order_quantity}}</label></td>
                                    <td style="border:1px solid grey;">RM{{number_format($mealOrderDetail->Meal->meal_price * $mealOrderDetail->order_quantity,2)}}</td>
                                </tr>                                   
                           
                    @endforeach
                   
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        <script>
        $(document).ready(function () {
            $('#example').DataTable();
        });
     
        </script>



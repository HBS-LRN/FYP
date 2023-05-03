
<head>
<link rel="stylesheet" href="../css/listOfMeal.css">
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    <style>
          
         
        table .addInv {
            background: rgb(83, 148, 233);
            color: white;
            font-size: 15px;
            border: 1px solid black;
            border-radius: 5px;
            width: 150px;
            margin: 10px;
            padding: 5px 20px;
        }
        .pagination{
            margin-top:30px;
            margin-right:32px;
            display:none;
        }
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
                padding:5px 10px;
                border: 1px solid black;
                border-radius: 5px;
                background-color: #95adbe;
                color: white;
                font-size: 15px;
                text-decoration:none;
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
            .titleOfOrder{
                font-size: 60px; 
                margin-left: 10px;
                margin-top:20px;
                margin-bottom:20px;
                text-align:center;
            }
            .box4{
                height: 80%;
            }
           
    </style>

</head>
<body>
    <div class="Pagebody">
  
        <x-layout-admin>
    </x-layout-admin>
    <div class="box">
                <div>
                    
                        <h2 class="titleOfOrder">
                            Meal Quantity Update
                        </h2>
                    
                </div>

                <br><br>

                <div class="box4">
                    <div class="scroll-wrap">
                    
                        <table id="example" class="table table-striped">
                            <thead>
                                <tr style="background-color: rgb(165, 200, 245);">
                                    <th width="5%">No</th>
                                    <th width="30%">Product Name</th>
                                    <th width="20%">Category</th>
                                    <th width="10%">Stock On Hand</th>
                                    <th width="15%">Action</th>
                                </tr>
                            </thead>
                            <tbody id="search">
                               
                                @foreach($meals as $key => $meal)
                            
                                <tr class="mealTr" style="border:1px solid grey;">
                                    <td class="no" style="border:1px solid grey;">
                                    {{$key+1}}     
                                     </td>

                                    <td style="border:1px solid grey;"><label for="lblProductName">{{$meal->meal_name}}</label></td>

                                    <td style="border:1px solid grey;"><label for="lblCategory">{{$meal->Category->name}}</label></td>
                                    
                                    <td style="border:1px solid grey;"><label for="lblQuantity">{{$meal->meal_qty}}</label></td>
                                   
                                    <td style="border:1px solid grey;"><a href="/editInventory/{{$meal->id}}" class="addInv">Update Stock</a></td>
                                  
                                    

                                </tr>
                        @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    </div>
    <script type="text/javascript">
                     $(document).ready(function () {
        $('#example').DataTable();
    });
                </script>
    </body>
    


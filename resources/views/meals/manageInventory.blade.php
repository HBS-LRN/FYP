
<head>
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
        .row .col-md-6 .dataTables_filter {
            padding-left:110px;
        }
        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }
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
    </style>
</head>
<body>
     <div class="box">
        <x-layout-admin>
    </x-layout-admin>
                <div>
                    
                        <h2>
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
    </body>
    


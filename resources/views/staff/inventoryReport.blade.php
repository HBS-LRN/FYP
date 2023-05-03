<head>
@inject('MealController','\App\Http\Controllers\MealController')
<link href="{{ asset('../css/listOfOrder.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/sweetalert2.all.min.js"></script>
    
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
   <style>
    .image {
        height: 120px;
        width: 120px;
        margin-left: 26px;
    }
 
    .row .col-md-6 .dataTables_filter {
        padding-left:110px;
    }
    .row .col-md-7 .dataTables_paginate {
        padding-right: 30px;
    }

   
    .scroll-wrap {
        overflow:auto;
        height: 530px;

    }
    .scroll-wrap::-webkit-scrollbar {
  width: 0;
  height:0;
}

.scroll-wrap::-webkit-scrollbar-track {
  background-color: transparent;
}

.scroll-wrap::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 1em;
}
    

    .prodsalesreport{
    font-size: 40px;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    }

    
    </style>
</head>
<div class="Pagebody">
     
     <x-layout-admin>
        </x-layout-admin>
        <div class="box">
            <div>
                    <h2 class="prodsalesreport">
                        Product Sales Report
                    </h2>
                
            </div>

            <br><br>

            <div class="box4">
                <div class="scroll-wrap">
                    

                    <table id="example" class="table table-striped sortable">
                        <thead>
                            <tr style="background: rgb(165, 200, 245);">
                                <th width="5%">No.</th>
                                <th width="15%" style="text-align:center; vertical-align: middle;">Product Image</th>
                                <th width="15%">Product Name</th>
                                <th width="10%">Product Stock In Hand</th>
                                <th width="10%">Product Price</th>
                                <th width="10%">Item Sold</th>
                                <th width="10%">Revenue</th>
                                <th width="10%">More Detail</th>
                            </tr>
                        </thead>
                        <tbody id="search">
                        @foreach($meals as $meal)
                        
                               <tr style="border:1px solid grey;">
                                   
                                    <input type="hidden" id="hiddenMealID" name="meal_id" value="{{$meal->id}}"/>

                                    <td style="border:1px solid grey;"><label for="lblId">{{$meal->id}}</label></td>
                               
                                    <td style="border:1px solid grey;"><img id="Image" src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                alt="" /></td>

                                    <td style="border:1px solid grey;"><label for="lblProductName">{{$meal->meal_name}}</label></td>
                              
                                    <td style="border:1px solid grey;"><label for="lblQuantity">{{$meal->meal_qty}}</label></td>
                                    <td style="border:1px solid grey;">RM{{number_format($meal->meal_price,2)}}</td>
                                    <td style="border:1px solid grey;">{{$MealController->showQuantitySold($meal->id)}}</td>
                                    <td style="border:1px solid grey;">RM{{number_format($MealController->showRevenue($meal->id),2)}}</td>
                                    <td style="border:1px solid grey;"><a class="edit" href="/inventoryReportDetail/{{$meal->id}}">More</a>   
                                        </td>
                               </tr>
                                 
                        @endforeach
                        </tbody>
                     

                    </table>



                </div>
            </div>
        </div>

</div>
        <script>

            $(document).ready(function () {
                $('#example').DataTable();
            });

        </script>

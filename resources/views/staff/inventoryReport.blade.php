<head>
@inject('MealController','\App\Http\Controllers\MealController')
    <link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
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
    </style>
</head>
     <div class="box">
     <x-layout-admin>
        </x-layout-admin>
            <div>
               
                    <h2>
                        Product Sales Report
                    </h2>
                
            </div>

            <br><br>

            <div class="box4">
                <div class="scroll-wrap">
                    <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->
                  
                    <!-- <select name="report" id="report" style="margin-left: 70px; width: 200px; height: 40px;"
                onchange="window.location.href=this.value;">
                <option value="salesReport.html" selected>Sales Report</option>
                <option value="inventoryReport.html">Inventory Report</option>
                <option value="customerReport.html">Customer Report</option>
              </select> -->


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
                           <!-- <asp:ListView ID="lvMealList" runat="server" ItemType="Assignment.Models.Meal" DataKeyNames="meal_ID" SelectMethod="BindMealList"> -->
<!-- 
                            <ItemTemplate> -->
                               <tr style="border:1px solid grey;">
                                    <!-- <asp:HiddenField ID="hiddenMealID" runat="server" Value='<%#Eval("meal_ID") %>' /> -->
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
                                  <!-- </ItemTemplate>
                        </asp:ListView> -->
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

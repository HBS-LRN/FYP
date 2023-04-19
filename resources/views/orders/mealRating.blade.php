<head>
    @inject('OrderController','\App\Http\Controllers\OrderController')


    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
   
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    <link href="{{ asset('./css/listOfCustomer.css') }}" rel="stylesheet">
   
 
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
        .box div h2{
            text-align:center;
        }
        .box4{
            padding:0px 20px;
        }
        /* .col-sm-12, .col-sm-7{
            padding:0px;
        }
        .col-sm-12{
            position: relative;
            left:100px;
        }
        .col-sm-12 .table-striped{
           margin:0px;
            
        } */
        .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: center;
    
}
table>tbody>tr>td{
    line-height: 1.42857143;
    vertical-align: center;
}
table tbody tr td label{
    display:inherit;
    max-width:0%;
}
.scroll-wrap .table tbody tr th{
    border:1px solid grey;
}
    </style>
</head>

<body>
    <div class="PageBody">
<x-layout-admin>
    </x-layout-admin>
    <div class="box">

        <div>
            <h2>Manage Meal Rating
            </h2>
        </div>
        <br />
        <br />

        <div class="box4">
            <div class="scroll-wrap">
              
                <table id="example" class="table table-striped">

                    <thead>
                        <tr class="mealRatingTr" style="border:1px solid grey; background-color: rgb(165, 200, 245);">

                            <th width="10%" style="border:1px solid grey;">Order Number</th>
                            <th width="18%" style="border:1px solid grey;">Customer ID</th>
                            <th width="20%" style="border:1px solid grey;">Product</th>
                            <th width="12%" style="border:1px solid grey;">Rating</th>
                            <th width="25%" style="border:1px solid grey;">Comment</th>
                            <th width="10%" style="border:1px solid grey;">Action</th>
                        </tr>

                    </thead>
                    <tbody id="search">

                            @foreach($mealsOrderDetail as $mealOrderDetail)
                            @if($mealOrderDetail -> reply_comment == null)
                                <tr style="border: 1px solid grey;">
                                    <td style="border: 1px solid grey;">
                                       {{$mealOrderDetail->order_id}}</td>
                                    <td style="border: 1px solid grey;">
                                    
                                        {{$mealOrderDetail->Order->user_id}}</td>
                                    <td style="border: 1px solid grey;">
                                        {{$mealOrderDetail->Meal->meal_name}}</td>
                                    <!-- <asp:HiddenField ID="hiddenOrderDetailNumber" runat="server" Value='<%#Eval("order_detail_number") %>' /> -->

                                    <td style="border: 1px solid grey;">

                                        <div class="wrapStar">
                                            <div>
                                                <i class="fa fa-star checked" id="fa-star1"></i>
                                            </div>
                                       
                                            <div id="rate2" style="{{$OrderController->showRating2Star($mealOrderDetail->rating_star)}}">
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                       
                                            <div id="rate3" style="{{$OrderController->showRating3Star($mealOrderDetail->rating_star)}}">
                                                <i class="fa fa-star checked"></i>
                                            </div>

                                            <div id="rate4" style="{{$OrderController->showRating4Star($mealOrderDetail->rating_star)}}">
                                                <i class="fa fa-star checked"></i>
                                            </div>

                                            <div id="rate5" style="{{$OrderController->showRating5Star($mealOrderDetail->rating_star)}}">
                                                <i class="fa fa-star checked"></i>
                                            </div>
                                        </div>
                                    </td>
                                    <td style="border: 1px solid grey;">
                                        {{$mealOrderDetail->rating_comment}}</td>

                                    <td ><p><a href="/mealRating/edit/{{$mealOrderDetail->id}}" class="edit">Reply</a></p></td>

                                </tr>
                            <!-- </ItemTemplate>
                        </asp:ListView> -->
                        @endif
        @endforeach
                    </tbody>
                </table>



            </div>
            <script>
                $(document).ready(function() {
                $('#example').DataTable();
            });
            </script>
        </div>
    </div>
    </div>
    </body>

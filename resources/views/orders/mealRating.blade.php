<head>
    @inject('OrderController','\App\Http\Controllers\OrderController')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css ">
    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
 
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
    </style>
</head>
<body>
    <div class="box">
    <x-layout-admin>
    </x-layout-admin>
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

                            @foreach($mealsOrderDetail as $mealOrderDetail)
                            @if($mealOrderDetail -> reply_comment == null)
                                <tr style="border: 1px solid grey;">
                                    <td style="border: 1px solid grey;">
                                        <label for="lblOrderID">{{$mealOrderDetail->order_id}}</label></td>
                                    <td style="border: 1px solid grey;">
                                    
                                        <label for="lblCustomerID">{{$mealOrderDetail->Order->user_id}}</label></td>
                                    <td style="border: 1px solid grey;">
                                        <label for="lblItemName">{{$mealOrderDetail->Meal->meal_name}}</label></td>
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
                                        <label for="lblComment">{{$mealOrderDetail->rating_comment}}</label></td>

                                    <td style="border: 1px solid grey; display: flex; justify-content: center; align-content: center; justify-items: center;"><a href="/mealRating/edit/{{$mealOrderDetail->id}}" class="edit">Reply</a></td>

                                </tr>
                            <!-- </ItemTemplate>
                        </asp:ListView> -->
                        @endif
        @endforeach
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
        const editSuccess = $('.edit-message').data('editdata')
        if (editSuccess) {
            Swal.fire({
                title: "Message Has Been Reply To Customer",
                icon: "success",
                button: "OK",
            })
        }

    </script>


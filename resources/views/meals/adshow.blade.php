<!-- <link rel="stylesheet" href="../css/listOfMeal.css">-->
<!-- <x-layout-admin>
</x-layout-admin> -->
<head>
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
        .deleteAndEditButton {
            padding-top:70px;
            padding-left:50px;
        }
        .edit {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #95adbe;
            color: white;
            width: 100%;
            font-size: 15px;
            height: 30px;
            cursor: pointer;
            
            margin-bottom: 65px;
            margin-top:60px;
        }

        .delete {
            position: relative;
            top: 14px;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #f17163;
            color: white;
            width: 80%;
            font-size: 15px;
            height: 30px;
            margin-top: 50px;
        }

        .scroll-wrap {
            overflow: auto;
            height: 230px;
        }

        .box4 {
            margin-bottom: 400px;
            min-height: 550px;
        }

        td {
            padding: 0px;
            border: none;
        }
         .dataTables_wrapper .row .col-md-6 .dataTables_filter label {
            color: red;
            margin: 0px;
            position: relative;
            right: 0px;
        }

        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }

        .add {
            position:relative;
            z-index:10;
            padding: 5px 20px;
            top:80px;
            margin:0px;
            
        }
    </style>

<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
   
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    <script src="../JavaScript/popup.js"></script>

    <link href="{{ asset('./css/listOfCustomer.css') }}" rel="stylesheet">
    </head>
<body>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <div>

            <h2>List Of Meals
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">

              
                <a href="/meal/create" class="add" style="text-decoration: none">New</a>

                <table id="example" class="table table-striped">
                    <thead class="mealThead">
                        <tr class="mealTr" style="background-color: rgb(165, 200, 245);">
                            <th class="mealTh" width="2%">No</th>
                            <th class="mealTh" width="1%">Image</th>
                            <th class="mealTh" width="7%">Category</th>
                            <th class="mealTh" width="14%" style="cursor: pointer;">Product Name<i class="fas fa-sort"></i></th>
                            <th class="mealTh" width="10%" style="cursor: pointer;">Price(RM)<i class="fas fa-sort"></i></th>
                            <th class="mealTh" width="10%" style="cursor: pointer;">Quantity<i class="fas fa-sort"></i></th>
                            <th class="mealTh" width="10%">Action</th>
                        </tr>
                    </thead>
                   
                    <tbody class="mealTbody" id="search">
                        <!-- <asp:ListView ID="lvMealList" runat="server" ItemType="Assignment.Models.Meal" DataKeyNames="meal_ID" SelectMethod="BindMealList"> -->
                        
                        @foreach($meals as $key => $meal)
                            <!-- <ItemTemplate> -->
                                <tr class="mealTr" style="border:1px solid grey;">
                                    <td class="no" style="border:1px solid grey;"> {{$key+1}} </td> 
 
                                    <td class="mealTd" style="border:1px solid grey;">
                                    <img width="200" height="200" src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                alt="" /></td>

                                    <td class="mealTd" style="border:1px solid grey;">
                                        {{$meal->Category->name}}</td>
                                    <td class="mealTd" style="border:1px solid grey;">
                                       {{$meal->meal_name}}</td>
                                    <td class="mealTd" style="border:1px solid grey;" align="center">RM{{number_format($meal->meal_price,2)}}</td>
                                    <td class="mealTd" style="border:1px solid grey;" align="center">
                                        {{$meal->meal_qty}}</td> 


                                    <td style="border:1px solid grey;">
                                    <p class="deleteAndEditButton">
                                        <a href="/meal/upshow/{{$meal->id}}" class="edit">Edit</a>
                                        <a href="/deleteMeal/{{$meal->id}}" class="delete">Delete</a>
                                    </p>
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
            $(document).ready(function() {
                $('#example').DataTable();
            });
            const productFound = $('.delete').data('deletedata')
            if (productFound) {
                Swal.fire({
                    title: "Unable to Delete this Meal",
                    text: "This Meal Having Purchased By Customer",
                    icon: "error",
                    button: "OK",

                })
            }


            $('.delete').on('click', function (e) {
                e.preventDefault();
                const href = $(this).attr('href')
                Swal.fire({
                    title: 'Are u sure?!',
                    
                    type: 'warning',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete Record',
                    customClass:'swal-wide',
                }).then((result) => {
                    if (result.value) {
                        document.location.href = href;
                    }
                })
            })
        </script>
</body>


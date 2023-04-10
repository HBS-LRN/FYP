<!-- <link rel="stylesheet" href="../css/listOfMeal.css">-->
<!-- <x-layout-admin>
</x-layout-admin> -->

<head>
    <style>
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
        .row .col-md-6 .dataTables_filter {
            padding-left:110px;
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

    <link rel="stylesheet" href="../css/listOfMeal.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
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
                                        <label for="lblCategory"> {{$meal->Category->name}}</label></td>
                                    <td class="mealTd" style="border:1px solid grey;">
                                        <label for="lblProductName">{{$meal->meal_name}}</label></td>
                                    <td class="mealTd" style="border:1px solid grey;" align="center">RM{{number_format($meal->meal_price,2)}}</td>
                                    <td class="mealTd" style="border:1px solid grey;" align="center">
                                        <label for="lblQuantity">{{$meal->meal_qty}}</label></td> 


                                    <td style="border:1px solid grey;">
                                        <a href="/meal/upshow/{{$meal->id}}" class="edit">Edit</a>
                                        <a href="/deleteMeal/{{$meal->id}}" class="delete">Delete</a>
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
    </body>


        <!--//prompt the edited suceffuly data using sweertalert -->
    

        <script src="../JavaScript/jquery-3.6.0.min.js"></script>
        <script src="../JavaScript/sweetalert2.all.min.js"></script>
        <script src="../JavaScript/popup.js"></script>
           
        <script>
            $(document).ready(function () {
                $('#example').DataTable();
            });
            const productFound = $('.delete-message').data('deletedata')
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
                    text: 'Record will be deleted',
                    type: 'warning',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete Record',

                }).then((result) => {
                    if (result.value) {
                        document.location.href = href;
                    }
                })
            })
        </script>



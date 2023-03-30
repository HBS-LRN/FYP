<head>
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"/>
 
<script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <link href="{{ asset('./css/listOfCustomer.css') }}" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
    
<style>
       .add {
            margin-top:50px;
       }
       .box4{
        padding:0px 30px;
       }
        .custListTd .edit {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #95adbe;
            color: white;
            font-size: 15px;
            height: 30px;
            cursor: pointer;
            padding: 5px 35px;
        }

        .custListTd:nth-child(6) {
            padding: 0px;
        }

        .custListTd p {
            margin: 20px 0px;
        }

        .custListTd .delete {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #f17163;
            color: white;
            margin: 10px 0px;
            padding: 5px 25px;
            font-size: 15px;
            height: 30px;
        }
        .row .col-md-6 .dataTables_filter {
            
            
        }
        .dataTables_wrapper .row .col-md-6 .dataTables_filter label{
            color:red;
            margin:0px;
            position:relative;
            right:0px;
        }
        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }
        .add {
            position:relative;
            z-index:10;
            padding: 5px 20px;
            top:82px;
            margin:0px;
            right:30px;
        }
        .searchBtn{
            position:relative;
            z-index:10;
            right:125px;
            background:none;
            top:82px;
            padding:5px;
            border:none;
        }
        .searchBtn i{
            font-weight:bolder;
            font-size:20px;
        }

    </style>
</head>
<body>
<div class="Pagebody">
    <x-layout-admin>
    </x-layout-admin>
    <div class="box">
        <div>

            <h2>List Of Customers
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">
                <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->

                <button ID="searchBtn" Class="searchBtn" OnClick="" ><i class="fas fa-search"></i></button>
                
                <button ID="addBtn" Class="add" OnClick="addBtn_Click" >Add</button>



                <table id="example" class="table table-striped">
                    <thead class="custListThead">
                        <tr class="custListTr" style="background-color: rgb(165, 200, 245);">
                            <th class="custListTh" width="5%">Cusomer ID</th>
                            <th class="custListTh" width="20%">Customer Name</th>

                            <th class="custListTh" width="10%">Customer Email</th>
                            <th class="custListTh" width="15%">Customer Telephone</th>
                            <th class="custListTh" width="10%">Customer BirthDate</th>
                            <th class="custListTh" width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="search">
                        @foreach($users as $key => $user)
                                <tr style="border:1px solid grey;">
                                    <td class="custListTd" style="border:1px solid grey;">
                                    {{$user->id}}</td>
                                    <td class="custListTd" style="border:1px solid grey;">{{$user->name}}</td>
                                    <td class="custListTd" style="border:1px solid grey;">{{$user->email}}</td>
                                    <td class="custListTd" style="border:1px solid grey;">{{$user->phone}}</td>
                                    <td class="custListTd" style="border:1px solid grey;">{{$user->birthdate}}</td>
                                    <td class="custListTd" style="border:1px solid grey;">
                                        <p><a class="edit" href="/customer/edit/{{$user->id}}">Edit</a></p>
                                        <p><a class="delete" href="">Delete </a></p>
                                    </td>
                                </tr>
                    @endforeach
                           
                    </tbody>

                </table>


            </div>
        </div>


    </div>
    <!-- <%if (Session["UnsuccessfullyDelete"] != null)
            {%>
        <div class="flash-message" data-flashdata='<%=Session["UnsuccessfullyDelete"]%>'></div>
        <%Session.Remove("UnsuccessfullyDelete"); %>
        <%}%>
     <%if (Session["successfullyUpdate"] != null)
            {%>
        <div class="update-meesage" data-flashdata='<%=Session["successfullyUpdate"]%>'></div>
        <%Session.Remove("successfullyUpdate"); %>
        <%}%> -->

        <script src="../JavaScript/sweetalert2.all.min.js"></script>
        <script src="../JavaScript/popup.js"></script>
        <script>

            $(document).ready(function () {
                $('#example').DataTable();
            });
            const productFound = $('.flash-message').data('flashdata')
            if (productFound) {
                Swal.fire({
                    title: "Unable to Delete this Customer",
                    text: "This Customer Having Product Purchased",
                    icon: "error",
                    button: "OK",

                })
            }

            $(document).ready(function () {
                $("#Search").on("keyup", function () {
                    var value = $(this).val().toLowerCase();
                    $("#search tr").filter(function () {
                        $(this).toggle($(this).text()
                            .toLowerCase().indexOf(value) > -1)
                    });
                });
            });

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

</div>
</body>
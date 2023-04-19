<head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <link href="{{ asset('./css/listOfCustomer.css') }}" rel="stylesheet">
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

        .add {
            margin-top: 50px;
        }

        .box4 {
            padding: 0px 30px;
        }

        .staffListTd .edit {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #95adbe;
            color: white;
            font-size: 15px;
            height: 30px;
            cursor: pointer;
            padding: 5px 35px;
        }

        .staffListTd:nth-child(6) {
            padding: 0px;
        }

        .staffListTd p {
            margin: 0px;
            margin: 10px;
            display: flex;
            justify-content: center;

        }

        .staffListTd .delete {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #f17163;
            color: white;
            margin: 10px 0px;
            padding: 5px 25px;
            font-size: 15px;
            height: 30px;
        }

        .row .col-md-6 .dataTables_filter {}

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
            position: relative;
            z-index: 10;
            padding: 5px 20px;
            top: 82px;
            margin: 0px;
            right: 30px;
        }

        .searchBtn {
            position: relative;
            z-index: 10;
            right: 235px;
            background: none;
            top: 105px;
            padding: 5px;
            border: none;
        }

        .searchBtn i {
            font-weight: bolder;
            font-size: 20px;
        }

        .col-sm-6:last-child .input-sm {
            display: none;

        }

        .input-sm1 {
            position: absolute;
            width: 200px;
            left: 61%;
            top: 20.5%;
            z-index: 2;
        }
    </style>
</head>

<body>
    <div class="Pagebody">
        <x-layout-admin>
        </x-layout-admin>
        <div class="box">
            <div>

                <h2>List Of Staffs
                </h2>

            </div>

            <br>
            <br>

            <div class="box4">
                <div class="scroll-wrap">
                    <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->

                    <form action="/staff">
                        <button ID="searchBtn" class="searchBtn"><a href=""><i
                                    class="fas fa-search"></i></a></button>
                        <input type="search" class="form-control input-sm1" placeholder="" name="search"
                            aria-controls="example">
                    </form>
                    <a href="/staff/create" Class="add">Add</a>



                    <table id="example" class="table table-striped">
                        <thead class="staffListThead">
                            <tr class="staffListTr"
                                style="background-color: rgb(165, 200, 245); border:1px solid grey;">
                                <th class="staffListTh" style="border:1px solid grey;" width="5%">Staff ID</th>
                                <th class="staffListTh" style="border:1px solid grey;" width="20%">Staff Name</th>

                                <th class="staffListTh" style="border:1px solid grey;" width="10%">Staff Email</th>
                                <th class="staffListTh" style="border:1px solid grey;" width="15%">Staff Telephone
                                </th>
                                <th class="staffListTh" style="border:1px solid grey;" width="10%">Staff Role</th>
                                <th class="staffListTh" style="border:1px solid grey;"width="10%">Action</th>
                            </tr>
                        </thead>
                        <tbody id="search">
                            @foreach ($users as $key => $user)
                                <tr style="border:1px solid grey;">
                                    <td class="staffListTd" style="border:1px solid grey;">
                                        {{ $user->id }}</td>
                                    <td class="staffListTd" style="border:1px solid grey;">{{ $user->name }}</td>
                                    <td class="staffListTd" style="border:1px solid grey;">{{ $user->email }}</td>
                                    <td class="staffListTd" style="border:1px solid grey;">{{ $user->phone }}</td>

                                    <td class="staffListTd" style="border:1px solid grey;">
                                        @foreach ($roles as $role)
                                            @if ($role->id == $user->role)
                                                {{ $role->name }}
                                            @endif
                                        @endforeach

                                    <td class="staffListTd" style="border:1px solid grey;">
                                        <p><a class="edit" href="/staff/edit/{{ $user->id }}">Edit</a></p>
                                        <p><a class="delete" href="/staff/delete/{{ $user->id }}">Delete </a></p>
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



        <script>
            $(document).ready(function() {
                $('#example').DataTable();
            });

            $('.delete').on('click', function(e) {
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
                    customClass: 'swal-wide',
                }).then((result) => {

                    Swal.fire({
                        title: 'Provide Again Own Staff ID To Delete For Validation Purposes',
                        input: 'text',
                        inputAttributes: {
                            autocapitalize: 'off'
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Look up',
                        showLoaderOnConfirm: true,
                        customClass: 'swal-wide',

                        allowOutsideClick: () => !Swal.isLoading()
                    }).then((result) => {


                        if (result.isConfirmed) {

                            console.log(`${result.value}`);
                            if (`${result.value}` == 'S00' + {{ auth()->user()->id }}) {
                                document.location.href = href;
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Invalid Action',
                                    customClass: 'swal-wide',
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    showClass: {
                                        popup: 'animate__animated animate__fadeInDown'
                                    }

                                })
                            }

                            // customClass: 'swal-wide',
                            // title: `${result.value}'s avatar`,


                        }
                    })
                    // if (result.value) {
                    //     document.location.href = href;
                    // }
                })
            })
        </script>


    </div>
</body>

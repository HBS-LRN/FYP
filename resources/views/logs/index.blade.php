<!DOCTYPE html>

<head>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

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

        #example{
            margin-top:50px;
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

span.important{
    font-weight:bold;
}

td{
    text-align:left;
}

.logdetail{
    padding:5px;
    text-decoration:none;
    background-color:lightgrey;
}

    </style>
</head>
<body>
<div class="Pagebody">
        <x-layout-admin>
        </x-layout-admin>
        <div class="box">
        <div>

        <h2>Logs</h2>

        </div>

        <br>
        <br>

        <div class="box4">
        <div class="scroll-wrap">


        <table id="example" class="table table-striped">

        <thead>
            <tr class="mealRatingTr" style="border:1px solid grey; background-color: rgb(165, 200, 245);">

            <th width="15%" style="border:1px solid grey;">Time Happened</th>
            <th width="8%" style="border:1px solid grey;">User ID</th>
            <th width="15%" style="border:1px solid grey;">User Name</th>
            <th width="35%" style="border:1px solid grey;">Action</th>
            <th width="15%" style="border:1px solid grey;">Check Data</th>
       
            </tr>

        </thead>
        <tbody id="search">

        @foreach($logs as $log)
            <tr style="border: 1px solid grey;">
                <td style="border: 1px solid grey;padding:20px;">
                   {{$log->created_at}}</td>
                <td style="border: 1px solid grey;padding:20px;">
                    {{$log->user_id}}</td>
                <td style="border: 1px solid grey;padding:20px;">
                    {{$log->user_name}}</td>
                <td style="border: 1px solid grey;padding:20px;">
                    <span class="important"> {{$log->action}}</span> data with an id  <span class="important">{{$log->row_id}}</span> in table  <span class="important">{{$log->table_name}} .</span>
                </td>
                <td style="border: 1px solid grey;padding:20px;">
                    <a class="logdetail" href="/logDetails/{{$log->id}}">View Changes</a>
                </td>

            </tr>
    @endforeach
        </tbody>
        </table>

        </div>
    </div>
    </div>
</div>
</body>

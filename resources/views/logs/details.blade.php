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
        
        #example{
            margin-top:50px;
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

span.important{
    font-weight:bold;
}

td{
    text-align:left;
}

    </style>
</head>
<body>
<div class="Pagebody">
        <x-layout-admin>
        </x-layout-admin>
        <div class="box">
        <div>

        <h2>Logs {{$log->id}} Details </h2>

        </div>

        <br>
        <br>

        <div class="box4">
        <div class="scroll-wrap">


        <table id="example" class="table table-striped">

        <tbody id="search">
            <tr class="mealRatingTr" style="border:1px solid grey; background-color: rgb(165, 200, 245);">

            <th width="45%" style="border:1px solid grey;">Data Before Action</th>
            
            @if($oldData!=null)
            <td>
                @foreach($oldData as $key => $value)
            <p><strong>{{$key}} : </strong> {{$value}} </p>
            @endforeach
            </td>
            @else
            <td><p>No old data available for this action. </p></td>
            @endif
            </tr>
            <tr class="mealRatingTr" style="border:1px solid grey; background-color: rgb(165, 200, 245);">

            <th width="45%" style="border:1px solid grey;">Data After Action</th>
            
            @if($newData!=null)
            <td>
             @foreach($newData as $key => $value)
            <p><strong>{{$key}} : </strong> {{$value}} </p>
            @endforeach
            </td>
            @else
            <td><p>No latest data available for this action. </p></td>
            @endif
            </tr>
            
        </tbody>
        </table>

        </div>
    </div>
    </div>
</div>
</body>

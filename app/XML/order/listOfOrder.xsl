
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt">
<xsl:include href="../adminSideBar.xsl" />
<msxsl:script language="JavaScript" src="../js/tableData.js">

<xsl:output method="html"/>
    $(document).ready(function () {
    $('#example').DataTable();
});
</msxsl:script>
<xsl:template match="/">
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="../css/listOfOrder.css"/>
     
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="../js/sweetalert2.all.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/css/dataTables.bootstrap.min.css"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.4/js/dataTables.bootstrap.min.js"></script>
        <script type="text/javascript">
                     $(document).ready(function () {
        $('#example').DataTable();
    });
                </script>
        
        <style>
        .pagination{
            margin-top:30px;
            margin-right:32px;
        }
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
            
            .detailBtnBox{
                padding: 20px 70px;
            }

            .detailBtnBox .orderDetail {
                padding:5px 10px;
                border: 1px solid black;
                border-radius: 5px;
                background-color: #95adbe;
                color: white;
                font-size: 15px;
                text-decoration:none;
            }
            .table-striped thead .OrderListTr{
                background-color: rgb(165, 200, 245);
            }

            .delete {
                margin-top:10px;
            }
            .row .col-md-6 .dataTables_filter {
                padding-left:110px;
            }
            .row .col-md-7 .dataTables_paginate {
                padding-right: 30px;
            }
            .titleOfOrder{
                font-size: 60px; 
                margin-left: 10px;
                margin-top:20px;
                margin-bottom:20px;
                text-align:center;
            }
            
        </style>
    </head>
<body>
    <div class="Pagebody">
        <xsl:call-template name="adminSideBar" />
    <div class="box">
    
    
        <div>
            <h2 class='titleOfOrder'>List Of Orders</h2>
        </div>

        <br/>
        <br/>

        <div class="box4">
            <div class="scroll-wrap">
 
                <table id="example" class="table table-striped table-bordered">
                    <thead>
                        <tr class="OrderListTr" style="background-color: rgb(165, 200, 245);">
                            <th width="10%">Order No</th>
                            <th width="15%">Customer ID</th>
                            <th width="25%">Order Date</th>
                            <th width="10%">Price(RM)</th>
                            <th width="10%">Payment Method</th>
                            <th width="10%">Status</th>
                            <th width="15%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="search">          
                        <xsl:for-each select="/orders/order">
                            <tr>
                                <td style="border:1px solid grey;">
                                    <a href="orderDetails/show/{id}">
                                    <label for="lblOrderNumber">
                                    <xsl:value-of select="id"/>
                                    </label>
                                    </a>
                                </td>
                                <td style="border:1px solid grey;">
                                    <label for="lblCustomerID">
                                    <xsl:value-of select="user_id"/>
                                    </label>
                                </td>
                                <td style="border:1px solid grey;"><label for="lblOrderDate"><xsl:value-of select="order_date"/></label></td>
                                <td style="border:1px solid grey;"><label for="lblOrderTotal"><xsl:value-of select="format-number(order_total, '0.00')"/></label></td>
                                <td style="border:1px solid grey;"><label for="lblPaymentMethod"><xsl:value-of select="payment_method"/></label></td>
                                <td id="result" style="color: red; border:1px solid grey;"><label for="lblOrderStatus"><xsl:value-of select="order_status"/></label></td>
                                <td class="detailBtnBox" style="border:1px solid grey;"><a id="btnOrderDetail" class="orderDetail" href="orderDetails/show/{id}">Order Detail</a></td>
                            </tr>
                        </xsl:for-each>

                    </tbody>

                </table>
               
            </div>
        </div>
    </div>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>



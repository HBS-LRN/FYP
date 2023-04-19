<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt">
<xsl:include href="../adminSideBar.xsl" />
<msxsl:script language="JavaScript" src="../js/tableData.js" />
<xsl:param name="user_id" select="''"/>
<xsl:param name="totalQuantity" select="''"/>
<xsl:param name="totalPrice" select="''"/>
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
        td{
            border:1px solid grey;
        }
        .pagination{
            margin-top:30px;
            margin-right:32px;
        }
        .totalQtyShowBox{
            position:relative;
            
            float:left;
            left:30px;
            bottom:50px;
        }
    </style>
    </head>
   
    <body>
     <div class="Pagebody">
        <xsl:call-template name="adminSideBar" />
    
        <div class="box">
            <div>

            <h2>Customer Report Detail - Customer ID <xsl:value-of select="$user_id"/>
            </h2>
        </div>
        <br/>
        <br/>
            </div>


            <div class="box4">
                <div class="scroll-wrap">

                    <table id="example" class="table table-striped table-bordered">
                        <thead>
                            <tr style="background-color: rgb(165, 200, 245);">
                            
                                <th width="15%">Product Name</th>
                                <th width="15%">Price</th>
                                <th width="15%">Quantity</th>
                                <th width="15%">Total Price</th>
                                <th width="15%">Date</th>
                            </tr>
                        </thead>
                        <tbody id="search">

                            <xsl:for-each select="//user[@id=$user_id]/ordered/meal">
                            <tr style="border:1px solid grey;">
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="price"/></td>
                            <td><xsl:value-of select="quantity"/></td>
                            <td><xsl:value-of select="totalprice"/></td>
                            <td><xsl:value-of select="date"/></td>
                            </tr>
                        </xsl:for-each>
                            

                        </tbody>
                
                    </table>
                    <p class="totalQtyShowBox">
                    Total Quantity  :<xsl:value-of select="$totalQuantity"/>
                        Total Spend (RM):<xsl:value-of select="$totalPrice"/>
                    </p>
                    
                </div>
            </div>
        </div>

    
</body>
</html>

</xsl:template>
</xsl:stylesheet>
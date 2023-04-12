<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt">
<xsl:include href="../adminSideBar.xsl" />
<msxsl:script language="JavaScript" src="../js/tableData.js" />
 <xsl:output method="html"/>

    <!-- Embed JavaScript code in the XSL file -->
    <msxsl:script language="JavaScript">
        function tableData() {
          $(document).ready(function () {
        $('#example').DataTable();
    });
        }
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
        </style>
    </head>
   
    <body>

   
    <div class="Pagebody">
    <xsl:call-template name="adminSideBar" />
    <div class="box">

        <div>
            <h2>Customer Report 
            </h2>

        </div>
        <br/>
        <br/>
        <div class="box4">
            <div class="scroll-wrap">

                <table id="example" class="table table-striped table-bordered">
                    <thead>
                        <tr style="background-color: rgb(165, 200, 245);">
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Item Ordered</th>
                            <th>Overall Sales</th>
                            <th>Action</th>
                        </tr>
                    </thead>


                    <tbody id="search">
                        <xsl:for-each select="/users/user">
                        <tr style="border:1px solid grey;">
                            <td><xsl:value-of select="@id"/></td>
                            <td><xsl:value-of select="name"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td><xsl:value-of select="sum(ordered/meal/quantity)"/></td>
                            <td><xsl:value-of select="ordered/meal/totalprice/@currency"/>
                                <xsl:value-of select="sum(ordered/meal/totalprice)"/></td>
                            <td><a href="/userOrderDetail/{@id}">Overall Detail</a></td>
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
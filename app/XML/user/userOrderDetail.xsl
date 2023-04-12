<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:include href="../adminSideBar.xsl" />
<xsl:param name="user_id" select="''"/>
<xsl:param name="totalQuantity" select="''"/>
<xsl:param name="totalPrice" select="''"/>
<xsl:template match="/">

<html>
    <head>
    <link rel="stylesheet" href="../css/listOfOrder.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css "/>
    <style>
        td{
            border:1px solid grey;
        }
    </style>
    </head>
   
    <body>
    <xsl:call-template name="adminSideBar" />
   
<div class="box">
        <div>

            <h2>Customer Report Detail - Customer ID <xsl:value-of select="$user_id"/>
            </h2>
        </div>
        <br/>
        <br/>

        <div class="box4">
            <div class="scroll-wrap">
                <table id="example" class="table table-striped">
                    <thead>
                        <tr style="background-color: rgb(165, 200, 245);">
                            <th width="15%">Product Name</th>
                            <th width="15%">Price</th>
                            <th width="15%">Quantity</th>co
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
                   Total Quantity  :<xsl:value-of select="$totalQuantity"/>
                   Total Spend (RM):<xsl:value-of select="$totalPrice"/>
            </div>
        </div>
    </div>

    
</body>
</html>

</xsl:template>
</xsl:stylesheet>
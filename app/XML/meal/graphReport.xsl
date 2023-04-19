
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt">
<xsl:include href="../adminSideBar.xsl" />
<msxsl:script language="JavaScript" src="../js/tableData.js" />
 <xsl:output method="html"/>
 <!-- <xsl:variable name="categories" select="'Appertizer', 'Beverage', 'Dessert', 'Rice', 'Noodle', 'Seafood'" /> -->
<xsl:variable name="categories" select="document('category.xml')" />
<xsl:variable name="orders" select="document('graphReport.xml')" />
<xsl:param name="today" />
<xsl:template match="/">


<html>
<head>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-core.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.0.1/js/anychart-pie.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
</head>

<body>
    <div class="box">
       <xsl:call-template name="adminSideBar" />
        <div>

            <h2>Graph Report 
            </h2>

        </div>

        <br/>
        <br/>

        <div class="box4">
            <div class="scroll-wrap">

                <div class="box5">
                    <div id="container" style="width: 100%; height: 100%"></div>
                   
                    <script type="text/javascript">
                  
                        anychart.onDocumentReady(function () {    
                            var data = [
                                <xsl:for-each select="$categories/categories/category">
                                <xsl:variable name="category" select= "name" />

                                        {x: "<xsl:value-of select="$category" />", value:
                                       
                                            <xsl:value-of select="sum($orders/orders/order[date=$today]/meal[category=$category]/quantity)" /> 
                                           
                                         },
                                </xsl:for-each>

                            ];

                          
                            var chart = anychart.pie();

                          
                            chart.title("Pie Chart Total Sales Contribution by Category - Today");

                            chart.data(data);

                            
                            chart.sort("desc");

                            chart.legend().position("right");
                            
                            chart.legend().itemsLayout("vertical");

                           
                            chart.container('container');
                            chart.draw();

                        });
                    </script>

                </div>

                <div class="box6">

                    <canvas id="myChart" style="width: 100%; max-width: 600px; height: 350px;"></canvas>


                    <script type="text/javascript">
                        var xValues = [
                            <xsl:for-each select="$categories/categories/category">
                            "<xsl:value-of select="name" />",
                            </xsl:for-each>
                        ];
                        var yValues = [
                          <xsl:for-each select="$categories/categories/category">
                                <xsl:variable name="category2" select="name" />
                                    <xsl:value-of select="sum($orders/orders/order/meal[category=$category2]/quantity)" /> ,
                          </xsl:for-each>
                        ];
                        var barColors = ["violet", "red", "blue", "slateblue", "violet", "orange"];
                       width:20;

                        new Chart("myChart", {
                            type: "bar",
                            data: {
                                labels: xValues,
                                datasets: [{
                                    backgroundColor: barColors,
                                    data: yValues
                                }]
                            },
                            options: {
                                legend: { display: false },
                                title: {
                                    display: true,
                                    text: "Historgram Total Sales Contribution by Category - Overall"
                                }
                            }
                        });
                    </script>

                </div>

            </div>

        </div>

    </div>
</body>
</html>

</xsl:template>
</xsl:stylesheet>

    <div class="box">
        <div>

            <h2>Graph Report
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">


                <div class="box5">
                    <div id="container" style="width: 100%; height: 100%"></div>
                    <script>
                        anychart.onDocumentReady(function () {

                            // set the data
                            //counting for set value into graph
                            var data = [
                                <asp:ListView ID="ListView1" runat="server" ItemType="Assignment.Models.Category" DataKeyNames="category_ID" SelectMethod="BindCategoryList">

                                    <ItemTemplate>

                                        {x: "<%# Eval("category_name") %>", value:<%#showCategoryTodayQuantitySold(Eval("category_ID")) %>},
                                    </ItemTemplate>
                                </asp:ListView>

                            ];

                            // create the chart
                            var chart = anychart.pie();

                            // set the chart title
                            chart.title("Pie Chart Total Sales Contribution by Category - Today");

                            // add the data
                            chart.data(data);

                            // sort elements
                            chart.sort("desc");

                            // set legend position
                            chart.legend().position("right");
                            // set items layout
                            chart.legend().itemsLayout("vertical");

                            // display the chart in the container
                            chart.container('container');
                            chart.draw();

                        });
                    </script>

                </div>

                <div class="box6">

                    <canvas id="myChart" style="width: 100%; max-width: 600px; height: 350px;"></canvas>


                    <script>
                        var xValues = [
                            "Appertizer","Beancurd","Beverage","Desert","DimSum","Fish","Meat","Noodle",
                        ];
                        var yValues = [
                            <asp:ListView ID="lvCategoryHistogramChart" runat="server" ItemType="Assignment.Models.Category" DataKeyNames="category_ID" SelectMethod="BindCategoryList">

                            <ItemTemplate>
                                <%#showCategoryOverallQuantitySold(Eval("category_ID")) %>,
                                </ItemTemplate>
                            </asp:ListView>
                        ]
                        var barColors = ["violet", "red", "blue", "slateblue", "violet", "orange", "lightgray", "red"];
                        width: 20;

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
</asp:Content>

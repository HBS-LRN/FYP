<%@ Page Title="" Language="C#" MasterPageFile="~/StaffSide.Master" AutoEventWireup="true" CodeBehind="InventoryReport.aspx.cs" Inherits="Assignment.admin.InventoryReport" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <style>
    .image {
        height: 120px;
        width: 120px;
        margin-left: 26px;
    }
 
    .row .col-md-6 .dataTables_filter {
        padding-left:110px;
    }
    .row .col-md-7 .dataTables_paginate {
        padding-right: 30px;
    }
    </style>
     <div class="box">
            <div>
               
                    <h2>
                        Product Sales Report
                    </h2>
                
            </div>

            <br><br>

            <div class="box4">
                <div class="scroll-wrap">
                    <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->
                  
                    <!-- <select name="report" id="report" style="margin-left: 70px; width: 200px; height: 40px;"
                onchange="window.location.href=this.value;">
                <option value="salesReport.html" selected>Sales Report</option>
                <option value="inventoryReport.html">Inventory Report</option>
                <option value="customerReport.html">Customer Report</option>
              </select> -->

                 

                
                  
                    <table id="example" class="table table-striped sortable">
                        <thead>
                            <tr style="background: rgb(165, 200, 245);">
                                <th width="5%">No.</th>
                                <th width="15%" style="text-align:center; vertical-align: middle;">Product Image</th>
                                <th width="15%">Product Name</th>
                                <th width="10%">Product Stock In Hand</th>
                                <th width="10%">Product Price</th>
                                <th width="10%">Item Sold</th>
                                <th width="10%">Revenue</th>
                                <th width="10%">More Detail</th>
                            </tr>
                        </thead>
                        <tbody id="search">
                           <asp:ListView ID="lvMealList" runat="server" ItemType="Assignment.Models.Meal" DataKeyNames="meal_ID" SelectMethod="BindMealList">

                            <ItemTemplate>
                               <tr style="border:1px solid grey;">
                                    <asp:HiddenField ID="hiddenMealID" runat="server" Value='<%#Eval("meal_ID") %>' />
                                    <td style="border:1px solid grey;"><asp:Label ID="lblId" runat="server" Text='<%#Eval("meal_ID") %>'></asp:Label></td>
                               
                                    <td style="border:1px solid grey;"><asp:Image ID="Image" runat="server" ImageUrl='<%# string.Format("data:Image/png;base64,{0}",Convert.ToBase64String((byte[])Eval("meal_Image"))) %>' /></td>

                                    <td style="border:1px solid grey;"><asp:Label ID="lblProductName" runat="server" Text='<%#Eval("meal_Name") %>'></asp:Label></td>
                              
                                    <td style="border:1px solid grey;"><asp:Label ID="lblQuantity" runat="server" Text='<%#Eval("meal_qty") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;">RM<%#Eval("meal_regular_price","{0:F2}") %></td>
                                   <td style="border:1px solid grey;"><%#showQuantitySold(Eval("meal_ID")) %></td>
                                    <td style="border:1px solid grey;">RM<%#showRevenue(Eval("meal_ID")).ToString("0.00") %></td>
                                    <td style="border:1px solid grey;"><a class="edit" href="../admin/InventoryReportDetail.aspx?mealID=<%#Eval("meal_ID") %>">More</a>
                                          
                                        </td>
                               </tr>
                                  </ItemTemplate>
                        </asp:ListView>
                        </tbody>
                     

                    </table>



                </div>
            </div>
        </div>

        <script>

            $(document).ready(function () {
                $('#example').DataTable();
            });

        </script>
</asp:Content>
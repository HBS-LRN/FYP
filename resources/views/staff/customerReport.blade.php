<%@ Page Title="" Language="C#" MasterPageFile="~/StaffSide.Master" AutoEventWireup="true" CodeBehind="CustomerReport.aspx.cs" Inherits="Assignment.admin.customerReport" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <link rel="stylesheet" href="../css/listOfOrder.css">
    <style>
        .row .col-md-6 .dataTables_filter {
            padding-left:110px;
        }
        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <div class="box">

        <div>

            <h2>Customer Report 
            </h2>

        </div>
        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">

                <table id="example" class="table table-striped">
                    <thead>
                        <tr style="background-color: rgb(165, 200, 245);">
                            <th>Customer ID</th>
                            <th>Customer Name</th>
                            <th>Customer Email</th>
                            <th>Customer Overall Sales</th>
                            <th>Overall Item Ordered</th>
                        </tr>
                    </thead>
                    <tbody id="search">
                         <asp:ListView ID="lvCustomerList" runat="server" ItemType="Assignment.Models.Customer" DataKeyNames="customer_ID" SelectMethod="BindCustomerList">

                            <ItemTemplate>
                        <tr style="border:1px solid grey;">
                            
                            <td style="border:1px solid grey;"><asp:Label ID="lblCustomerNo" runat="server" Text='<%# Eval("customer_ID") %>'></asp:Label></td>
                            <td style="border:1px solid grey;"><asp:Label ID="lblCustomerName" runat="server" Text='<%# Eval("customer_Name") %>'></asp:Label></td>
                            <td style="border:1px solid grey;"><asp:Label ID="lblCustomerEmail" runat="server" Text='<%# Eval("customer_Email") %>'></asp:Label></td>
                            <td style="border:1px solid grey;">RM<%#showCustomerOrderRevenue(Eval("customer_ID")).ToString("0.00") %></td>
                            <td style="border:1px solid grey;"><a class="edit" href="../admin/customerReportDetail.aspx?customerID=<%#Eval("customer_ID") %>"">View Overall Detail</a>
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

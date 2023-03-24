<%@ Page Title="" Language="C#" MasterPageFile="~/StaffSide.Master" AutoEventWireup="true" CodeBehind="ListOfCustomer.aspx.cs" Inherits="Assignment.admin.listOfCustomer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >


    <style>
       .add {
            margin-top:50px;
       }
        .custListTd .edit {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #95adbe;
            color: white;
            font-size: 15px;
            height: 30px;
            cursor: pointer;
            padding: 5px 35px;
        }

        .custListTd:nth-child(6) {
            padding: 0px;
        }

        .custListTd p {
            margin: 20px 0px;
        }

        .custListTd .delete {
            border: 1px solid black;
            border-radius: 5px;
            background-color: #f17163;
            color: white;
            margin: 10px 0px;
            padding: 5px 25px;
            font-size: 15px;
            height: 30px;
        }
        .row .col-md-6 .dataTables_filter {
            padding-left:110px;
        }
        .row .col-md-7 .dataTables_paginate {
            padding-right: 30px;
        }
        .add {
            position:relative;
            z-index:10;
            padding: 5px 20px;
            top:82px;
            margin:0px;
            right:30px;
        }

    </style>
    <div class="box">
        <div>

            <h2>List Of Customers
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">
                <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->


                
                <asp:Button ID="addBtn" CssClass="add" runat="server" Text="Add" OnClick="addBtn_Click" />



                <table id="example" class="table table-striped">
                    <thead class="custListThead">
                        <tr class="custListTr" style="background-color: rgb(165, 200, 245);">
                            <th class="custListTh" width="5%">Cusomer ID</th>
                            <th class="custListTh" width="20%">Customer Name</th>

                            <th class="custListTh" width="10%">Customer Email</th>
                            <th class="custListTh" width="15%">Customer Telephone</th>
                            <th class="custListTh" width="10%">Customer BirthDate</th>
                            <th class="custListTh" width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="search">
                        <asp:ListView ID="lvCustomerList" runat="server" ItemType="Assignment.Models.Customer" DataKeyNames="customer_ID" SelectMethod="BindCustomerList">

                            <ItemTemplate>
                                <tr style="border:1px solid grey;">
                                    <td class="custListTd" style="border:1px solid grey;"><asp:Label ID="lblCustomerNo" runat="server" Text='<%# Eval("customer_ID") %>'></asp:Label></td>
                                    <td class="custListTd" style="border:1px solid grey;"><asp:Label ID="Label1" runat="server" Text='<%# Eval("customer_Name") %>'></asp:Label></td>
                                    <td class="custListTd" style="border:1px solid grey;"><asp:Label ID="Label2" runat="server" Text='<%# Eval("customer_Email") %>'></asp:Label></td>
                                    <td class="custListTd" style="border:1px solid grey;"><asp:Label ID="Label3" runat="server" Text='<%# Eval("customer_Phone") %>'></asp:Label></td>
                                    <td class="custListTd" style="border:1px solid grey;"><asp:Label ID="Label4" runat="server" Text='<%# Eval("customer_BirthDate") %>'></asp:Label></td>
                                    <td class="custListTd" style="border:1px solid grey;">
                                        <p><a class="edit" href="../admin/EditCustomer.aspx?customerID=<%#Eval("customer_ID") %>">Edit</a></p>
                                        <p><a class="delete" href="../admin/DeleteCustomer.aspx?customerID=<%#Eval("customer_ID") %>">Delete </a></p>
                                    </td>
                                </tr>

                            </ItemTemplate>
                        </asp:ListView>
                    </tbody>

                </table>


            </div>
        </div>


    </div>
    <%if (Session["UnsuccessfullyDelete"] != null)
            {%>
        <div class="flash-message" data-flashdata='<%=Session["UnsuccessfullyDelete"]%>'></div>
        <%Session.Remove("UnsuccessfullyDelete"); %>
        <%}%>
     <%if (Session["successfullyUpdate"] != null)
            {%>
        <div class="update-meesage" data-flashdata='<%=Session["successfullyUpdate"]%>'></div>
        <%Session.Remove("successfullyUpdate"); %>
        <%}%>
        <script src="../JavaScript/jquery-3.6.0.min.js"></script>
        <script src="../JavaScript/sweetalert2.all.min.js"></script>
        <script src="../JavaScript/popup.js"></script>
        <script>

            $(document).ready(function () {
                $('#example').DataTable();
            });
            const productFound = $('.flash-message').data('flashdata')
            if (productFound) {
                Swal.fire({
                    title: "Unable to Delete this Customer",
                    text: "This Customer Having Product Purchased",
                    icon: "error",
                    button: "OK",

                })
            }

            $(document).ready(function () {
                $("#Search").on("keyup", function () {
                    var value = $(this).val().toLowerCase();
                    $("#search tr").filter(function () {
                        $(this).toggle($(this).text()
                            .toLowerCase().indexOf(value) > -1)
                    });
                });
            });

            $('.delete').on('click', function (e) {
                e.preventDefault();
                const href = $(this).attr('href')
                Swal.fire({
                    title: 'Are u sure?!',
                    text: 'Record will be deleted',
                    type: 'warning',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete Record',

                }).then((result) => {
                    if (result.value) {
                        document.location.href = href;
                    }
                })
            })
        </script>
</asp:Content>

<%@ Page Language="C#" MasterPageFile="~/StaffSide.Master" AutoEventWireup="true" CodeBehind="ListOfStaff.aspx.cs" Inherits="Assignment.admin.listOfStaff" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder" runat="server">
    <link rel="stylesheet" href="../css/listOfOrder.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css " >
    <style>
        .add {
            margin-top:50px;
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
            top:80px;
            margin:0px;
            right:30px;
        }
    </style>
    <div class="box">
        <div>
            <h2>List Of Employees
            </h2>

        </div>

        <br>
        <br>

        <div class="box4">
            <div class="scroll-wrap">
                <!-- <label for="report" style="margin-left: 70px;">Report Type</label> -->


                <asp:Button ID="addBtn" CssClass="add" runat="server" Text="Add" OnClick="addBtn_Click" />

                <table id="example" class="table table-striped sortable">
                    <thead>
                        <tr>
                            <th width="5%">Employee ID</th>
                            <th width="30%">Employee name</th>
                            <th width="10%">Email</th>
                               <th width="10%">Telephone Number</th>
                            <th width="15%">Role</th>
                            <th width="30%">Action</th>
                        </tr>
                    </thead>
                    <tbody id="search">
                        <asp:ListView ID="lvStaffList" runat="server" ItemType="Assignment.Models.Staff" DataKeyNames="staff_ID" SelectMethod="BindStaffList">

                            <ItemTemplate>
                                <tr style="border:1px solid grey;">
                                    <td style="border:1px solid grey;">
                                        <asp:Label ID="lblstaffId" runat="server" Text='<%# Eval("staff_ID") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;">
                                        <asp:Label ID="lblstaffName" runat="server" Text='<%# Eval("staff_Name") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;">
                                        <asp:Label ID="lblstaffEmail" runat="server" Text='<%# Eval("staff_Email") %>'></asp:Label></td>
                                     <td style="border:1px solid grey;">
                                        <asp:Label ID="Label2" runat="server" Text='<%# Eval("staff_Phone") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;">
                                        <asp:Label ID="Label1" runat="server" Text='<%# Eval("staff_Role") %>'></asp:Label></td>
                                    <td style="border:1px solid grey;"><a class="edit" href="../admin/EditStaff.aspx?staffID=<%#Eval("staff_ID") %>">Edit</a>

                                        <a class="delete" href="../admin/DeleteStaff.aspx?staffID=<%#Eval("staff_ID") %>">Delete</a></td>
                                </tr>
                            </ItemTemplate>
                        </asp:ListView>
                    </tbody>

                </table>


            </div>
        </div>


    </div>
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

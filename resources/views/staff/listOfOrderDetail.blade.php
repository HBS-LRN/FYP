<%@ Page Language="C#" MasterPageFile="~/StaffSide.Master" AutoEventWireup="true" CodeBehind="ListOfOrderDetail.aspx.cs" Inherits="Assignment.staff.listOfOrderDetail" %>


<asp:Content ID="Content" ContentPlaceHolderID="ContentPlaceHolder"
    runat="Server">
    <link rel="stylesheet" href="../css/OrderDetail.css">
    <style>
        .scroll-wrap {
            overflow: auto;
            height: 400px;
        }

        .td .img {
            width: 200px;
            height: 200px;
        }
        
        .completedOrder {
            color: white;
            font-weight: bold;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #12bddb;
            margin-right: -15px;
            padding: 5px 10px;
        }

        .deliveredOrder {
        
            color: white;
            font-weight: bold;
            border: 1px solid black;
            border-radius: 5px;
            background-color: #1270db;
            margin-right: -15px;
            padding: 5px 10px;
        }
        .detail_cont {
            width: 655px;
            display: grid;
            grid-template-columns: 60% 100%;
            text-align: justify;
            margin-left: 50px;
            margin-top: 0px;
            
        }

        .details {
            float: left;
        }

        .cal {
            text-align: left;
            padding-left:300px;
        }
        .name_cust div:nth-child(2) {
            padding-right:10px;
            float:right;
            
        }
        .scroll-wrap {
            overflow:auto;
            height:530px;
        }
        .scroll-wrap .sortable {
        margin:0px 40px;
        }
    </style>
    <div class="Pagebody">


        <div class="content">
            <div class="title-container">
                <h1 class="Prodtitle">Product Order Detail</h1>
                <div class="add_content">
                    <div class="cust_cont">
                        <div class="name_cust">
                            <div class="title">
                                <h1>Order Number : <asp:Label ID="lblOrderNumber" runat="server"></asp:Label></h1>
                            </div>
                            <div>
                                <span>Customer ID : <asp:Label ID="lblCustomerID" runat="server"></asp:Label><br />
                                </span>
                            </div>
                        </div>
                        
                        <div class="auto-style2">
                            <asp:HiddenField ID="hiddenOrderNumber" runat="server" />
                            <asp:Button ID="btnDelivered" runat="server" Text="Click Here If Item Is Ready To Deliver" CssClass="deliveredOrder"   OnClick="OrderDetailDelivery_Click" />
                             <asp:Button ID="btnComplete" runat="server" Text="Click Here If Item Is Completly Delivered" CssClass="completedOrder"   OnClick="OrderDetailCompleted_Click" />
                
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-wrap">
                <table class="sortable">
                    <tr class="tr">
                           <th class="th" width="3%">No</th>
                        <th class="th" width="15%">Image</th>
                        <th class="th" width="15%">Product</th>
                        <th class="th" width="8%">Price</th>
                        <th class="th" width="8%">Quantity</th>
                        <th class="th" width="8%">Total Price</th>
                        <th class="th" width="8%">Status</th>
                    </tr>
                    <tbody class="tbody" id="search">

                        <asp:ListView ID="lvOrderDetail" runat="server" ItemType="Assignment.Models.MealOrderDetail" DataKeyNames="order_detail_number" SelectMethod="BindOrderDetailList">

                            <ItemTemplate>
                                <tr class="tr">

                                     <td class="td"> <%# Container.DataItemIndex + 1 %></td>
                                    <td class="td">
                                        <asp:Image ID="Image2" runat="server" CssClass="img" ImageUrl='<%# string.Format("data:Image/png;base64,{0}",Convert.ToBase64String((byte[])Eval("Meal.meal_Image"))) %>' />
                                    </td>
                                    <td class="td">
                                        <asp:Label ID="lblItemName" runat="server" Text='<%# Eval("Meal.meal_Name") %>'></asp:Label></td>
                                    <td class="td">RM
                                        <asp:Label ID="lblItemPrice" runat="server" Text='<%#Eval("Meal.meal_regular_price","{0:F2}") %>'></asp:Label></td>
                                    <td class="td">
                                        <asp:Label ID="lblQuantity" runat="server" Text='<%#Eval("order_qty") %>'></asp:Label></td>
                                    <td class="td">RM<%# string.Format("{0:0.00}", Convert.ToDouble(Eval("Meal.meal_regular_price")) * Convert.ToInt32(Eval("order_qty")))%></td>
                                    <td class="td" id="result"><%# Eval("meal_order_status") %></td>
                                </tr>
                            </ItemTemplate>
                        </asp:ListView>



                    </tbody>
                </table>
            </div>
            <div class="detail_cont">
                <div class="details">
                    <span>Ordered Date And Time : <b>
                        <asp:Label ID="lblOrderDate" runat="server" ></asp:Label></b></span><br>

                    <span>Payment Method :<b> <asp:Label ID="lblPaymentMethod" runat="server" ></asp:Label></b></span>




                </div>
                <div class="cal">
                    <span>Delivery Fee : <b><asp:Label ID="lblDeliveryFee" runat="server" ></asp:Label></b></span><br>
                    
                    <span>Overall Price : <b><asp:Label ID="lblOverallPrice" runat="server" ></asp:Label></b></span><br />

                     <span>Delivery To : <b><asp:Label ID="lblDeliveryAddress" runat="server" ></asp:Label></b></span>
                </div>
            </div>

        </div>

    </div>
     



     <!--//prompt the edited suceffuly data using sweertalert -->
         <%if (Session["successfullyUpdate"] != null)
                    {%>
                <div class="update-meesage" data-flashdata='<%=Session["successfullyUpdate"]%>'></div>
                <%Session.Remove("successfullyUpdate"); %>
                <%}%>

    <script src="../JavaScript/sweetalert2.all.min.js"></script>
    <script src="../JavaScript/jquery-3.6.0.min.js"></script>
     <script src="../JavaScript/popup.js"></script>
    <script src="http://www.kryogenix.org/code/browser/sorttable/sorttable.js"></script>
</asp:Content>

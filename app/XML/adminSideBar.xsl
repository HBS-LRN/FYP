<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template name="adminSideBar">
<head>
    <link rel="stylesheet" type="text/css" href="../css/staffSideBar.css"/>
       <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'/>
 
</head>

    <div class="header">
        <div class="side-navigation">
            <div class="logo-details">
                <a href="./staff/StaffDashboard.aspx"></a>
                    <img src="../../image/GrandImperialGroupLogo.png"></img>
                    
                <p>Grand Imperial</p>

            </div>
            <ul class="nav-links">
                <li><a href="../staff/StaffDashboard.aspx"><i class="fas fa-home"></i>
                        <p>Dashboard</p>
                    </a></li>
                <li><a href="../staff/ListOfOrder.aspx"><i class="fas fa-box-open"></i>
                        <p>Orders</p>
                    </a></li>
                <li><a href="../staff/ManageReservation.aspx"><i class="fa fa-ticket"></i>
                        <p>Reservation</p>
                    </a></li>
                <li>
                    <div class="iconLink">
                        <a href="../staff/ListOfMeal.aspx"><i class="fas fa-boxes"></i>
                            <p>
                                Product
                            </p>
                        </a>
                        <i class="fas fa-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">

                        <li><a href="../staff/ListOfMeal.aspx">
                                <p>List Of Meal</p>
                            </a></li>
                        <li><a href="../staff/ManageInventory.aspx">
                                <p>Manage Stock</p>
                            </a></li>
                    </ul>
                </li>

                <li><a href="../staff/MealRating.aspx"><i class="fas fa-comment"></i>
                        <p>Meal Comment</p>
                    </a></li>
                <li>
                    <div class="iconLink">
                        <a href="../admin/InventoryReport.aspx"><i class="fas fa-chart-pie"></i>
                            <p>
                                Report
                            </p>
                        </a>
                        <i class="fas fa-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><a href="../admin/InventoryReport.aspx">
                                <p>Inventory Report</p>
                            </a></li>
                        <li><a href="../admin/CustomerReport.aspx">
                                <p>Customer Report</p>
                            </a></li>
                        <li><a href="../admin/GraphReport.aspx">
                                <p>Graph Report</p>
                            </a></li>
                    </ul>
                </li>
                <li><a href="/customer"><i class="fas fa-users"></i>
                        <p>Customer</p>
                    </a></li>
                <li><a href="/staff"><i class="fas fa-user-cog"></i>
                        <p>List Of Staff</p>
                    </a></li>
                <br />

            </ul>

            <div class="profile-content" style="padding-left: 30px;">
                <div class="profile-namejob">

                    <div class="profile_name">Tee Fo Yo</div>

                    <div class="job_role">Admin</div>
                </div>

                <a href="../staff/StaffSignOut.aspx"><i class="fas fa-sign-out-alt" style="padding-left: 45px;"></i></a>
            </div>

        </div>

    </div>


</xsl:template>
</xsl:stylesheet>
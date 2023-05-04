<head>
    <script src="https://kit.fontawesome.com/550bf2e8d3.js" crossorigin="anonymous"></script>
    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>
    <link href="{{ asset('./css/staffSideBar.css') }}" rel="stylesheet">

</head>


<div class="header">
    <div class="side-navigation">
        <div class="logo-details">
            <a href="/staffDashboard">
                <img src="../../image/GrandImperialGroupLogo.png"></a>
            <p>Grand Imperial</p>

        </div>
        <ul class="nav-links">
            <li><a href="/staffDashboard"><i class="fas fa-home"></i>
                    <p>Dashboard</p>
                </a></li>
            <li><a href="/listOfOrder"><i class="fas fa-box-open"></i>
                    <p>Orders</p>
                </a></li>

            <li>
                <div class="iconLink">
                    <a href="/meal/adshow"><i class="fas fa-boxes"></i>
                        <p>
                            Product
                        </p>
                    </a>
                    <i class="fas fa-chevron-down arrow"></i>
                </div>
                <ul class="sub-menu">

                    <li><a href="/meal/adshow">
                            <p>List Of Meal</p>
                        </a></li>
                    <li><a href="/showInventory">
                            <p>Manage Stock</p>
                        </a></li>
                </ul>
            </li>

            <li><a href="/mealRating"><i class="fas fa-comment"></i>
                    <p>Meal Comment</p>
                </a></li>

            @if (auth()->user()->role == 2)
                <li>
                    <div class="iconLink">
                        <a href="/inventoryReport"><i class="fas fa-chart-pie"></i>
                            <p>
                                Report
                            </p>
                        </a>
                        <i class="fas fa-chevron-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><a href="/inventoryReport">
                                <p>Inventory Report</p>
                            </a></li>
                        <li><a href="/customerReport">
                                <p>Customer Report</p>
                            </a></li>
                        <li><a href="/graphReport">
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
                    <li><a href="/log"><i class="fas fa-book"></i>
                        <p style="margin-left:8px">Log</p>
                    </a></li>
                <br />
            @endif

        </ul>

        <div class="profile-content" style="padding-left: 30px;">
            <div class="profile-namejob">

                <div class="profile_name">{{ auth()->user()->name }}</div>

                <div class="job_role">
                    @if (auth()->user()->role == 2)
                        Admin
                    @else
                        Staff
                    @endif
                </div>
            </div>

            <a href="../logout"><i class="fas fa-sign-out-alt" style="padding-left: 45px;"></i></a>
        </div>

    </div>

</div>

<x-flash-message />
<script>
    let arrow = document.querySelectorAll(".arrow");

    for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
            console.log(arrowParent)
            arrowParent.classList.toggle("showSubMenu");
        });
    }
</script>

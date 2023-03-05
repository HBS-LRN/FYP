
<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


<head>
        <link rel="stylesheet" href="../css/customerDashboard.css">
</head>
    <div class="all">
        <div class="customerDashboardHeader">
            <div class="customerDashboardBar"></div>
            <span class="customerDashboard">My Dashboard</span>
        </div>

    
    <div class="customerDashboardHeaderContent">
        <x-customer-sidebar/>
              <div class="dashboardContent">
                    <div class="dashboardTitle">
                        <h3 class="profileTitle">My Dashboard</h3>
                        <p class="subTitle">Manage your billing addresses, and edit your password and account details.</p>
                        <hr>
                    </div>
                    <div class="dashboard-block-list">
                        <a href="/" class="dashboard-block">
                            <i class="fas fa-home"></i>
                            <p>Home Page</p>
                        </a>
                        <a href="/purchase" class="dashboard-block">
                            <i class="fas fa-clipboard-list"></i>
                            <p>Manage Purchases</p>
                        </a>
                        <a href="/address" class="dashboard-block">
                            <i class="fas fa-map-marker-alt"></i>
                            <p>Manage Address</p>
                        </a>
                        <a href="usersPass" class="dashboard-block">
                            <i class="fas fa-lock"></i>
                            <p>Manage Password</p>
                        </a>
                        <a href="/profile" class="dashboard-block">
                            <i class="fas fa-user-circle"></i>
                            <p>Account Details</p>
                        </a>

                        <a href="/logout" class="dashboard-block">
                            <i class="fas fa-sign-out-alt"></i>
                            <p>Sign Out</p>
                        </a>
                
                    </div>
                </div>



        </div>
    </div>



    </div>



    
</x-layout-customer>





<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>
    
   
<style>
.progress-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.progress-wrapper {
  position: relative;
  width: 200px;
  height: 200px;
}

.progress {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border-radius: 50%;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
 
  background-color: #FF9900;
  border-radius: 50%;
  transform: rotate(360deg);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: bold;
  color: #444;
}

.redeem{
  margin-top: 70px;
  font-size: 15px;
  color: #FF9900;
  text-decoration: none;
}

.redeem:hover {
  text-decoration: underline;
}

</style>
    <head>
            <link rel="stylesheet" href="../css/customerDashboard.css">
    </head>
        <div class="all">
            <div class="customerDashboardHeader">
                <div class="customerDashboardBar"></div>
                <span class="customerDashboard">Membership Point</span>
            </div>
    
        
        <div class="customerDashboardHeaderContent">
            <x-customer-sidebar/>
                  <div class="dashboardContent">
                        <div class="dashboardTitle">
                            <h3 class="profileTitle">Membership Point</h3>
                            <p class="subTitle">Manage your Membership point, and exchanged some voucher.</p>
                            <hr>
                        </div>
                        <div class="progress-container">
                            <div class="progress-wrapper">
                              <div class="progress">
                                <div class="progress-bar"></div>
                                <div class="progress-text">{{ auth()->user()->point }} P</div>
                              </div>
                            </div>
                            <a href="/voucher" class="redeem">Redeem Your Point By Clicking Here </a>
                          </div>

                    </div>
    
    
    
            </div>
        </div>
    
    
    
        </div>
    
    
    
        
    </x-layout-customer>
    
    
    
    
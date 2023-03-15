<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>


    <head>
        <link rel="stylesheet" href="../css/customerDashboard.css">

    </head>
    <div class="all">
        <div class="customerDashboardHeader">
            <div class="customerDashboardBar"></div>
            <span class="customerDashboard">Membership Point</span>
        </div>


        <div class="customerDashboardHeaderContent">
            <x-customer-sidebar />
            <div class="dashboardContent">
                <div class="dashboardTitle">
                    <h3 class="profileTitle">Membership Point</h3>
                    <p class="subTitle">Manage your Membership point, and exchanged some voucher.</p>
                    <hr>
                </div>


                <div class="progress-container">


                    @foreach ($vouchers as $voucher)
                        @if ($voucher['qty'] != 0)
                            @if (!($voucher && now() > $voucher['expire_date']))
                                <div class="vourcherBOX">
                                    <div class="vourcherInfrontDetailBox">

                                        <img src="../image/grabfood.jpg" class="vourcherImg" />

                                        <div class="vourcherCenterDetailBox">
                                            <p class="discount"><b>{{ $voucher['code'] }}</b></p>


                                            <p class="minSpend"> <br>{{ $voucher['description'] }}</p>
                                        </div>
                                    </div>

                                    <div class="vourcherBackDetailBox">
                                        <p class="validDate">Valid Until: {{ $voucher['expire_date'] }}</p>


                                        @php
                                            $boolean = false;
                                            foreach ($claimVouchers as $claimedVoucher) {
                                                if ($claimedVoucher['user_email'] == auth()->user()->email && $claimedVoucher['voucher_id'] == $voucher['id']) {
                                                    $boolean = true;
                                                }
                                            }
                                            
                                        @endphp

                                        @if ($boolean)
                                            <button class="usedButton" disabled>
                                                Claimed
                                            </button>
                                        @else
                                            <a href="/voucher/{{ $voucher['id'] }}" class="redeemButton">
                                                Redeem
                                            </a>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        @endif
                    @endforeach


                </div>

            </div>



        </div>
    </div>



    </div>




</x-layout-customer>

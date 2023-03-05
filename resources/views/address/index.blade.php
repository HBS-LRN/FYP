<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../css/customerAddress.css">
    </head>

    <div class="all">
        <div class="customerAccHeader">
            <div class="customerAccBar"></div>
            <span class="customerAcc">My Addresses</span>
        </div>
        <div class="customerAccContent">
            <x-customer-sidebar />


            <div class="addressContent">
                <div class="addressTitle">
                    <h3 class="profileTitle">My Addresses</h3>

                    <div class="addAddress">
                        <div class="addAddressFont"><a href="/address/create">+ Add New Address</a></div>
                    </div>
                    <hr class="hr1">
                </div>

                @foreach ($addresses as $address)
                    <div class="userAddress">
                        <div class="userInfo">
                            <div class="name">

                                <label for="nameLabel">Full Name</label>
                                <span>
                                    {{ $address->address_username }}
                                </span>
                            </div>
                            <div class="phone">
                                <label for="phoneLabel">Phone</label>
                                <span>
                                    {{ $address->address_userphone }}
                                </span>
                            </div>
                            <div class="address">
                                <label for="addressLabel">Address</label>
                                <div class="addressBorder">
                                    <span>
                                        {{ $address->street }},
                                        {{ $address->postcode }},
                                        {{ $address->area }}
                                    </span>
                                </div>
                            </div>

                            <div class="buttonType">
                                <div class="editLink">
                                    <a href="/addresseEdit/{{ $address->id }}">Edit</a>
                                </div>

                                <div class="deleteLink">
                                    <a class="deleteAddress" href="/address/{{ $address->id }}/delete">Delete</a>
                                </div>

                                <div class="default">
                                    @if ($address->active_flag == 'T')
                                        <button type="submit" class="currentUsedAddress" disabled>Current Used
                                    @else
                                        <form action="/address/{{ $address->id }}/update" method="POST">
                                            @csrf
                                            @method('PUT')
                                            <button type="submit" class="setAsDefault">Set As Default</button>
                                        </form>
                                    @endif



                                </div>
                            </div>
                        </div>

                    </div>
                @endforeach



            </div>

        </div>
    </div>

</x-layout-customer>

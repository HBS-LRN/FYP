<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../js/jquery-3.6.0.min.js"></script>
<script src="../js/sweetalert2.all.min.js"></script>

@if (session()->has('registerMeesage'))
    <div class="registerLogin-meesage" data-registerdata={{ session('registerMeesage') }}></div>

    <script>
        const regitserLogindata = $('.registerLogin-meesage').data('registerdata')
        if (regitserLogindata) {
            Swal.fire({
                icon: 'info',
                title: 'You Have Not <b>Login<b>/<b>Registered<b> Yet',
                html: 'Click' + ' <a href="/login">Here</a> ' + 'Link To Register Page',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }

            })
        }
    </script>
@endif

@if (session()->has('resgisterSucessful'))
    <div class="register-meesage" data-registerdata={{ session('resgisterSucessful') }}></div>

    <script>

        const successData = $('.register-meesage').data('registerdata')
        if (successData) {
           
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Register Successful!',
                text: 'You Can now Log In With Your Registered Email',
            })

        }
    </script>
@endif
@if (session()->has('successfullyUpdate'))
    <div class="update-meesage" data-flashdata='successfullyUpdate'></div>
    <script>
        const flashdata = $('.update-meesage').data('flashdata')
        if (flashdata) {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'Detail has been Successfully Updated',

            })
        }
    </script>
@endif


@if (session()->has('successAddCart'))
    <div class="success-meesage" data-successdata={{ session('successAddCart') }}></div>
    <script>
        const successData = $('.success-meesage').data('successdata')
        if (successData) {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'Item has been Successfully Added Into Shopping Cart',

            })
        }
    </script>
@endif


@if (session()->has('emailSuccess'))
    <div class="success-meesage" data-successdata={{ session('emailSuccess') }}></div>
    <script>
        const successemailData = $('.success-meesage').data('successdata')
        if (successemailData) {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'We have e-mailed your password reset link',

            })
        }
    </script>
@endif

@if (session()->has('passChangeSuccess'))
    <div class="success-meesage" data-successdata={{ session('passChangeSuccess') }}></div>
    <script>
        const successpassData = $('.success-meesage').data('successdata')
        if (successpassData) {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'You Can now Log In With Your Reset Password',

            })
        }
    </script>
@endif


@if (session()->has('noAddressFound'))
    <div class="fail-meesage" data-faildata={{ session('noAddressFound') }}></div>

    <script>

        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'You Do Not Have Any <b>Address<b> To Check Out',
                footer: '<a href="/address">Click Here To Set Your Address </a>',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif



@if (session()->has('linkExpired'))
    <div class="fail-meesage" data-faildata={{ session('linkExpired') }}></div>

    <script>

        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'The Reset Password <b>Link<b> Has Expired, Reset Again!',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif
@if (session()->has('noItemFound'))
    <div class="fail-meesage" data-faildata={{ session('noItemFound') }}></div>

    <script>

        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'You Do Not Have Any Item To Check Out',
                footer: '<a href="/category/show">Click Here To Order An Item </a>',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif



@if (session()->has('paymentNotFound'))
    <div class="payment-meesage" data-paymentdata={{ session('paymentNotFound') }}></div>

    <script>

        const failData = $('.payment-meesage').data('paymentdata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'Please Choose At Least One Payment Method',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif
<script>
    $('.deleteAddress').on('click', function(e) {
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
<script>
    $('.cancelButton').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href')
        console.log(href);
        Swal.fire({
            title: 'Are u sure?!',
            text: 'Record will be deletected',
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



    const flashsdata = $('.change-meesageed').data('flashsdata')
    if (flashsdata) {
        Swal.fire({
            type: 'success',
            icon: 'success',
            title: 'Success',
            text: 'Rating Star And Comment Are Added Sucessfully',

        })
    }
</script>

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
@if (session()->has('sessionTimeOut'))
    <div class="success-meesage" data-successdata={{ session('sessionTimeOut') }}></div>
    <script>
        const successpassData = $('.success-meesage').data('successdata')
        if (successpassData) {
            Swal.fire({
                type: 'success',
                icon: 'info',
                title: 'Session Time Out Due To Inactivity!',
                text: 'You May Need To Log In Again',

            })
        }
    </script>
@endif

@if (session()->has('successfulStoreClient'))
    <div class="success-meesage" data-successdata={{ session('successfulStoreClient') }}></div>
    <script>
        const successpassData = $('.success-meesage').data('successdata')
        if (successpassData) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You Can Now Redeem To This Voucher',
                showConfirmButton: false,
                timer: 1500

            })
        }
    </script>
@endif
@if (session()->has('concurentLogin'))
    <div class="success-meesage" data-successdata={{ session('concurentLogin') }}></div>
    <script>
        const successpassData = $('.success-meesage').data('successdata')
        if (successpassData) {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Your Account Login From Another Device',
                text: 'Now Being Help To Log Out Account In Another Device ',
                showConfirmButton: false,
                timer: 4000

            })
        }
    </script>
@endif


@if (session()->has('concurentLoginFromDefault'))
    <div class="success-meesage" data-successdata={{ session('concurentLoginFromDefault') }}></div>
    <script>
        const successpassData = $('.success-meesage').data('successdata')
        if (successpassData) {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'System Forced Log Out! Your Account Have Been Login From Another Device!',
                text: 'Only one account from one device can log in to the system',
                showConfirmButton: false,
                timer: 4000

            })
        }
    </script>
@endif
@if (session()->has('successfullyPromoteUpdate'))
    <div class="success-meesage" data-successdata={{ session('successfullyPromoteUpdate') }}></div>
    <script>
        const successData = $('.success-meesage').data('successdata')
        if (successData) {
            Swal.fire({
                type: 'success',
                icon: 'success',
                title: 'Success',
                text: 'Your Delivery Fee Has Been Offered With Voucher Selected',

            })
        }
    </script>
@endif



@if (session()->has('pointNotEnough'))
    <div class="fail-meesage" data-faildata={{ session('pointNotEnough') }}></div>

    <script>
        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'You Do Not Have Enough Member Point To Redeem',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif

@if (session()->has('reusedPassword'))
    <div class="fail-meesage" data-faildata={{ session('reusedPassword') }}></div>

    <script>
        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'Opps, Password Reused!',
                text: 'You Cannot Set Back With The Same Password You Used Before!',
                showCloseButton: true,
                showCancelButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
            })

        }
    </script>
@endif
@if (session()->has('notActiveMember'))
    <div class="fail-meesage" data-faildata={{ session('notActiveMember') }}></div>

    <script>
        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'error',
                title: 'Opps,Inactive Member!',
                text: 'Kindly email To Grand@gmail.com to active your account!',
                showCloseButton: true,
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                }
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

@if (session()->has('redeemUnsuccessful'))
    <div class="fail-meesage" data-faildata={{ session('redeemUnsuccessful') }}></div>

    <script>
        const failData = $('.fail-meesage').data('faildata')
        if (failData) {

            Swal.fire({
                icon: 'info',
                title: 'You Need To Register To This Platform To Redeem Your Voucher',
                footer: '<a href="/webServiceRegister" class="confirmRegister">Click Here To Register </a>',
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
    $('.confirmRegister').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href')
        Swal.fire({
            title: 'Are u sure to register to this platform?',
            text: 'It Will Help You To Auto Register With This Account Email And Password To This Platform',
            type: 'warning',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Register',

        }).then((result) => {
            if (result.value) {
                document.location.href = href;
            }
        })
    })
</script>


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
    $('.redeem').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href')
        Swal.fire({
            title: 'Hold Tight! Redirecting You To Third Party Services',
            html: '<b></b> milliseconds being Redirect You To Third Party Services!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
        
                document.location.href = href;
            
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


<head>
<style>
    .customerAccContent .sideNavigation{
        flex-basis:40%;
    }
    .profile_email {
        word-break:keep-all;
        word-wrap:normal;
        overflow-x:auto;
        overflow-y:no-display;
        text-overflow:ellipsis;
        margin:0px;
        word-break:keep-all;
        width:65%;
    }
    .profile_email::-webkit-scrollbar{
    -webkit-appearance: none;

    }
</style>
</head>

<div class="sideNavigation">
   
                    

                       
                    
                 
    <div class="profile">
        @if( auth()->user()->image != null)
        <img  class="img" src="{{ auth()->user()->image ? asset('storage/' . auth()->user()->image) : asset('/images/no-image.png') }}"
        alt="" />
        @else
        <i class="fas fa-user" style="font-size:45px; color:black;"></i>
        @endif
        <div class="profile_name"> <b>{{ auth()->user()->name }}</b> </div>
        <div class="profile_email">{{ auth()->user()->email }}</div>
    </div>
     
       
    <ul class="nav-links">
        <li><a href="/dashboard"><i class="fas fa-home"></i>Dashboard</a></li>
        <li>
            <div class="iconLink">
                <a href="/profile"><i class="fas fa-user" style="color:black;"></i><span class="account">My Account</span></a>
                <i class="fas fa-chevron-down arrow"></i>
            </div>
            <ul class="sub-menu">
                <li><a href="/profile">
                    <p>Profile</p>
                </a></li>
                <li><a href="/address">
                    <p>Addresses</p>
                </a></li>
                <li><a href="/usersPass">
                    <p>Change Password</p>
                </a></li>
            </ul>
        </li>
        <li>
            <div class="iconLink">
                <a href="/purchase"><i class="fas fa-clipboard-list"></i><span class="purchase">My Purchase</span></a>
            </div>

        </li>

        <li>
            <div class="iconLink">
                <a href="/memberPoint"><i class="fa fa-user-plus"></i>Member Point</a>
            </div>

        </li>
        <li><a href="/logout"><i class="fas fa-sign-out-alt"></i>Log Out</a></li>


    </ul>
</div>

<script>
    let arrow = document.querySelectorAll(".arrow");
    for (var i = 0; i < arrow.length; i++) {
        arrow[i].addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
            arrowParent.classList.toggle("showSubMenu");

        });

    }
</script>

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../../css/itemStyle.css">
        <!-- Latest compiled and minified CSS -->
        <style>

            .pagination{display:inline-block;padding-left:0;margin:20px 0;border-radius:4px}.pagination>li{display:inline}.pagination>li>a,.pagination>li>span{position:relative;float:left;padding:6px 12px;margin-left:-1px;line-height:1.42857143;color:#337ab7;text-decoration:none;background-color:#fff;border:1px solid #ddd}.pagination>li:first-child>a,.pagination>li:first-child>span{margin-left:0;border-top-left-radius:4px;border-bottom-left-radius:4px}.pagination>li:last-child>a,.pagination>li:last-child>span{border-top-right-radius:4px;border-bottom-right-radius:4px}.pagination>li>a:focus,.pagination>li>a:hover,.pagination>li>span:focus,.pagination>li>span:hover{z-index:2;color:#23527c;background-color:#eee;border-color:#ddd}.pagination>.active>a,.pagination>.active>a:focus,.pagination>.active>a:hover,.pagination>.active>span,.pagination>.active>span:focus,.pagination>.active>span:hover{z-index:3;color:#fff;cursor:default;background-color:#337ab7;border-color:#337ab7}.pagination>.disabled>a,.pagination>.disabled>a:focus,.pagination>.disabled>a:hover,.pagination>.disabled>span,.pagination>.disabled>span:focus,.pagination>.disabled>span:hover{color:#777;cursor:not-allowed;background-color:#fff;border-color:#ddd}.pagination-lg>li>a,.pagination-lg>li>span{padding:10px 16px;font-size:18px;line-height:1.3333333}.pagination-lg>li:first-child>a,.pagination-lg>li:first-child>span{border-top-left-radius:6px;border-bottom-left-radius:6px}.pagination-lg>li:last-child>a,.pagination-lg>li:last-child>span{border-top-right-radius:6px;border-bottom-right-radius:6px}.pagination-sm>li>a,.pagination-sm>li>span{padding:5px 10px;font-size:12px;line-height:1.5}.pagination-sm>li:first-child>a,.pagination-sm>li:first-child>span{border-top-left-radius:3px;border-bottom-left-radius:3px}.pagination-sm>li:last-child>a,.pagination-sm>li:last-child>span{border-top-right-radius:3px;border-bottom-right-radius:3px}.pager{padding-left:0;margin:20px 0;text-align:center;list-style:none}.pager li{display:inline}.pager li>a.pager li>{display:inline-block;padding:5px 14px;background-color:#fff;border:1px solid #ddd;border-radius:15px}.pager li>a:focus,.pager li>a:hover{text-decoration:none;background-color:#eee};
        </style>
        <style>
            .categories .ul {
                list-style: none;
                padding: 10px;
                width: 280px;
                height: 480px;
                font-family: 'Nunito Sans', sans-serif;
                overflow-y: auto;
                height: 400px;
            }

            .categories .ul .li {
                font-family: 'Nunito Sans', sans-serif;
                padding-bottom: 10px;
                font-size: 18px;
                padding: 10px 20px;
            }

            .categories .ul .li .span {
                display: flex;
                text-decoration: none;
                color: rgb(68, 67, 67);
                align-items: center;
                font-size: 15px;
            }

            .main-popup .popup-content .imgbox {
                padding-top: 0px;
                margin-top: 10px;
                display: flex;
                justify-content: center;
            }

            .main-popup .popup-content .imgbox .img {
                width: 375px;
                height: 250px;
                border-radius: 30px;
            }

            .main-popup {
                position: fixed;
                right: 0%;
                border-radius: 20px;
                top: 0%;
                height: 91.5%;
                width: 29%;
                z-index: 1;
                margin-right: 1px;
                background: rgb(255, 255, 255);
                padding: 25px 20px;
                line-height: 1rem;
                transform: translateX(100%);
            }

            .comments {
                float: none;
            }

            .commentdisplayBox .adminComment {
                margin: 0px;
            }

            .customerReview {
                padding-bottom: 20px;
            }

            .NoDisplayError {
                display: none;
            }

            .commentdisplayBox {
                margin-left: 20%;
            }

            .error {
                margin: 0px;
                font-size: 13px;
                color: red;
                margin: 10px;
                text-align: center;
            }

            .itemBar .item  {
                position: relative;              
            }

            .gift-icon {
                position: absolute;
                top: 0;
                right: 0;
            }

            .gift-icon img {
                width: 40px;
                height: 40px;
                border-radius:25px;
            }
        </style>


    </head>
    <section>
        <div class="priceFilterAndCategories">
            <div class="categories">
                <h3>Categories</h3>
                <ul class="ul">

                    @foreach ($categories as $category)
                        <li class="li">
                            <a href="/meal/{{ $category->id }}">

                                <img Width="30" Height="30" CssClass="img"
                                    src="{{ $category->subImage ? asset('storage/' . $category->subImage) : asset('/images/no-image.png') }}"
                                    alt="" />

                                {{ $category->name }}

                                Menu
                            </a>

                        </li>
                    @endforeach




                </ul>
            </div>
        </div>



        <div class="ItemBlock">

            <div class="itemBar" > 

                @forelse($meals as $meal)
                    <div class="item open-btn" id="meals">


                     
                        <a href="/mealpopup/{{ $meal->id }}">
                            <img src="{{ $meal->meal_image ? asset('storage/' . $meal->meal_image) : asset('/images/no-image.png') }}"
                                alt="" />

                            <div class="itemDetail">
                                {{ $meal->meal_name }}

                            </div>
                            <p class="price">RM{{ $meal->meal_price }}</p>
                        </a>
                        @foreach($mealFreeGifts as $mealFreeGift)
                        @if($meal->id == $mealFreeGift['meal_id'])
                        <div class="gift-icon">
                            <img src="../image/freegift.jpg" alt="Free Gift">
                        </div>
                        @endif
                        @endforeach
                    </button>

                    </div>
                @empty
                @endforelse


               








            </div>
        

        </div>


        @isset($popup)
        @include('meals.show')
        


        @endisset
    </section>


</x-layout-customer>

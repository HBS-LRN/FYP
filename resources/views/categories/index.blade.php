<!-- entend customer layout component using x- instead of using include -->

<x-layout-customer>

    <head>
        <link rel="stylesheet" href="../css/itemStyle.css">
        <style>
            .categories .ul .li .span {
                display: flex;
                text-decoration: none;
                color: rgb(68, 67, 67);
                align-items: center;
                font-size: 15px;
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


            <div class="itemCategoryBar">




                @foreach ($categories as $category)
                    <div class="item">

                        <a href="/meal/{{ $category->id }}">

                            <img src="{{ $category->subImage ? asset('storage/' . $category->image) : asset('/images/no-image.png') }}"
                                alt="" />
                            <div class="itemDetail">
                                {{ $category->name }}

                                Menu
                            </div>
                        </a>
                    </div>
                @endforeach





            </div>

        </div>


    </section>





</x-layout-customer>

import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client.js";
import { useEffect, useState } from "react";
import { Helmet } from 'react-helmet';
import 'aos/dist/aos.css';




export default function CategoryMenuCard() {



    //react declaration
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);




    //fetch categories data
    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {

        console.log("getting")
        setLoading(true)
        try {
            await axiosClient.get(`category`)
                .then(({ data }) => {
                    console.log(data)
                    setLoading(false)
                    setCategories(data)
                });
        } catch (error) {
            const response = error.response;
            console.log(response);
            setLoading(false)
        }
    }



    return (



        <div>

            <section className="hero-section about checkout" style={{ backgroundImage: 'url(../assets/img/background-3.png)' }}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-lg-12">
                            <div class="about-text pricing-table">
                                <ul class="crumbs d-flex" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
                                    <li><a href="index.html">Home</a></li>

                                    <li class="two"><a href="index.html"><i class="fa-solid fa-right-long"></i>Category</a></li>

                                </ul>
                                <h2 data-aos="fade-up" data-aos-delay="300" data-aos-duration="400">Category List</h2>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="tabs">

                <div class="container">

                    <div class="tabs-img-back">

                        <div class="row">



                            <div class="col-lg-12">

                                <div class="tab-content" id="v-pills-tabContent" >

                                    <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div class="row">

                                            {loading &&
                                                <div class="text-center">
                                                    <div class="loaderCustom2"></div>
                                                </div>
                                            }

                                            {!loading && categories
                                                .filter(category => category.id !== 8)
                                                .map((category) => (
                                                    <div class="col-xl-4 col-lg-6 custom-menu-margin" data-aos="flip-up" data-aos-delay="200" data-aos-duration="300">
                                                        <div class="dish category">
                                                            <a href={`/orderMenuCard/${category.id}`}>
                                                                <img alt="food-dish" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${category.image}`} width="300" height="340" />
                                                            </a>
                                                            <div class="dish-foods">
                                                                <h3>{category.name} Menu</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <br />

            <br />


            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/itemStyle.css" />

            </Helmet>
        </div>


    );

}
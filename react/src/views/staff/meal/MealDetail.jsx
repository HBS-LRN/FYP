import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 
import React from 'react';
import { Helmet } from 'react-helmet';


export default function MealDetail() {
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [meal, setMeal] = useState({
        meal_price: 0,
        meal_name: '',
        meal_desc: '',
        total_calorie: 0,
        meal_image: null,

    }); 
    const [category, setcategory] = useState({
        name: '',
        iconImage: null,
        Image: null,
    }); 
    const [mealIngredient, setMealIngredient] = useState([]); 
    const [mealOrderDetail, setMealOrderDetail] = useState([]); 
    const [commandModes, setCommandModes] = useState([]);
   
    const [loading, setLoading] = useState(true);
    // New state to track the command text
    const [commandText, setCommandText] = useState('');
    let { id } = useParams(); 
    useEffect(() => {
        getMeal();
        getIngredient();
        getMealOrderDetail();
       
      }, [id, commandModes]);

    const getMeal = () => {
        axiosClient.get(`/meal/${id}`)
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
                setMeal(data);
                axiosClient.get(`/category/${data.category_id}`)
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
                setcategory(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }
    
    const getIngredient =()=>{
        axiosClient.get(`/getMealIngredient/${id}`)
            .then(({ data }) => {
                console.log('API Response Meal Ingredient:', data); // Add this line
                setLoading(false);
                setMealIngredient(data);
               
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }
    var CurrentTotalOrder=0;
    var totalCommands=0;
    const getMealOrderDetail = ()=>{
        axiosClient.get(`/getMealOrder/${id}`)
            .then(({ data }) => {
                console.log('getMealOrderDetail', data); // Add this line
                setLoading(false);
                setMealOrderDetail(data.meal_order_details);
                
                
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
            
    }
    const selectedreplyCommandBox = document.querySelectorAll('.replyCommandBox');
    const mdiMessageText = document.querySelectorAll('.mdi-message-text');
    console.log("mdiMessageText",mdiMessageText);
    const submitCommand = (itemId) => {
        // Call your API to update MealOrderDetail with the commandText for the specific itemId
        axiosClient.put(`/mealOrderDetail/${itemId}`, { reply_comment: commandText })
            .then(response => {
                const activeData = {
                    user_id:user.id,
                    Action: "Reply the customer's command", 
                    ActionIcon:"fa-solid fa-pen"
                }

                axiosClient.post('/postStaffAtivitiFeed', activeData)
                .then(res => {
                
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false); 
                });

                console.log(response.data);  // Log the response
                // If the command submission was successful, you might want to update the UI accordingly
                getMealOrderDetail();
                setCommandModes((prevModes) => {
                    const newModes = [...prevModes];
                    newModes[itemId] = false;
                    return newModes;
                  });
            })
            .catch(error => {
                console.error('Error submitting command:', error);
                // Handle error, show a message to the user, etc.
            });

        
        
    };
    const toggleCommandMode = (index) => {
        if(selectedreplyCommandBox[index].style.display=="none"){
            selectedreplyCommandBox[index].style.display="block";
            mdiMessageText[index].style.color="blue";
        }else{
            selectedreplyCommandBox[index].style.display="none";
            mdiMessageText[index].style.color="grey";
        }
      };

let totalRating = 0;
let numRatings = 0;
const reviews =
  mealOrderDetail && mealOrderDetail.length > 0
    ? mealOrderDetail.map((item,index) => {
        CurrentTotalOrder += item.order_quantity;
        if (item.rating_comment !== null) {
            totalCommands += 1;
          // Increment the totalRating and numRatings for each valid rating
          totalRating += item.rating_star;
          numRatings += 1;
        }

        return item.rating_comment !== null ? (
          <div className="d-flex border-bottom pb-3" key={item.meal_order_detail_id}>
            <div className="flex-1">
              <React.Fragment>
                <h5 className="font-size-15 mb-3">{item.username}</h5>
                <p className="text-muted mb-2">{item.rating_comment}</p>

                <ul className="list-inline product-review-link mb-0">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="mdi mdi-thumb-up align-middle me-1" /> Like
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a onClick={() => toggleCommandMode(index)}>
                      <i
                        className="mdi mdi-message-text align-middle me-1"
                        
                      />{' '}
                      Comment
                    </a>
                  </li>
                </ul>

                {item.reply_comment && (
                  <div className="commandBox Flex">
                    <img
                      src="../../../assets/img/GrandImperialGroupLogoHeader.png"
                      alt=""
                      height="45px"
                      width="45px"
                    />
                    <p className="text-muted mb-2">{item.reply_comment}</p>
                  </div>
                )}


                  <div className="replyCommandBox">
                    <textarea
                      placeholder="Enter Your Command Here......"
                      name="reply_comment"
                      className="reply_comment"
                      id={`reply_comment_${item.meal_order_detail_id}`}
                      onChange={(e) => setCommandText(e.target.value)}
                    />
                   
                    <button
                      className="rate_commandBtn"
                      onClick={() => submitCommand(item.meal_order_detail_id)}
                    >
                      Command
                    </button>
                  </div>
             
              </React.Fragment>
            </div>
            <p className="float-sm-end font-size-12">{item.created_at}</p>
          </div>
        ) : null;
      })
    : '';

    const averageRating = numRatings > 0 ? totalRating / numRatings : 0;

// Render the stars based on the average rating
const starIcons = Array.from({ length: 5 }, (_, index) => (
  <span
    key={index}
    className={`mdi mdi-star ${index < averageRating ? 'text-warning' : ''}`}
  />
));
  
    return (
        <div>
            <Helmet>
                <link rel="stylesheet" href="../../../assets/css/addMeal.css" />
            </Helmet>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0">Meal Detail</h4>
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="javascript: void(0);">Meal</a>
                                            </li>
                                            <li className="breadcrumb-item active">Meal Detail</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xl-5">
                                         
                                                       <div className="product-detail">
                                                    <div className="row">
                                                        
                                                        <div className="col-md-8 col-9">
                                                            <div className="tab-content" id="v-pills-tabContent">
                                                                <div
                                                                    className="tab-pane fade show active"
                                                                    id="product-1"
                                                                    role="tabpanel"
                                                                >
                                                                    <div className="product-img">
                                                                        <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${meal.meal_image}`}  alt="" srcset=""/>
                                                                    </div>
                                                                </div>
                                                                
                                                               
                                                                
                                                            </div>
                                                           
                                                        </div>
                                                    </div>
                                                    </div>
                                             
                                                {/* end product img */}
                                            </div>
                                            <div className="col-xl-7">
                                                <div className="mt-4 mt-xl-3">
                                                    <a href="#" className="text-primary">
                                                        {category.name}
                                                    </a>
                                                    <h5 className="mt-1 mb-3">
                                                       {meal.meal_name}
                                                    </h5>
                                                    <div className="d-inline-flex">
                                                        <div className="text-muted me-3">
                                                        {starIcons}
                                                        </div>
                                                        <div className="text-muted">({totalCommands})</div>
                                                    </div>
                                                    <h5 className="mt-2">
                                                       RM {meal.meal_price}
                                                        
                                                    </h5>
                                                   
                                                    <hr className="my-4" />
                                                    <div className="row">
                                                        <div className="col-md-6">

                                                        <div>
                                                            <h5 className="font-size-14">Ingredient :</h5>
                                                            <ul className="list-unstyled product-desc-list">
                                                                {mealIngredient ? (
                                                                mealIngredient.map((item) => (
                                                                    <li>
                                                                    <i className="mdi mdi-circle-medium me-1 align-middle" />
                                                                    {item.ingredient.ingredient_name} <span>{"{"+item.meal_ingredient.cookMethod+"}"}</span>
                                                                    </li>
                                                                    
                                                                ))
                                                                ) : <div></div>}
                                                            </ul>
                                                            </div>

                                                        </div>
                                                        
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        {/* end row */}
                                        <div className="mt-4">
                                            <h5 className="font-size-14 mb-3">Product description: </h5>
                                            <div className="product-desc">
                                                <ul className="nav nav-tabs nav-tabs-custom" role="tablist">
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link"
                                                            id="desc-tab"
                                                            data-bs-toggle="tab"
                                                            href="#desc"
                                                            role="tab"
                                                        >
                                                            Description
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link active"
                                                            id="specifi-tab"
                                                            data-bs-toggle="tab"
                                                            href="#specifi"
                                                            role="tab"
                                                        >
                                                            Specifications
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content border border-top-0 p-4">
                                                    <div className="tab-pane fade" id="desc" role="tabpanel">
                                                        <div>
                                                           {meal.meal_desc}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="tab-pane fade show active"
                                                        id="specifi"
                                                        role="tabpanel"
                                                    >
                                                        <div className="table-responsive">
                                                            <table className="table table-nowrap mb-0">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row" style={{ width: 400 }}>
                                                                            Category
                                                                        </th>
                                                                        <td>{category.name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Total Calorie</th>
                                                                        <td>{meal.total_calorie} gram</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Current Total Order </th>
                                                                        <td>{CurrentTotalOrder}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Material</th>
                                                                        <td>Cotton</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">Weight</th>
                                                                        <td>140 Gm</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="updateMealBtnBox">
                                            <a className="updateMealBtn" href={`/updateMeal/${id}`}>Update Meal</a>
                                            </div>
                                            
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="font-size-14">Reviews : </h5>
                                            <div className="d-inline-flex mb-3">
                                                <div className="text-muted me-3">
                                                    {starIcons}
                                                </div>
                                                <div className="text-muted">( {totalCommands} customer Review)</div>
                                            </div>
                                            <div className="border p-4 rounded">
                                               {reviews}
                                               
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* end card */}
                            </div>
                        </div>
                        
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                {/* End Page-content */}
            </div>

        </div>





    );
}

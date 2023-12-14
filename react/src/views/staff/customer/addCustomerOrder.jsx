import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../../contexts/ContextProvider.jsx";
import axiosClient from "../../../axios-client.js";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import Modal from 'react-modal';
import { useNotificationContext } from "../../../contexts/NotificationProvider.jsx";

export default function AddCustomerOrder() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categorytList, setCategorytList] = useState([]);
    const [mealList, setMeal] = useState([]); 
    const [shopingCart,setShopingCart] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]); 
    const [searchQuery, setSearchQuery] = useState('');
    const [ingredientOption, setIngredientOption] = useState([]);
    const [customerAllergies,setCustomerAllergies] = useState([]);
    const { user, token, setToken, setCartQuantity } = useStateContext();
    const [custEmailOption,setCustEmailOption] = useState([]);
    const [custNameOption,setCustNameOption] = useState([]);
    const [custContactOption,setCustContactOption] = useState([]);
    const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
    const [states, setStates] = useState([]); 
    const [newStreetAddress, setNewStreetAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newState, setNewState] = useState('');
    const [newPostcode, setNewPostcode] = useState('');
    const { setWarningNotification, setFailNotification } = useNotificationContext();
    const [streetAddressOption, setStreetAddressOption] = useState([]);
    const [cityOption, setCityOption] = useState([]);
    const [stateOption, setStateOption] = useState([]);
    const [postcodeOption, setPostcodeOption] = useState([]);
    const [newCustomerName, setCustomerName] = useState('');
    const [newCustomerEmail, setCustomerEmail] = useState('');
    const [newCustomerContact, setCustomerContact] = useState('');
   
    const [validEmail,setValidEmail] =useState(true);
    const [validName,setValidName] =useState(true);
    const [validContact,setValidContact] =useState(true);
    const [filteredCustomers, setFilteredCustomers] = useState({});
    const [isAddressFormOpen, setAddressFormOpen] = useState(false);
    const categoryClick = (categoryId) => {
       
        const newSelectedCategory = selectedCategory === categoryId ? null : categoryId;
        setSelectedCategory(newSelectedCategory);
        setIsFilterActive(newSelectedCategory !== null); 
        filterMeals(newSelectedCategory);
    }
    const getUserOptions = () => {
        axiosClient.get('/getAlluser')
            .then(({ data }) => {
                const contact = data.customers
                .filter(item => item.phone !== null)
                .map(item => ({
                    value: item.phone,
                    label: item.phone,
                }));
                setCustContactOption(contact);
                const name = data.customers.map(item => ({
                    value: item.name,
                    label: item.name,
                }));
                setCustNameOption(name);
                const email = data.customers.map(item => ({
                    value: item.email,
                    label: item.email,
                }));
                setCustEmailOption(email);
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    };
    const filterMeals = (categoryId) => {
        let filterChange;
        if (searchQuery !=null) {
            filterChange = mealList.filter((meal) =>
                meal.meal_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        if (categoryId !== null) {
            filterChange = mealList.filter((meal) =>
                categoryId === null || meal.category_id === categoryId
            );
        }
        setFilteredMeals(filterChange);
    };
    console.log("filteredMeals",filteredMeals);
    const applyPriceFilter = () => {
        let updatedFilteredMeals;
        if (selectedCategory !== null) {
            const filteredByCategory = filteredMeals.filter((meal) => {
                return selectedCategory === null || meal.category_id === selectedCategory;
            });
        
            updatedFilteredMeals = filteredByCategory.filter((meal) => {
                const mealPrice = parseFloat(meal.meal_price);
                return (isNaN(minPrice) || mealPrice >= parseFloat(minPrice)) && (isNaN(maxPrice) || mealPrice <= parseFloat(maxPrice));
            });
        } else {
            // When no category is selected, filter by price range only.
            updatedFilteredMeals = mealList.filter((meal) => {
                const mealPrice = parseFloat(meal.meal_price);
                return (
                    (isNaN(minPrice) || mealPrice >= parseFloat(minPrice)) &&
                    (isNaN(maxPrice) || mealPrice <= parseFloat(maxPrice))
                );
            });
        }
    
        setFilteredMeals(updatedFilteredMeals);
        setIsFilterActive(true);
    }
    // searching function
    const handleSearchChange = (e) => {
        const query = e.target.value;

        setSearchQuery(query);

        // If the query is empty, clear the filter
        if (query == null) {
            clearFilter();
            return;
        }

        axiosClient.get(`/mealSearch?searchQuery=${query}`)
            .then((response) => {
                setFilteredMeals(response.data);
            })
            .catch((error) => {
                console.error('Error searching meals:', error);
            });
    };
    const clearFilter = () => {
        setSelectedCategory(null);
        setIsFilterActive(false);
        setMinPrice('');
        setMaxPrice('');
        setFilteredMeals(mealList);
    }
    
    useEffect(() => {
        getUserOptions();
        getCategory();
        getMeal();
        setIsFilterActive(false);
        selectAllergies();
        getState();
    },[])

    // get Categorylist
    const getCategory = () => {
        axiosClient.get('/category')
            .then(({ data }) => {
                console.log('API Response:', data); 
                setLoading(false);
                setCategorytList(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });

            axiosClient.get(`/userShoppingCart/${user.id}`)
            .then(({ data }) => {
                console.log('shoppingCart:', data); 
                setShopingCart(data);
            
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
            
    }
    var categoryDetail = "";
    categoryDetail = categorytList.map((item) => (
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button
                    className={`accordion-button ${selectedCategory === item.id ? '' : 'collapsed'}`}
                    type="button" data-bs-toggle="collapse"
                    data-bs-target={`#collapse${item.id}`}
                    aria-expanded={selectedCategory === item.id ? 'true' : 'false'}
                    aria-controls={`collapse${item.id}`}
                    onClick={() => categoryClick(item.id)}
                >
                    <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.iconImage}`}  alt="" srcset="" height="20px" width="20px" /> {item.name}
                </button>
            </h2>
        </div>
    ));
    // get meal List
    const getMeal = () => {
        axiosClient.get('/meal')
            .then(({ data }) => {
                console.log('API Response:', data); // Add this line
                setLoading(false);
                setMeal(data);
                setFilteredMeals(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error('API request error:', error);
            });
    }
    // ... (previous code remains unchanged)

// Updated selectAllergies function using HTML select
const selectAllergies = async () => {
    try {
        const ingredientsResponse = await axiosClient.get('/ingredients');
        console.log('ingredients Response:', ingredientsResponse.data);
        setLoading(false);
        setIngredientOption(ingredientsResponse.data);

        const select = document.createElement('select');
        select.multiple = true;
        select.className = 'allergiesOption';

        ingredientsResponse.data.forEach((ingredient) => {
            const option = document.createElement('option');
            option.value = ingredient.ingredient_name;
            option.text = ingredient.ingredient_name;
            select.appendChild(option);
        });

        const result = await Swal.fire({
            title: 'Select customer allergies',
            html: select,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                return Array.from(select.selectedOptions).map((option) => option.value);
            },
        });

        if (result.value) {
            const selectedOptions = result.value;
            console.log("selectedAllergies", selectedOptions);
            setCustomerAllergies(selectedOptions);

            Swal.fire({
                title: 'Selected Allergies',
                text: selectedOptions.join(', '), // Display the selected allergies as a comma-separated string
            });
        }
    } catch (error) {
        setLoading(false);
        console.error('API request error:', error);
    }
    
};
const getState = async()=>{
    try {
        await axiosClient.get("/state")
            .then(({ data }) => {
                console.log(data)
               const stateOption = data.map((item)=>({
                    value: item.state_name,
                    label: item.state_name
                }));
                setStates(data);
                setStateOption(stateOption)
                setLoading(false);
            });
    } catch (error) {
        setLoading(false);
        const response = error.response;
        console.log(response);
    }
}
const filterCustomers = (data) => {

    const serializedData = JSON.stringify(data);
    axiosClient.get(`/filterUser/${serializedData}`)
        .then(({ data }) => {
            console.log('filter data:', data.filteredUsers);
            setFilteredCustomers(data.filteredUsers);
        })
        .catch((error) => {
            console.error('API request error:', error);
        });
};
const setNewCustomerName = (newValue, callback) => {
    setCustomerName(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newValue, phone: newCustomerContact, email: newCustomerEmail });
};

const setNewCustomerEmail = (newValue, callback) => {
    setCustomerEmail(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newCustomerName, phone: newCustomerContact, email: newValue });
};

const setNewCustomerContact = (newValue, callback) => {
    setCustomerContact(newValue);
    if (callback) {
        callback(newValue);
    }
    filterCustomers({ name: newCustomerName, phone: newValue, email: newCustomerEmail });
};
const handleStreetAddressChange = (newValue, callback) => {
    setNewStreetAddress(newValue);
    if (callback) {
        callback(newValue);
    }
};

const handleCityChange = (newValue, callback) => {
    setNewCity(newValue);
    if (callback) {
        callback(newValue);
    }
};

const handleStateChange = (newValue, callback) => {
    setNewState(newValue);
    if (callback) {
        callback(newValue);
    }
};

const handlePostalCodeChange = (newValue, callback) => {
    setNewPostcode(newValue);
    if (callback) {
        callback(newValue);
    }
};
const customModalStyles = {
    content: {
      width: '600px', // Set the width according to your needs
      margin: '180px auto',
      height: '55%'
    
    },
  };
  const AddressForm = ({ isOpen, onRequestClose }) => {
    const [errors, setErrors] =useState({});
    const handleCancel = () => {
      onRequestClose();
    };
  
    console.log("filteredCustomers",filteredCustomers);
    const handleOrder = async () => {
        const newErrors = {};
        var order ={}
         const address = {
            street: newStreetAddress,
            city: newCity,
            state: newState,
            postcode: newPostcode,
        };
        if(!address.street){
            newErrors.street = "Street are required.";
        }
        if(!address.city){
            newErrors.city = "City are required.";
        }
        if(!address.state){
            newErrors.state = "State are required.";
        }
        if(!address.postcode){
            newErrors.postcode = "Postal code are required.";
        }
        if(Object.keys(newErrors).length ===0){
            const location = await validateAddress(address);

            if (location) {
                const selectedState = states.find((state) => state.state_name === newState);
                if(filteredCustomers.length>0){
                    order = {
                        ...address,
                        user_id: filteredCustomers[0].id,
                        admin_id: user.id,
                        username: newCustomerName,
                        userphone:newCustomerContact,
                        useremail:newCustomerEmail,
                        delivery_fee: selectedState.delivery_fee,
                        customer_latitude: location.latitude,
                        customer_longitude: location.longitude,
    
                    };
                }else{
                    order = {
                        ...address,
                        user_id: null,
                        admin_id: user.id,
                        username: newCustomerName,
                        userphone:newCustomerContact,
                        useremail:newCustomerEmail,
                        delivery_fee: selectedState.delivery_fee,
                        customer_latitude: location.latitude,
                        customer_longitude: location.longitude,
    
                    };
                }
                let timerInterval;
                Swal.fire({
                title: "Waiting process",
                html: "Left <b></b> seconds.",
                timer: 5000, // Set the timer to 5 seconds (5000 milliseconds)
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                    timer.textContent = `${(Swal.getTimerLeft() / 1000).toFixed(0)}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
                }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("The alert was closed by the timer");
                }
                });
                axiosClient.post('/adminOrder', order)
                .then(res => {
                    const activeData = {
                        user_id:user.id,
                        Action: "Added customer order", 
                        ActionIcon:"fa-solid fa-upload"
                    }
                    getCategory();
                    axiosClient.post('/postStaffAtivitiFeed', activeData)
                    .then(res => {
                        onRequestClose();
                        console.log(res.message);
                        // Show SweetAlert success message
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'New order have been successfully added!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLoading(false); 
                    });
                    
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.data); // This will log the response data from the server.
                        console.log(error.response.status); // This will log the HTTP status code.
                    } else if (error.request) {
                        console.log(error.request); // This will log the request made but no response was received.
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error); // This will log the Axios request config.
                    setLoading(false);
                });

                console.log("order",order);
            }else{
                setFailNotification(
                    "Opps, Invalid address!",
                    "Please enter a valid address or address within Selangor or Kuala Lumpur only"
                );
            }

        }else{
            setErrors(newErrors);
        }
       console.log("address",address);
         
    //   onRequestClose();
    };
   
      
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles}>
        <form>
            <h1 className="formTitle"><span className="next">Customer'info Form<i class="fa-solid fa-chevron-right"></i></span><span className="center">Address Form</span><span className="next"></span></h1>
            <div className="FlexColumn">
                    <label htmlFor="streetAddress">Street Address:</label>
                    <CreatableSelect
                        onChange={(selectedOption)=>handleStreetAddressChange(selectedOption.value)}
                        // Add options from filteredCustomers.addresses for street address
                        isSearchable
                        options={[...streetAddressOption,{ 
                            value: newStreetAddress,
                            label: newStreetAddress 
                            }]}
                            value={
                                newStreetAddress?{ 
                                    value: newStreetAddress,
                                    label: newStreetAddress 
                                    }:''
                               }
                    />
                    {errors.street && <div className="error">{errors.street}</div>} 
                </div>
                <div className="FlexColumn">
                    <label htmlFor="city">City:</label>
                    <CreatableSelect
                        // Add options from filteredCustomers.addresses for city
                        isSearchable
                        options={[...cityOption,{ 
                            value: newCity,
                            label: newCity 
                            }]}
                            value={
                                newCity?{ 
                                    value: newCity,
                                    label: newCity 
                                    }:''
                               }
                        onChange={(selectedOption)=>handleCityChange(selectedOption.value)}

                    />
                    {errors.city && <div className="error">{errors.city}</div>} 
                </div>
                <div className="FlexColumn">
                    <label htmlFor="state">State:</label>
                    <Select
                        name="state"
                        isSearchable
                        options={[...stateOption,{ 
                            value: newState,
                            label: newState 
                            }]}
                        value={
                            newState?{ 
                                value: newState,
                                label: newState 
                                }:''
                            }
                   
                        onChange={(selectedOption)=>handleStateChange(selectedOption.value)}
                    />
                {errors.state && <div className="error">{errors.state}</div>} 
                </div>
                <div className="FlexColumn">
                    <label htmlFor="postalCode">Postal Code:</label>
                    <CreatableSelect
                        onChange={(selectedOption)=>handlePostalCodeChange(selectedOption.value)}
                        // Add options from filteredCustomers.addresses for postal code
                        options={[...postcodeOption,{ 
                            value: newPostcode,
                            label: newPostcode 
                            }]}
                        isSearchable
                        value={
                            newPostcode?{ 
                                value: newPostcode,
                                label: newPostcode 
                                }:''
                           }
                          
                    />
                     {errors.postcode && <div className="error">{errors.postcode}</div>} 
                </div>
          <div className="FlexButton">
          <button type="button" className="previous" onClick={startOrder}>
            Previous
          </button>
          <button type="button" className="order" onClick={handleOrder}>
            Order
          </button>
          <button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          </div>
        </form>
      </Modal>
    );
  };

const OrderForm = ({ isOpen, onRequestClose }) => {
    const [errors, setErrors] = useState({});
    const handleCancel = () => {
      onRequestClose();
    };
    
    const handleProcess = () =>{
        
            const newErrors = {};
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const contactRegex = /^\d{3}-\d{7}|\d{3}-\d{8}$/;
            if (!newCustomerName) {
                newErrors.name="Name is required";
            }
    
            if (!newCustomerEmail) {
                newErrors.email ="Customer email are required";
            } else {
                 if (!emailRegex.test(newCustomerEmail)) {
                    newErrors.email= "Invalid Email format";
                }
            }
            if (!newCustomerContact) {
                newErrors.contact="Contact is required";
            } else{
                if (!contactRegex.test(newCustomerContact)) {
                    newErrors.contact="Invalid Contact Number";
                }
            } 
            

        if (Object.keys(newErrors).length ===0) {
            if (
                filteredCustomers &&
                filteredCustomers[0]?.addresses &&
                filteredCustomers[0]?.addresses.length > 0
              ) {
                const street = filteredCustomers[0]?.addresses.map((item) => ({
                  value: item.street,
                  label: item.street,
                }));
                setStreetAddressOption(street);
            
                const city = filteredCustomers[0]?.addresses.map((item) => ({
                  value: item.city,
                  label: item.city,
                }));
                setCityOption(city);
            
             
                const postcode = filteredCustomers[0]?.addresses.map((item) => ({
                  value: item.postcode,
                  label: item.postcode,
                }));
                setPostcodeOption(postcode);
              }else{
                setPostcodeOption('');
                setCityOption('');
                setStreetAddressOption('');

              }
            processAddress();
        }else{
            setErrors(newErrors);
        }
       
    }
  
    
    return (
      <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customModalStyles}>
        <form>
            <h1 className="formTitle"><span className="next"></span><span className="center">Customer'info Form</span><span className="next"><i class="fa-solid fa-chevron-right"></i>Address Form</span></h1>
          <div className="FlexColumn">
            <label htmlFor="userName">Name:</label>
            <CreatableSelect
                className={validName?'':'error'}
                options={[...custNameOption, { value: newCustomerName, label: newCustomerName }]}
                isSearchable
                onChange={(selectedOption) => setNewCustomerName(selectedOption.value)}
                value={newCustomerName?{ value: newCustomerName, label: newCustomerName }:''}
            />
              {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="FlexColumn">
            <label htmlFor="userContact">Email:</label>
            <CreatableSelect
                className={validEmail?'':'error'}
                options={[...custEmailOption, { value: newCustomerEmail, label: newCustomerEmail }]}
                isSearchable
                onChange={(selectedOption) => setNewCustomerEmail(selectedOption.value)}
                value={newCustomerEmail?{ value: newCustomerEmail, label: newCustomerEmail }:''}
            /> {errors.email && <div className="error">{errors.email}</div>} 
          </div>
          <div className="FlexColumn">
            <label htmlFor="userNotes">Contact:</label>
            <CreatableSelect
                className={validContact?'':'error'}
                options={[...custContactOption,{ 
                    value: newCustomerContact,
                    label: newCustomerContact 
                    }]}
                isSearchable
                onChange={(selectedOption) => setNewCustomerContact(selectedOption.value)}
                value={
                newCustomerContact?{ 
                    value: newCustomerContact,
                    label: newCustomerContact 
                    }:''
                }
            />
            {errors.contact && <div className="error">{errors.contact}</div>} 
          </div>
          <div className="FlexButton">
          <button type="button" className="order" onClick={handleProcess}>
            Process
          </button>
          <button type="button" className="cancel" onClick={handleCancel}>
            Cancel
          </button>
          </div>
        </form>
      </Modal>
    );
  };

const addToCart = (meal)=>{
    Swal.fire({
        title: "Enter the order quantity",
        input: "number",
        inputAttributes: {
            autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Submit",
        showLoaderOnConfirm: true,
        preConfirm: (quantity) => {
            
            return axiosClient.post('/shoppingCart', {
                user_id: user.id,
                meal_id: meal.id,
                shopping_cart_qty: quantity
            })
            .then(response => {
                // Handle the success response
                console.log("add to cart successfully:", response.data);
                getCategory();
                Swal.fire({
                    title: 'Added into the cart.',
                    icon: 'success',
                });
            })
                
        }
    });
}
const validateAddress = async (address) => {
    const apiKey = 'AIzaSyBEks4sU0u5DEF9wxLV5jeeGFVEnMaCH6g'; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.street)},${encodeURIComponent(address.city)},${encodeURIComponent(address.state)},${encodeURIComponent(address.postcode)}&key=${apiKey}`;
    const validStates = ["Selangor", "Kuala Lumpur"];

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("geodata", data);

        if (data.status === "OK" && data.results && data.results.length > 0) {
            const firstResult = data.results[0];

            // Check if the first result has more than 3 address components
            if (firstResult.address_components && firstResult.address_components.length > 3) {
                const isWithinValidStates = firstResult.address_components.some((component) => {
                    return validStates.includes(component.long_name);
                });

                if (isWithinValidStates) {
                    return {
                        latitude: firstResult.geometry.location.lat,
                        longitude: firstResult.geometry.location.lng,
                    };
                }
            }
        }
    } catch (error) {
        console.log("geoerror", error);
    }

    return null; // Default to null for an invalid address or when the condition is not met
};

    const CheckAllargiesAndOrder = async (meal) =>{
        const commonAllergies = customerAllergies.filter(allergy =>
            meal.meal_ingredients.some(ingredient => ingredient.ingredient.ingredient_name === allergy)
        );
            console.log("commonAllergies",commonAllergies);
            if(commonAllergies.length>0){
                Swal.fire({
                    title: "This Meal have included Customer's allergie/s.",
                    text: "This meal have "+commonAllergies.join(', ')+"do you sure to order?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Order"
                  }).then((result) => {
                    if (result.isConfirmed) {
                        addToCart(meal);
                    }
                  });

            }else{
                addToCart(meal);
            }
    }
    // const startOrder = async () => {
    //     console.log('Starting order...');
    //     console.log('CustNameOption:', custNameOption);
    //     console.log('CustEmailOption:', custEmailOption);
    //     console.log('CustContactOption:', custContactOption);
    // };
    const startOrder = () => {
        closeProcessAddress();
        setIsOrderFormOpen(true);
      };
      const processAddress = () => {
        closeOrderForm();
        setAddressFormOpen(true);
      };
      const closeOrderForm = () => {
        setIsOrderFormOpen(false);
      };
      const closeProcessAddress = () => {
        setAddressFormOpen(false);
      };
      const submitOrder = (formData) => {
        // Handle the submitted form data here
        console.log('Submitted Form Data:', formData);
        // Add your logic for processing the order with user information here
      };
    
    const clearCart = () => {
        axiosClient.delete(`/clearShoppingCart/${user.id}`)
            .then((response) => {
                getCategory();
                    Swal.fire({
                        title: "Cleared!",
                        text:  "Shopping Cart has been clear.",
                        icon: "success"
                      });

            })
            .catch((error) => {
                console.error('Error deleting meal:', error);
            });
    }
      console.log("customerAllergies",customerAllergies);

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
                                    <h4 className="mb-sm-0">Customer Order</h4>
                                    <div className="shoppingCart">
                                    {shopingCart.length>0?<i class="fa-solid fa-trash" onClick={clearCart}><b>Clear Cart</b></i>:''}
                                        <i class="fa-solid fa-cart-shopping" onClick={startOrder}></i>
                                        {shopingCart.length>0?<span className="numberOrder">{shopingCart.length}</span>:''}
                                        </div>
                                        <OrderForm isOpen={isOrderFormOpen} onRequestClose={closeOrderForm} onSubmit={submitOrder} />
                                        <AddressForm isOpen={isAddressFormOpen} onRequestClose={closeProcessAddress} />
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-xl-3 col-lg-4">
                                <div className="card">

                                    <div className="card-header bg-transparent border-bottom">
                                        <h5 className="mb-0">Filters</h5>
                                       
                                   
                                    </div>
                                    <div className="card-body">
                                        <div className="flexBox">
                                        <h5 >Categories</h5> 
                                        {isFilterActive && (
                                            <button className="clearfilterBtn" onClick={() => clearFilter()}>
                                                <i className="fas fa-trash-alt"></i> Clear Filter
                                            </button>
                                        )}
                                        </div>
                                        
                                        
                                        <div className="accordion ecommerce" id="accordionExample">


                                            {loading ? (
                                                <tr>
                                                    <td colSpan="4">Loading...</td>
                                                </tr>
                                            ) : (
                                                categoryDetail
                                            )}



                                        </div>
                                    </div>
                                    <div className="card-body border-top">
                                        <div>
                                        <div className="flexBox">
                                            <h5>Price</h5>
                                            <button onClick={applyPriceFilter} className="pricFilterBtn"><i class="fas fa-funnel-dollar"></i> Apply Filter</button>
                                            </div>
                                            
                                            <div className="PriceRange">
                                                <input type="number" id="pricerangeTop" className="pricerangeTop" placeholder="Start Prices" 
                                                value={minPrice}
                                                onChange={(e) => setMinPrice(e.target.value)}/> -
                                                <input type="number" id="pricerangeBottom" className="pricerangeBottom" placeholder="End Prices" 
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(e.target.value)}
                                                />

                                            </div>

                                        </div>
                                    </div>
                                    <div className="custom-accordion">


                                        <div className="card-body border-top">
                                            <div>
                                                <h5 className="font-size-14 mb-0"><a href="#collapseExample3" className="collapsed text-dark d-block" data-bs-toggle="collapse">Customer Rating <i className="mdi mdi-minus float-end accor-plus-icon" /></a></h5>
                                                <div className="collapse" id="collapseExample3">
                                                    <div className="mt-4">
                                                        <div className="form-check mt-2">
                                                            <input type="radio" id="productratingRadio1" name="productratingRadio1" className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="productratingRadio1">4 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                        </div>
                                                        <div className="form-check mt-2">
                                                            <input type="radio" id="productratingRadio2" name="productratingRadio1" className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="productratingRadio2">3 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                        </div>
                                                        <div className="form-check mt-2">
                                                            <input type="radio" id="productratingRadio3" name="productratingRadio1" className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="productratingRadio3">2 <i className="mdi mdi-star text-warning" />  &amp; Above</label>
                                                        </div>
                                                        <div className="form-check mt-2">
                                                            <input type="radio" id="productratingRadio4" name="productratingRadio1" className="form-check-input" />
                                                            <label className="form-check-label" htmlFor="productratingRadio4">1 <i className="mdi mdi-star text-warning" /></label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card">
                                    <div className="card-body">
                                        <div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div>
                                                        <h5>Meal List</h5>
                                                        <ol className="breadcrumb p-0 bg-transparent mb-2">
                                                            <li className="breadcrumb-item"><a href="javascript: void(0);">Meat</a></li>

                                                        </ol>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-inline float-md-end">
                                                        <div className="search-box ms-2">
                                                            <div className="position-relative">
                                                                <input type="text" 
                                                                className="form-control rounded" 
                                                                placeholder="Search..."  
                                                                value={searchQuery}
                                                                onChange={handleSearchChange}/>
                                                                <i className="mdi mdi-magnify search-icon" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* meal List Start */}
                                            <div className="row g-0 mealListOverflow">
                                            {loading ? (
                                                <div>Loading...</div>
                                            ) : (filteredMeals.length > 0) ? (                   
                                                 // Render the filtered meals
                                                 filteredMeals.map((item) => (
                                                    
                                                        <div className="product-box col-xl-4 col-sm-6">
                                                            
                                                            <div className="product-img">
                                                            <div className="product-like" >
                                                                       
                                                                       
                                                                            </div>
                                                                            <a className="mealBtn" onClick={() => CheckAllargiesAndOrder(item)}>

                                                                {/* <div className="product-ribbon badge bg-primary">
                                                                    - 25 %
                                                                </div> */}                                                                                                    
                                                                
                                                                                <img src={`${import.meta.env.VITE_API_BASE_URL}/storage/${item.meal_image}`} alt="img-1" height="250px" width="100%"  />
                                                                            
                                                                            <div className="text-center">
                                                                                <h5 className="font-size-15"><a href="#" className="text-dark">{item.meal_name}</a></h5>
                                                                                <h5 className="mt-3 mb-0">RM {item.meal_price}</h5>
                                                                            </div>
                                                                            </a> </div>
                                                                            
                                                                            </div>
                                                                            
                                                 ))
                                            ): (
                                                <div>No results found.</div>
                                            )}
                                             
                                            </div>
                                            {/* meal List End */}
                                            <div className="row mt-4">
                                                <div className="col-sm-6">
                                                    <div>
                                                        <p className="mb-sm-0 mt-2">Total Product: <span className="fw-bold">{filteredMeals.length}</span></p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* end row */}
                    </div> {/* container-fluid */}
                </div>
                {/* End Page-content */}
            </div>
            {/* end main content*/}

        </div>
    );
}
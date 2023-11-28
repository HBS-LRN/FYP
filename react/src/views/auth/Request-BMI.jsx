import React, { useEffect, createRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import Select from 'react-select/creatable';
import axiosClient from "../../axios-client.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";


export default function RequestBMI() {
  const [validated, setValidated] = useState(false);
  const [category, setCategory] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [options, setOptions] = useState([]);
  const { user, setUser, setToken, setNotification } = useStateContext();
  const weightRef = createRef();
  const heightRef = createRef();
  const ingredientRef = createRef();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);





  //fetch user address data
  useEffect(() => {
    getIngredients();
  }, [])

  const getIngredients = async () => {

    console.log("getting")

    try {
      await axiosClient.get(`/ingredients`)
        .then(({ data }) => {
          console.log(data)
          setIngredients(data)

          // Create options based on the fetched ingredient data
          const ingredientOptions = data.map((ingredient) => ({
            value: ingredient.ingredient_name, // Adjust the key based on your data structure
            label: ingredient.ingredient_name, // Adjust the label based on your data structure
          }));

          setOptions(ingredientOptions);
        });
    } catch (error) {
      const response = error.response;
      console.log(response);

    }
  }
  const handleSubmit = (event) => {

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {



      setLoading(true);

      const payload = {
        height: heightRef.current.value,
        weight: weightRef.current.value,

      };
      console.log(payload)


      const selectedIngredients = category.map((option) => option.value);

      console.log(selectedIngredients)
      axiosClient
        .put(`/userBMI/${user.id}`, payload)
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });





      // Define a function to post the ingredients one by one
      const postIngredients = (index) => {
        console.log(index)
        if (index < selectedIngredients.length) {
          const ingredientName = selectedIngredients[index];
          console.log(ingredientName)
          const allergicPayload = {
            ingredient_name: ingredientName,
            user_id: user.id,
          };

          axiosClient
            .post("/allergic", allergicPayload)
            .then(() => {
              console.log(`Posted: ${ingredientName}`);
              // Call the function recursively for the next ingredient
              postIngredients(index + 1);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err.response.data);
              const response = err.response;
              if (response && response.status === 422) {
                setError(response.data.errors);
              }
            });
        } else {
          // All ingredients have been posted\
          setLoading(false);
          setUser(null);
          setToken(null);
          console.log("All ingredients have been posted.");
          setNotification("Register Has Been Completed! Login Now");
          navigate("/login");
          // Scroll to the top of the screen window
          window.scrollTo(0, 0);
        }
      };

      postIngredients(0);

    }

    setValidated(true);
  };


  const handleCategoryChange = (value, actionMeta) => {
    // Check if the user pressed the space key
    if (actionMeta.action === 'menuKeyDown' && actionMeta.key === 'Space') {
      // Create a new option based on the entered value
      const newOption = { value: value, label: value };
      setCategory((prevOptions) => [...prevOptions, newOption]);
    } else {
      setCategory(value);
    }
  };

  return (
    <div className="custom-gap">



      <form
        className={`needs-validation ${validated ? 'was-validated' : ''}`}
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="custom-container">
          <div className="row align-items-center">
            <div className="login-content">
              <div
                className="col-lg-5 logoBox"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="300"
              >
                <div className="logo">
                  <img src="../../../assets/img/GrandImperialGroupLogo.png" alt="" />
                </div>
              </div>
              <div
                className="col-lg-6 custom-login-margin"
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="400"
              >
                <div className="login-form">
                  <h3>Tell Us More About Yourself!</h3>
                  <p>Request For Your Weight And Height For BMI purposes</p>
                </div>



                <div className="text height">
                  <label htmlFor="email">User Height (CM)</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-user"></i>
                    <input
                      ref={heightRef}
                      type="number" // Use type="number" to enforce numeric input
                      step="any" // Allow both integers and decimal numbers
                      min="1"
                      className="form-control"
                      name="height"
                      placeholder="Enter your height"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">Please enter a valid height.</div>
                  </div>
                </div>
                <div className="mb-4">
                  <br />
                  <div className="text weight">
                    <label htmlFor="passwordText">User Weight (KG)</label>
                    <br />
                    <div className="custom-form">
                      <i className="fa-solid fa-weight-scale"></i>
                      <input
                        ref={weightRef}
                        type="number" // Use type="number" to enforce numeric input
                        step="any" // Allow both integers and decimal numbers
                        min="1"
                        className="form-control"
                        name="weight"
                        placeholder="Enter your weight"
                        required
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                      />
                      <div className="valid-tooltip">Looks good!</div>
                      <div className="invalid-tooltip">Please enter a valid weight.</div>
                    </div>
                  </div>
                </div>
                <div className="text ingredient">
                  <div className="mb-3">

                    <label htmlFor="ingredientText">
                      Ingredient Allergies (If Any)
                    </label>
                    <div className="custom-form">
                      <i className="fa-solid fa-shrimp"></i>
                      <Select
                        ref={ingredientRef}
                        value={category}
                        onChange={handleCategoryChange}
                        options={options}
                        isMulti
                        onKeyDown={(event) => {
                          if (event.key === ' ') {
                            event.stopPropagation();
                            event.preventDefault();
                            const enteredValue = event.target.value.trim();
                            if (enteredValue) {
                              const newOption = {
                                value: enteredValue,
                                label: enteredValue,
                              };
                              setCategory((prevOptions) => [
                                ...prevOptions,
                                newOption,
                              ]);
                            }
                          }
                        }}
                      />
                      <div className="valid-tooltip">Looks good!</div>
                      <div className="invalid-tooltip">
                        Please choose a unique and valid username.
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                {loading ? (
                  <div className="loaderCustom">

                    <p className="loaderCustom-text">Loading</p>
                    <span className="loadCustom"></span>


                  </div>
                ) : (
                  <button className="button-submit" type="submit">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <Helmet>
        <link rel="stylesheet" href="../../../assets/css/request-BMI.css" />
      </Helmet>
    </div>
  );
}

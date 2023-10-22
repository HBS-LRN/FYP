import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Select from 'react-select/creatable';

export default function RequestBMI() {
  const [validated, setValidated] = useState(false);
  const [category, setCategory] = useState([]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
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

  const options = [
    { value: 'TO', label: 'Egg' },
    { value: 'CF', label: 'Peanuts' },
    { value: 'NO', label: 'Wheat', selected: true },
    { value: 'FI', label: 'Three nuts', selected: true },
    { value: 'OU', label: 'Shrimp' },
    { value: 'SC', label: 'Scallops' },
    { value: 'AV', label: 'Avocado' },
  ];

  return (
    <div className="custom-gap">
      <form
        method="POST"
        action="/users/authenticate"
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
                <div className="text email">
                  <label htmlFor="email">User Height (CM)</label>
                  <div className="custom-form">
                    <i className="fa-regular fa-user"></i>
                    <input
                      type="text"
                      className="form-control"
                      name="height"
                      placeholder="Enter your height"
                      required
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                    />
                    <div className="valid-tooltip">Looks good!</div>
                    <div className="invalid-tooltip">
                      Please enter a valid username.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text password">
                    <label htmlFor="passwordText">User Weight (KG)</label>
                    <br />
                    <div className="custom-form">
                      <i className="fa-solid fa-weight-scale"></i>
                      <input
                        type="text"
                        className="form-control"
                        name="password"
                        placeholder="Enter your weight"
                        required
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                      />
                      <div className="valid-tooltip">Looks good!</div>
                      <div className="invalid-tooltip">
                        Please choose a unique and valid username.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text ingredient">
                  <div className="mb-3">
                    <label htmlFor="passwordText">
                      Ingredient Allergies (If Any)
                    </label>
                    <div className="custom-form">
                      <i className="fa-solid fa-shrimp"></i>
                      <Select
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
                <button className="button-price login" type="submit">
                  Submit
                </button>
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

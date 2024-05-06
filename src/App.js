import { useState } from "react";
import "./App.css";
import "./logo.png";

function App() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    UsrFirstName: "",
    UsrMiddleName: "",
    UsrLastName: "",
    UsrEmailAddress: "",
    UsrPhoneNumber: "",
    UsrBirthday: "",
    UsrStreetAddress: "",
    UsrZIPCode: "",
    UsrCity: "",
    UsrState: "",
    UsrUSCitizen: "",
    UsrSocialSecurityNumber: "",
    UsrIDNumber: "",
    UsrIDType: "",
    UsrIssuingState: "",
    EntityName: "UsrDepositAccount",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      "https://webhooks.creatio.com/webhooks/7df1ce6d-59e7-4c12-8ea2-fff49d6e6bfd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Form data sent successfully");
          // Optionally, reset the form fields after successful submission
          setState({
            UsrFirstName: "",
            UsrMiddleName: "",
            UsrLastName: "",
            UsrEmailAddress: "",
            UsrPhoneNumber: "",
            UsrBirthday: "",
            UsrStreetAddress: "",
            UsrZIPCode: "",
            UsrCity: "",
            UsrState: "",
            UsrUSCitizen: "",
            UsrSocialSecurityNumber: "",
            UsrIDNumber: "",
            UsrIDType: "",
            UsrIssuingState: "",
            EntityName: "UsrDepositAccount",
          });
        } else {
          console.error("Failed to send form data");
        }
      })
      .catch((error) => {
        console.error("Error sending form data:", error);
      });
    console.log("Form data", state);
  };
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Banking Business Process</title>
          <link rel="stylesheet" href="style.css" />
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.css"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <div className="container-fluid form-container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-8 text-center p-0 mb-2">
                <div className="card px-0">
                  <img
                    className="my-4"
                    src="./logo.png"
                    style={{ maxWidth: "220px", margin: "0 auto" }}
                    alt="Logo"
                  />
                  <h2 id="heading">Deposit Account Registration</h2>
                  {/* <p>Fill all form field to go to the next step</p> */}
                  <form id="msform">
                    {/* progressbar */}
                    <ul id="progressbar">
                      <li className="active" id="account">
                        <strong>About</strong>
                      </li>
                      <li id="personal">
                        <strong>Contact Details</strong>
                      </li>
                      <li id="payment">
                        <strong>Identity Details</strong>
                      </li>
                      {/* <li id="confirm"><strong>Submit</strong></li> */}
                    </ul>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <br />
                    {/* fieldsets */}
                    {step === 1 && (
                      <fieldset>
                        <div className="form-card">
                          <div className="row">
                            <div className="col-7">
                              <h2 className="fs-title">About:</h2>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 1 - 3</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="first-left col-md-6">
                              <label className="fieldlabels">
                                First Name: *
                              </label>
                              <input
                                type="text"
                                name="UsrFirstName"
                                placeholder="First Name"
                                value={state.UsrFirstName}
                                onChange={inputHandle}
                                required
                              />
                              <label className="fieldlabels">
                                Middle Name: *
                              </label>
                              <input
                                type="text"
                                name="UsrMiddleName"
                                placeholder="Middle Name"
                                onChange={inputHandle}
                                value={state.UsrMiddleName}
                                required
                              />
                              <label className="fieldlabels">
                                Last Name: *
                              </label>
                              <input
                                type="text"
                                name="UsrLastName"
                                placeholder="Last Name"
                                onChange={inputHandle}
                                value={state.UsrLastName}
                                required
                              />
                              <label className="fieldlabels" htmlFor="birthday">
                                Birthday: *
                              </label>
                              <input
                                type="date"
                                id="birthday"
                                name="UsrBirthday"
                                onChange={inputHandle}
                                value={state.UsrBirthday}
                                required
                              />
                            </div>
                            <div className="first-right col-md-6">
                              <label className="fieldlabels">
                                Street Address: *
                              </label>
                              <input
                                type="text"
                                name="UsrStreetAddress"
                                placeholder="Street Address"
                                onChange={inputHandle}
                                value={state.UsrStreetAddress}
                                required
                              />
                              <label className="fieldlabels">Zip Code: *</label>
                              <input
                                id="zip"
                                name="UsrZIPCode"
                                type="text"
                                pattern="[0-9]*"
                                placeholder="Zip Code"
                                onChange={inputHandle}
                                value={state.UsrZIPCode}
                                required
                              />
                              <label className="fieldlabels">City: *</label>
                              <input
                                type="text"
                                name="UsrCity"
                                placeholder="City"
                                onChange={inputHandle}
                                value={state.UsrCity}
                                required
                              />
                              <label className="fieldlabels" htmlFor="state">
                                State: *
                              </label>
                              <select
                                type="text"
                                name="UsrState"
                                placeholder="State"
                                id="state"
                                onChange={inputHandle}
                                value={state.UsrState}
                                required
                              >
                                <option value>--Please select a State--</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <input
                          type="button"
                          name="next"
                          className="next action-button"
                          defaultValue="Next"
                          onClick={nextStep}
                          required
                        />
                      </fieldset>
                    )}
                    {step === 2 && (
                      <fieldset>
                        <div className="form-card">
                          <div className="row">
                            <div className="col-7">
                              <h2 className="fs-title">Contact Details:</h2>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 2 - 3</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="middle-left col-md-6">
                              <label className="fieldlabels">Email: *</label>
                              <input
                                type="email"
                                name="UsrEmailAddress"
                                placeholder="Email Id"
                                onChange={inputHandle}
                                value={state.UsrEmailAddress}
                                required
                              />
                            </div>
                            <div className="middle-right col-md-6">
                              <label className="fieldlabels">
                                Phone Number: *
                              </label>
                              <input
                                type="text"
                                name="UsrPhoneNumber"
                                placeholder="Phone Number"
                                onChange={inputHandle}
                                value={state.UsrPhoneNumber}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <input
                          type="button"
                          name="next"
                          className="next action-button"
                          defaultValue="Next"
                          onClick={nextStep}
                          required
                        />
                        <input
                          type="button"
                          name="previous"
                          className="previous action-button-previous"
                          defaultValue="Previous"
                          onClick={prevStep}
                        />
                      </fieldset>
                    )}
                    {step === 3 && (
                      <fieldset>
                        <div className="form-card">
                          <div className="row">
                            <div className="col-7">
                              <h2 className="fs-title">Identity Details:</h2>
                            </div>
                            <div className="col-5">
                              <h2 className="steps">Step 3 - 3</h2>
                            </div>
                          </div>
                          <div className="row">
                            <div className="last-left col-md-6">
                              <label className="fieldlabels">
                                Social Security Number: *
                              </label>
                              <input
                                id="password-field"
                                type="password"
                                className="form-control"
                                name="UsrSocialSecurityNumber"
                                onChange={inputHandle}
                                value={state.UsrSocialSecurityNumber}
                                defaultValue
                                required
                              />
                              <span
                                toggle="#password-field"
                                className="fa fa-fw fa-eye field-icon toggle-password"
                              />
                              <label className="fieldlabels" htmlFor="state">
                                ID type: *
                              </label>
                              <select
                                type="text"
                                name="UsrIDType"
                                placeholder="ID type"
                                onChange={inputHandle}
                                value={state.UsrIDType}
                                id="id"
                                required
                              >
                                <option value>
                                  --Please select a ID type--
                                </option>
                                <option value="Driver's license">Driver's license</option>
                                <option value="Voter ID">Voter ID</option>
                                <option value="State ID">State ID</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                              </select>
                              <label className="fieldlabels" htmlFor="state">
                                Issuing state or territory: *
                              </label>
                              <select
                                type="text"
                                name="UsrIssuingState"
                                placeholder="Issuing state or territory"
                                onChange={inputHandle}
                                value={state.UsrIssuingState}
                                id="state"
                                required
                              >
                                <option value>--Please select a State--</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District Of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                              </select>
                            </div>
                            <div className="last-right col-md-6">
                              <div id="wrapper">
                                <label
                                  className="fieldlabels"
                                  htmlFor="yes_no_radio"
                                >
                                  Are you a U.S. citizen?
                                </label>
                                <p>
                                  <input
                                    type="radio"
                                    name="UsrUSCitizen"
                                    onChange={inputHandle}
                                    value="true"
                                    checked={state.UsrUSCitizen === "true"}
                                    defaultChecked
                                  />
                                  Yes
                                </p>
                                <p>
                                  <input
                                    type="radio"
                                    name="UsrUSCitizen"
                                    onChange={inputHandle}
                                    value="false"
                                    checked={state.UsrUSCitizen === "false"}
                                  />
                                  No
                                </p>
                              </div>
                              <label className="fieldlabels">
                                ID Number: *
                              </label>
                              <input
                                id="id-number"
                                name="UsrIDNumber"
                                type="text"
                                pattern="[0-9]*"
                                placeholder="ID Number"
                                onChange={inputHandle}
                                value={state.UsrIDNumber}
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <input
                          type="button"
                          name="next"
                          className="next action-button"
                          defaultValue="Submit"
                          onClick={(e) => {
                            handleSubmit(e);
                            nextStep();
                          }}
                        />
                        <input
                          type="button"
                          name="previous"
                          className="previous action-button-previous"
                          defaultValue="Previous"
                          onClick={prevStep}
                        />
                      </fieldset>
                    )}
                    <fieldset>
                      <div className="form-card">
                        {/* <div class="row">
                                    <div class="col-7">
                                        <h2 class="fs-title">Finish:</h2>
                                    </div>
                                    <div class="col-5">
                                        <h2 class="steps">Step 4 - 4</h2>
                                    </div>
                                </div> */}
                        <br />
                        <br />
                        <h2 className="purple-text text-center">
                          <strong>SUCCESS !</strong>
                        </h2>
                        <br />
                        <div className="row justify-content-center">
                          <div className="col-7 text-center">
                            <h5 className="purple-text text-center">
                              You Have Successfully Registered
                            </h5>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;

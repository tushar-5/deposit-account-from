import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../App.css"
import logo from "../asset/logo-implemify.png";


function generateOTP() {
  const digits = '0123456789';
  let UsrOtp = '';
  for (let i = 0; i < 6; i++) {
    UsrOtp += digits[Math.floor(Math.random() * 10)];
  }
  return UsrOtp;
}

function DepositForm() {
  const location = useLocation()
  const AcType = location.state
  const [showForm, setShowForm] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setformData] = useState({
    UsrFirstName: "",
    UsrMiddleName: "",
    UsrLastName: "",
    UsrSuffix: "",
    UsrEmailAddress: "",
    UsrOtp: "",
    UsrPhoneNumber: "",
    UsrBirthday: "",
    UsrStreetAddress: "",
    UsrSuitAptOther: "",
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

  const handleGenerateOTP = () => {
    const newOTP = generateOTP();
    setformData({ ...formData, UsrOtp: newOTP, UsrAcType: AcType });
  };

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  var reqField = ["UsrUSCitizen", "UsrSocialSecurityNumber", "UsrIDNumber", "UsrIDType", "UsrIssuingState"];

  function allFldsEmpty(state) {
    return reqField.some(field => !state[field]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (allFldsEmpty(formData)) {
      alert("Please fill all * fields.");
      return;
    }

    fetch(
      "https://webhooks.creatio.com/webhooks/7df1ce6d-59e7-4c12-8ea2-fff49d6e6bfd",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => {
        if (response.ok) {
          lastStep()
          console.log("Form data sent successfully");
          setShowForm(false)
          setformData({
            UsrFirstName: "",
            UsrMiddleName: "",
            UsrLastName: "",
            UsrSuffix: "",
            UsrEmailAddress: "",
            UsrPhoneNumber: "",
            UsrBirthday: "",
            UsrStreetAddress: "",
            UsrSuitAptOther: "",
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
    console.log("Form data", formData);
  };

  var requiredFields = ["UsrFirstName", "UsrMiddleName", "UsrLastName", "UsrBirthday", "UsrStreetAddress", "UsrZIPCode",
    "UsrCity", "UsrState"];

  function allFieldsEmpty(state) {
    return requiredFields.some(field => !state[field]);
  }

  const nextStep = () => {
    if (allFieldsEmpty(formData)) {
      alert("Please fill all * fields.");
      return;
    }

    setStep((prevStep) => prevStep + 1);
  };
  const nxtStep = () => {
    if (!formData.UsrEmailAddress) {
      alert("Please fill all * fields.");
      return;
    }
    if (!formData.UsrPhoneNumber) {
      alert("Please fill all * fields.");
      return;
    }
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const lastStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  return (
    <>
      <div className="container-fluid form-container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-8 text-center p-0 mb-2">
            <div className="card px-0">
              <img
                className="my-4"
                src={logo}
                style={{ maxWidth: "220px", margin: "0 auto" }}
                alt="Logo"
              />
                {showForm && (
              <h2 id="heading">Deposit Account Registration</h2>)}
              <form id="msform">
                {/* progressbar */}
                {showForm && (
                <div>
                  <ul id="progressbar">
                    <li className={step >= 1 ? 'active' : ''} id="account">
                      <strong>About</strong>
                    </li>
                    <li className={step >= 2 ? 'active' : ''} id="personal">
                      <strong>Contact Details</strong>
                    </li>
                    <li className={step >= 3 ? 'active' : ''} id="payment">
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
                  </div></div>)}
                <br />
                <form onSubmit={handleSubmit}>
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
                              value={formData.UsrFirstName}
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
                              value={formData.UsrMiddleName}
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
                              value={formData.UsrLastName}
                              required
                            />
                            <label className="fieldlabels" htmlFor="state">
                              Suffix (optional)
                            </label>
                            <select
                              type="text"
                              name="UsrSuffix"
                              placeholder="Suffix"
                              onChange={inputHandle}
                              value={formData.UsrSuffix}
                              id="id"
                              required
                            >
                              <option value>
                                --Please select a Suffix--
                              </option>
                              <option value="6c002890-1d30-485c-bb5f-6a8f4e9d1cf2">Mr</option>
                              <option value="f572d13a-c0ad-4882-9e7a-12257a1c88e3">Mrs</option>
                              <option value="f5999c49-9d50-46ef-b577-18eec9d867c1">Miss</option>
                            </select>
                            <label className="fieldlabels" htmlFor="birthday">
                              Birthday: *
                            </label>
                            <input
                              type="date"
                              id="birthday"
                              name="UsrBirthday"
                              onChange={inputHandle}
                              value={formData.UsrBirthday}
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
                              value={formData.UsrStreetAddress}
                              required
                            />
                            <label className="fieldlabels">
                              Suit/apt/other (optional)
                            </label>
                            <input
                              type="text"
                              name="UsrSuitAptOther"
                              placeholder="Suit/apt/other"
                              onChange={inputHandle}
                              value={formData.UsrSuitAptOther}
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
                              value={formData.UsrZIPCode}
                              required
                            />
                            <label className="fieldlabels">City: *</label>
                            <input
                              type="text"
                              name="UsrCity"
                              placeholder="City"
                              onChange={inputHandle}
                              value={formData.UsrCity}
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
                              value={formData.UsrState}
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
                              value={formData.UsrEmailAddress}
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
                              value={formData.UsrPhoneNumber}
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
                        onClick={() => {
                          handleGenerateOTP();
                          nxtStep();
                        }}
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
                              value={formData.UsrSocialSecurityNumber}
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
                              value={formData.UsrIDType}
                              id="id"
                              required
                            >
                              <option value>
                                --Please select a ID type--
                              </option>
                              <option value="8f788d22-6f77-413c-aec5-261538552df1">Driver's license</option>
                              <option value="22ba0159-e64b-411b-be42-6b32e564235c">Voter ID</option>
                              <option value="42459a66-c263-4a83-b863-f59284be7884">State ID</option>
                            </select>
                            <label className="fieldlabels" htmlFor="state">
                              Issuing state or territory: *
                            </label>
                            <select
                              type="text"
                              name="UsrIssuingState"
                              placeholder="Issuing state or territory"
                              onChange={inputHandle}
                              value={formData.UsrIssuingState}
                              id="state"
                              required
                            >
                              <option value>--Please select a State--</option>
                              <option value="2f66-0b5c-45ab-a1a6-90667d703a20">Alabama</option>
                              <option value="8506ccea-1037-4897-86b5-b1414135d97f">Alaska</option>
                              <option value="bc548a71-2574-46ab-87ac-75ddf13470b3">Arizona</option>
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
                              <option value="2d577854-1ad7-4e4f-8cce-76597132edb6">Illinois</option>
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
                              <option value="d4c6f4a9-6db9-4bcf-b01c-a37b2372cf5e">Texas</option>
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
                                  checked={formData.UsrUSCitizen === "true"}
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
                                  checked={formData.UsrUSCitizen === "false"}
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
                              value={formData.UsrIDNumber}
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
                  {step === 4 && (
                    <fieldset>
                      <div className="form-card">
                        <br />
                        <div className="row justify-content-center">
                          <div className="col-7 text-center">
                            <h5 className="purple-text text-center">
                              Thank you for your interest in opening an account with Implemify! Our digital low-code/no-code (LCNC) solutions simplify traditional banking for an improved end-to-end user experience.
                            </h5>
                            <p>Kindly check your email for further instructions.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  )}
                </form>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DepositForm;

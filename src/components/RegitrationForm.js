import React, { useState } from 'react';
import * as Yup from 'yup';
import { useLocation } from "react-router-dom";
import logo from "../asset/logo-implemify.png";
import "../App.css"

function generateOTP() {
  const digits = '0123456789';
  let UsrOtp = '';
  for (let i = 0; i < 6; i++) {
    UsrOtp += digits[Math.floor(Math.random() * 10)];
  }
  return UsrOtp;
}

const RegitrationForm = () => {
  const location = useLocation()
  const AcType = location.state
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
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
    setFormData({ ...formData, UsrOtp: newOTP, UsrAcType: AcType });
  };
  
  const validationSchemaStep1 = Yup.object().shape({
    UsrFirstName: Yup.string().required('First Name is required'),
    UsrLastName: Yup.string().required('Last Name is required'),
    UsrBirthday: Yup.date()
      .typeError('Invalid date')
      .required('Birth date is required')
      .max(new Date(), 'Birth date must be in the past'),
    UsrStreetAddress: Yup.string().required('Street Address is required'),
    UsrZIPCode: Yup.string()
      .matches(/^\d{5}$/, 'Must be exactly 5 digits')
      .required('Zip Code is required'),
    UsrCity: Yup.string().required('City Name is required'),
    UsrState: Yup.string().required('State Name is required'),
  });

  const validationSchemaStep2 = Yup.object().shape({
    UsrEmailAddress: Yup.string().email('Invalid email').required('Email is required'),
    UsrPhoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Invalid phone number')
      .required('Phone number is required'),
  });

  const validationSchemaStep3 = Yup.object().shape({
    UsrSocialSecurityNumber: Yup.string()
      .matches(/^\d{9}$/, 'Must be exactly 9 digits')
      .required('Social Security Number Code is required'),
    UsrIDNumber: Yup.string().required('ID Number is required'),
    UsrIDType: Yup.string().required('ID type is required'),
    UsrUSCitizen: Yup.string().required('Are you U.S. citizen is required'),
    UsrIssuingState: Yup.string().required('Issuing State is required'),
  });

  const handleValidation = async (values, schema) => {
    try {
      await schema.validate(values, { abortEarly: false });
      return {};
    } catch (validationErrors) {
      const errors = {};
      validationErrors.inner.forEach(error => {
        errors[error.path] = error.message;
      });
      return errors;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Determine the validation schema based on the current step
    let validationSchema;
    switch (step) {
      case 1:
        validationSchema = validationSchemaStep1;
        break;
      case 2:
        validationSchema = validationSchemaStep2;
        handleGenerateOTP()
        break;
      case 3:
        validationSchema = validationSchemaStep3;
        break;
      default:
        return;
    }

    // Validate the form data against the schema
    const validationErrors = await handleValidation(formData, validationSchema);

    if (Object.keys(validationErrors).length === 0) {
      // If there are no validation errors, proceed to the next step or handle final submission
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Handle final submission
        setStep(step + 1);
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
              console.log("Form data sent successfully");
            } else {
              console.error("Failed to send form data");
            }
          })
          .catch((error) => {
            console.error("Error sending form data:", error);
          });
      }
      setErrors({});
    } else {
      // If there are validation errors, set them in the state
      setErrors(validationErrors);
    }
  };

  const inputHandle = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div class="container-fluid form-container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 text-center p-0 mb-2">
          <div class="card px-0">
            <img class="my-4" src={logo} style={{ maxWidth: "220px", margin: "0 auto" }} alt='logo' />
            {step !== 4 && (
              <h2 id="heading">Deposit Account Registration</h2>
            )}
            <form id="msform" onSubmit={handleSubmit}>
            {step !== 4 && (
              <ul id="progressbar">
                <li className={step >= 1 ? 'active' : ''} id="account"><strong>About</strong></li>
                <li className={step >= 2 ? 'active' : ''} id="personal"><strong>Contact Details</strong></li>
                <li className={step >= 3 ? 'active' : ''} id="payment"><strong>Identity Details</strong></li>
              </ul>
            )}
            {step !== 4 && (
              <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            )}
              <br />
              {step === 1 && (
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">About:</h2>
                      </div>
                      <div class="col-5">
                        <h2 class="steps">Step 1 - 3</h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="first-left col-md-6">
                        <label class="fieldlabels">First Name: *</label>
                        <input type="text" name="UsrFirstName"
                          placeholder="First Name"
                          value={formData.UsrFirstName}
                          onChange={inputHandle}
                          required /><p style={{ color: 'red' }}>{errors.UsrFirstName}</p>
                        <label class="fieldlabels">Middle Name (optional)</label>
                        <input type="text" name="UsrMiddleName"
                          placeholder="Middle Name"
                          onChange={inputHandle}
                          value={formData.UsrMiddleName} />
                        <label class="fieldlabels">Last Name: *</label>
                        <input
                          type="text"
                          name="UsrLastName"
                          placeholder="Last Name"
                          onChange={inputHandle}
                          value={formData.UsrLastName}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrLastName}</p>
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
                        >
                          <option value>
                            --Please select a Suffix--
                          </option>
                          <option value="6c002890-1d30-485c-bb5f-6a8f4e9d1cf2">Mr</option>
                          <option value="f572d13a-c0ad-4882-9e7a-12257a1c88e3">Mrs</option>
                          <option value="f5999c49-9d50-46ef-b577-18eec9d867c1">Miss</option>
                        </select>
                        <label class="fieldlabels" for="birthday">Birthday: *</label>
                        <input
                          type="date"
                          id="birthday"
                          name="UsrBirthday"
                          onChange={inputHandle}
                          value={formData.UsrBirthday}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrBirthday}</p>
                      </div>
                      <div class="first-right col-md-6">
                        <label class="fieldlabels">Street Address: *</label>
                        <input
                          type="text"
                          name="UsrStreetAddress"
                          placeholder="Street Address"
                          onChange={inputHandle}
                          value={formData.UsrStreetAddress}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrStreetAddress}</p>
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
                        /><p style={{ color: 'red' }}>{errors.UsrSuitAptOther}</p>
                        <label class="fieldlabels">Zip Code: *</label>
                        <input
                          id="zip"
                          name="UsrZIPCode"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="Zip Code"
                          onChange={inputHandle}
                          value={formData.UsrZIPCode}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrZIPCode}</p>
                        <label class="fieldlabels">City: *</label>
                        <input
                          type="text"
                          name="UsrCity"
                          placeholder="City"
                          onChange={inputHandle}
                          value={formData.UsrCity}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrCity}</p>
                        <label class="fieldlabels" for="state">State: *</label>
                        <select
                          type="text"
                          name="UsrState"
                          placeholder="State"
                          id="state"
                          onChange={inputHandle}
                          value={formData.UsrState}
                          required
                        >
                          <option value="">--Please select a State--</option>
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
                        </select>{errors.UsrState && <p style={{ color: 'red' }}>{errors.UsrState}</p>}
                      </div>
                    </div>
                  </div>
                  <input type="button" name="next" class="next action-button" value="Next" onClick={handleSubmit} />
                </fieldset>
              )}
              {step === 2 && (
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Contact Details:</h2>
                      </div>
                      <div class="col-5">
                        <h2 class="steps">Step 2 - 3</h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="middle-left col-md-6">
                        <label class="fieldlabels">Email: *</label>
                        <input
                          type="email"
                          name="UsrEmailAddress"
                          placeholder="Email Id"
                          onChange={inputHandle}
                          value={formData.UsrEmailAddress}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrEmailAddress}</p>
                      </div>
                      <div class="middle-right col-md-6">
                        <label class="fieldlabels">Phone Number: *</label>
                        <input
                          type="text"
                          name="UsrPhoneNumber"
                          placeholder="Phone Number"
                          onChange={inputHandle}
                          value={formData.UsrPhoneNumber}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrPhoneNumber}</p>
                      </div>
                    </div>
                  </div>
                  <input type="button" name="next" class="next action-button" value="Next" onClick={handleSubmit} />
                  <input type="button" name="previous" class="previous action-button-previous" value="Previous" onClick={handlePreviousStep} />
                </fieldset>
              )}
              {step === 3 && (
                <fieldset>
                  <div class="form-card">
                    <div class="row">
                      <div class="col-7">
                        <h2 class="fs-title">Identity Details:</h2>
                      </div>
                      <div class="col-5">
                        <h2 class="steps">Step 3 - 3</h2>
                      </div>
                    </div>
                    <div class="row">
                      <div class="last-left col-md-6">
                        <label class="fieldlabels">Social Security Number: *</label>
                        <input
                          id="password-field"
                          type="password"
                          className="form-control"
                          name="UsrSocialSecurityNumber"
                          onChange={inputHandle}
                          value={formData.UsrSocialSecurityNumber}
                          defaultValue
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrSocialSecurityNumber}</p>
                        <span toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password"></span>
                        <label class="fieldlabels" for="state">ID type: *</label>
                        <select
                          type="text"
                          name="UsrIDType"
                          placeholder="ID type"
                          onChange={inputHandle}
                          value={formData.UsrIDType}
                          id="id"
                          required
                        ><option value="">--Please select a ID type--</option>
                          <option value="8f788d22-6f77-413c-aec5-261538552df1">Driver's license</option>
                          <option value="22ba0159-e64b-411b-be42-6b32e564235c">Voter ID</option>
                          <option value="42459a66-c263-4a83-b863-f59284be7884">State ID</option>
                        </select>{errors.UsrIDType && <p style={{ color: 'red' }}>{errors.UsrIDType}</p>}
                        <label class="fieldlabels" for="state">Issuing state or territory: *</label>
                        <select
                          type="text"
                          name="UsrIssuingState"
                          placeholder="Issuing state or territory"
                          onChange={inputHandle}
                          value={formData.UsrIssuingState}
                          id="state"
                          required
                        >
                          <option value="">--Please select a State--</option>
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
                        </select>{errors.UsrIssuingState && <p style={{ color: 'red' }}>{errors.UsrIssuingState}</p>}
                      </div>
                      <div class="last-right col-md-6">
                        <div id="wrapper">
                          <label class="fieldlabels" for="yes_no_radio">Are you a U.S. citizen?</label>
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
                          </p><p style={{ color: 'red' }}>{errors.UsrUSCitizen}</p>
                        </div>
                        <label class="fieldlabels">ID Number: *</label>
                        <input
                          id="id-number"
                          name="UsrIDNumber"
                          type="text"
                          pattern="[0-9]*"
                          placeholder="ID Number"
                          onChange={inputHandle}
                          value={formData.UsrIDNumber}
                          required
                        /><p style={{ color: 'red' }}>{errors.UsrIDNumber}</p>
                      </div>
                    </div>
                  </div>
                  <input type="button" name="next" class="next action-button" value="Submit" onClick={handleSubmit} />
                  <input type="button" name="previous" class="previous action-button-previous" value="Previous" onClick={handlePreviousStep} />
                </fieldset>
              )}
              {step === 4 && (
                <fieldset>
                  <div class="form-card">
                    <br /><br />
                    <h5 className="purple-text text-center">
                      Thank you for your interest in opening an account with Implemify! Our digital low-code/no-code (LCNC) solutions simplify traditional banking for an improved end-to-end user experience.
                    </h5>
                    <br />
                    <div class="row justify-content-center">
                      <div class="col-7 text-center">
                      <p>Kindly check your email for further instructions.</p>
                      </div>
                    </div>
                  </div>
                </fieldset>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegitrationForm;

import { useState, useRef } from "react";

const SurveyForm = ({ formSubmit }) => {
  const [formInputs, setFormInputs] = useState({});
  const inputName = useRef();
  const inputEmail = useRef();
  const inputMobile = useRef();

  const isNumeric = (input) => {
    return /^\d+$/.test(input);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormInputs((values) => ({ ...values, [name]: value }));

    if (name == "mobile") {
      if (!isNumeric(value)) {
        alert("Accept numbers only");
        setFormInputs((values) => ({ ...values, mobile: "" }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formInputs.hasOwnProperty("username") || formInputs.username == "") {
      alert("Enter Name");
      inputName.current.focus();
      return false;
    } else if (!formInputs.hasOwnProperty("email") || formInputs.email == "") {
      alert("Enter Email");
      inputEmail.current.focus();
      return false;
    } else if (!formInputs.hasOwnProperty("mobile") || formInputs.email == "") {
      alert("Enter Mobile");
      inputMobile.current.focus();
      return false;
    }
    const dataSave = formSubmit(formInputs); // Call the onSubmit function passed via props
    if (dataSave.status === "success") {
      alert(dataSave.message);
      setFormInputs((values) => ({ username: "", email: "", mobile: "" }));
    } else {
      alert(dataSave.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="formName" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="formName"
                placeholder="Enter..."
                ref={inputName}
                value={formInputs.username || ""}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label for="formEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="formEmail"
                placeholder="Enter..."
                ref={inputEmail}
                value={formInputs.email || ""}
                onChange={handleInput}
              />
            </div>
            <div className="mb-3">
              <label for="formMobile" className="form-label">
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                id="formMobile"
                placeholder="Enter..."
                ref={inputMobile}
                value={formInputs.mobile || ""}
                onChange={handleInput}
                maxLength={10}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default SurveyForm;

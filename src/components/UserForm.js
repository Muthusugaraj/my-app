import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserForm = ({ formSubmit, mode, formData }) => {
  const [formInputs, setFormInputs] = useState({});
  const inputName = useRef();
  const inputEmail = useRef();
  const inputMobile = useRef();
  const { id } = useParams();

  useEffect(() => {
    if (mode == "edit" || mode == "view") {
      const currentData = formData.find((data) => data.id == id);
      if (currentData) {
        setFormInputs((values) => ({ ...values, ...currentData }));
      }
    }
  }, [formData, mode]);
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
              {mode == "new" || mode == "edit" ? (
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
              ) : (
                "Ravi"
              )}
            </div>
            <div className="mb-3">
              <label for="formEmail" className="form-label">
                Email
              </label>
              {mode == "new" || mode == "edit" ? (
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
              ) : (
                "ravi@gmail.com"
              )}
            </div>
            <div className="mb-3">
              <label for="formMobile" className="form-label">
                Mobile
              </label>
              {mode == "new" || mode == "edit" ? (
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
              ) : (
                "9750895078"
              )}
            </div>
            {mode == "new" ? (
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            ) : mode == "edit" ? (
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
        <div className="col-3"></div>
      </div>
    </div>
  );
};

export default UserForm;

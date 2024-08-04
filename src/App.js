import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useEffect } from "react";
import Header from "./components/Header.js";
import SurveyForm from "./components/SurveyForm.js";

const App = () => {
  const [formData, setFormData] = useState([]);
  useEffect(() => {
    const getformData = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(getformData);
  }, []);
  const formSubmit = (curData) => {
    const isExistingData = formData.some(
      (prevData) =>
        prevData.email === curData.email || prevData.mobile === curData.mobile
    );
    if (isExistingData) {
      // Handle case where data already exists
      return {
        status: "fail",
        message: "Data with this email or mobile number already exists",
      };
    } else {
      // Add curData to state and localStorage
      setFormData((prevFormData) => [...prevFormData, curData]);
      localStorage.setItem("formData", JSON.stringify([...formData, curData]));
      return {
        status: "success",
        message: "Data saved successfully",
      };
    }
  };
  return (
    <>
      <Header />
      <SurveyForm formSubmit={formSubmit} />
    </>
  );
};

export default App;

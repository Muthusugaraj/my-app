import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import UserForm from "./components/UserForm.js";
import Home from "./components/Home.js";

const App = () => {
  //localStorage.removeItem("formData");
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
      curData.id = formData.length + 1;
      setFormData((prevFormData) => [...prevFormData, curData]);
      localStorage.setItem("formData", JSON.stringify([...formData, curData]));
      return {
        status: "success",
        message: "Data saved successfully",
      };
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home users={formData} />} />
          <Route
            path="user/new"
            element={<UserForm formSubmit={formSubmit} mode="new" />}
          />
          <Route
            path="user/edit/:id"
            element={
              <UserForm
                formSubmit={formSubmit}
                mode="edit"
                formData={formData}
              />
            }
          />
          <Route
            path="user/view/:id"
            element={
              <UserForm
                formSubmit={formSubmit}
                mode="view"
                formData={formData}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

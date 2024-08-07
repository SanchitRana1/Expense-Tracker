import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { edit } from "../utils/icons";

import Dropzone from "react-dropzone";
import {USER_URL } from "../utils/constants";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emptyForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  };
  const [form, setForm] = useState(emptyForm);
  const isNonMobileDevice = useMediaQuery("(min-width:1000px)");
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";

  const resetForm = () => {
    setForm(emptyForm);
  };

  // Function to convert image file to base64 string
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const register = async () => {
    if (confirmPassword !== password) {
      alert("Passwords do not match!");
    } else {
      try {
        // setLoading(true)
        const formData = form;
        let pictureBase64 = "";
        if (form?.profilePicture) {
          pictureBase64 = await convertToBase64(form?.profilePicture);
        }
        formData.profilePicture = pictureBase64;

        const response = await fetch(`${USER_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const savedUser = await response.json();
        if (savedUser?.success) {
          setPageType("login");
          resetForm();
        }
      } catch (error) {
      } finally {
        // setLoading(false)
      }
    }
  };

  const login = async () => {
    try {
      // setLoading(true)
      const response = await fetch(`${USER_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const loggedUser = await response.json();
      resetForm();

      if (loggedUser.success) {
        dispatch(
          setUser({
            user: loggedUser.data?.user,
            token: loggedUser.data?.token,
          })
        );
        navigate("/home");
      }
    } catch (error) {
    } finally {
      // setLoading(false)
    }
  };

  const { name, email, password, profilePicture, confirmPassword } = form;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login();
    } else {
      register();
    }
  };
  const handleFieldChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="absolute w-full py-10 font-nunito">
      {/* <div className='fixed w-screen h-screen'>
        <img className='min-h-[100%] min-w-[100%] object-cover' src={`https://cdn.pixabay.com/photo/2023/06/03/15/01/finance-8037839_960_720.jpg`} alt="" />
    </div> */}
      <div
        className={`flex flex-col justify-center items-center mx-auto bg-[#f2f2f2a3]  p-8 rounded-lg ${
          isNonMobileDevice ? "w-1/2" : "w-5/6 "
        }`}
      >
        <h1 className="text-3xl font-semibold font-mono">
          {isLogin ? "LOGIN" : "REGISTER"}
        </h1>
        <form
          action=""
          className="flex flex-col items-center gap-4 w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col p-2 w-full gap-8 mt-5">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="name"
                className="py-2 px-4 rounded-md border-2 border-[white] outline-none"
                value={name}
                onChange={handleFieldChange}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="py-2 px-4 rounded-md border-2 border-[white] outline-none"
              value={email}
              onChange={handleFieldChange}
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              className="py-2 px-4 rounded-md border-2 border-[white] outline-none"
              value={password}
              onChange={handleFieldChange}
            />
            {!isLogin && (
              <>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className="py-2 px-4 rounded-md border-2 border-[white] outline-none"
                  value={confirmPassword}
                  onChange={handleFieldChange}
                />
                <div className="border-2 border-[white] rounded-md p-2">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => {
                      setForm({ ...form, profilePicture: acceptedFiles[0] });
                    }}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="border-2 border-blue-500 border-dashed p-4 cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        {!form?.profilePicture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <div className="flex justify-between items-center">
                            <p>{form?.profilePicture?.name}</p>
                            {edit}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
              </>
            )}
          </div>
          <button className="bg-[#6464ff] hover:bg-[#5353d5] text-[white] px-8 py-2 m-2 rounded-md text-lg font-semibold shadow-xl">
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
          <p
            className=" cursor-pointer"
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
            }}
          >
            {isLogin ? "Don't have an account ? " : "Already a member ? "}
            <span className="font-bold">
              {isLogin ? "Sign Up" : "Login here"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

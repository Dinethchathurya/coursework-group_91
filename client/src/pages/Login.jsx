import React, { useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {signInSuccess, signInFailure} from '../redux/user/userSlice.js';

const Login = () => {
    const BASE_URL = "http://localhost:9000";

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const {error} = useSelector((state) => state.user);
      const navigate = useNavigate();
      const dispatch = useDispatch(); 
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${BASE_URL}/api/auth/signin`, {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            dispatch(signInFailure(data.message || "Invalid credentials. Please try again."));
          } else {
            dispatch(signInSuccess(data));
            console.log("Success");
            navigate("/"); 
          }
        } catch (err) {
          dispatch(signInFailure(err.message || "Failed to connect to the server. Please try again later.."));
        }
      };

    return (
      <div className="flex flex-col min-h-screen bg-[#000025]">

            <div className="flex-grow flex items-center justify-center bg-cover bg-center mt-10 mb-10">
                <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white rounded-xl p-8 w-full max-w-md">
                    <h2 className="text-4xl font-bold text-white text-center mb-4">Login</h2>
                    <p className="text-white text-opacity-75 text-center mb-8">
                        Please enter your login and password!
                    </p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
                            required
                        />
                    </div>

                    <div className="mb-6 text-center">
                        <a href="#" className="text-white text-opacity-75 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ed0c6e] text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-pink-500"
                    >
                        Login
                    </button>
                    </form>

                    <p className="mt-6 text-center text-white">
                        Don't have an account?{' '}
                        <a href="/register" className="text-white font-bold hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;

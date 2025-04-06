import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const BASE_URL = "http://localhost:9000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Something went wrong. Please try again.");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#000025]">
      <div className="flex-grow flex items-center justify-center bg-cover bg-center mt-10 mb-10">
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Register
          </h2>
          <p className="text-white text-opacity-75 text-center mb-8">
            Please enter your details!
          </p>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
                required
              />
                </div>

{/* <div className="mb-6 flex items-center space-x-6 justify-between">
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="gender"
      value="Male"
      checked={formData.gender === "Male"}
      onChange={handleChange}
      className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
      required
    />
    <span>Male</span>
  </label>
  <label className="flex items-center space-x-2">
    <input
      type="radio"
      name="gender"
      value="Female"
      checked={formData.gender === "Female"}
      onChange={handleChange}
      className="w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
    />
    <span>Female</span>
  </label>
</div> */}

<div className="mb-6">
  <input
    type="text"
    name="nic"
    placeholder="NIC Number"
    value={formData.nic}
    onChange={handleChange}
    className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
  />
</div>
{/* 
<div className="mb-6">
  <input
    type="text"
    name="address"
    placeholder="Address"
    value={formData.address}
    onChange={handleChange}
    className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
  />
</div> */}

<div className="mb-6">
  <input
    type="number"
    name="mobile"
    placeholder="Mobile Number"
    value={formData.mobile}
    onChange={handleChange}
    className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
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

<div className="mb-7">
  <input
    type="password"
    name="confirmPassword"
    placeholder="Confirm Password"
    value={formData.confirmPassword}
    onChange={handleChange}
    className="form-input block w-full rounded-md p-3 text-gray-700 focus:outline-none focus:ring focus:ring-gray-50"
    required
  />
</div>

<button
  type="submit"
  className="w-full bg-[#ed0c6e] text-white py-2 px-4 rounded-md text-lg font-semibold hover:bg-pink-500"
>
  Create Account
</button>
</form>

<p className="mt-6 text-center text-white">
Have an account?{" "}
<a href="/login" className="text-white font-bold hover:underline">
  Sign In
</a>
</p>
</div>
</div>
</div>
);
};
export default Register;

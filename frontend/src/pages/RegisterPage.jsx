import React, { useEffect, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Rendering");
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData]);

  // console.log(formData);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // console.log(e);

    setFormData({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerForm = new FormData();

      for (var key in formData) {
        registerForm.append(key, formData[key]);
      }
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        body: registerForm,
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("Form Data", URL.createObjectURL(formData.profileImage));
  return (
    <>
      <img
        className="w-60 h-40 mx-auto mb-0 mt-5"
        src="/StayMate logo.png"
        alt="Staymate Logo"
      />
      <div className="mt-10 max-w-md md:max-w-lg mx-auto shadow-md rounded-lg py-4 px-3 ">
        <h1 className="text-3xl md:text-4xl text-center font-medium mb-4">
          Register
        </h1>
        <form
          className="flex flex-col gap-3 items-center "
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            className="p-3 rounded-md border w-full hover:border-pink-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            className="p-3 rounded-md border w-full hover:border-pink-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="p-3 rounded-md border w-full hover:border-pink-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-3 rounded-md border w-full hover:border-pink-600 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="p-3 rounded-md border w-full hover:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p className="text-red-500 "> Password are not matched!</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
            required
          />

          <label
            htmlFor="image"
            className="flex items-center gap-3 mt-2 mb-2 cursor-pointer"
          >
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="profile-photo"
                style={{ maxWidth: "100px", borderRadius: "10px" }}
              />
            ) : (
              <LuUpload size={30} />
            )}

            <p className="text-lg text-slate-700">Upload Your Avatar</p>
          </label>

          <button
            type="submit"
            className="bg-primary p-3 w-full text-white rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={!passwordMatch}
          >
            Register
          </button>
        </form>

        <div className="mt-5 flex gap-2">
          <p>Already have an account?</p>
          <Link to={"/login"} className="text-blue-700">
            Login
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

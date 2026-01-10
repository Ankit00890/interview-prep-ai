import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/userContext.jsx';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();
  // Handle Login Form Submit
  const handlelogin = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }
    if (!password) {
      setError("Please enter the password")
      return
    }
    setError("")
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token)
        updateUser(response.data)
        navigate("/dashboard")
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message)
      }
      else {
        setError("Something went wrong .Please try again.")
      }
    }
  }
  return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-black">
      Welcome Back
    </h3>
    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Please enter your details to log in
    </p>
    <form onSubmit={handlelogin}>

      <Input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        label={"Email Address"}
        placeholder="ankit@example.com"
        type="email"
      />
      <Input
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        label={"password"}
        placeholder="Min 8 Charachters"
        type="password"
      />
      {/* error */}
      {error && (
        <p className="text-red-500 text-xs pb-2.5">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="w-full mt-4 bg-black text-white text-sm font-medium
           py-2.5 rounded-md flex items-center justify-center
           hover:bg-orange-400 transition cursor-pointer">

        LOGIN
      </button>

      <p className="mt-3 text-[13px] text-slate-800">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          className="font-medium text-primary underline cursor-pointer"
          onClick={() => setCurrentPage("signup")}
        >
          Sign Up
        </button>
      </p>


    </form>
  </div>

}

export default Login
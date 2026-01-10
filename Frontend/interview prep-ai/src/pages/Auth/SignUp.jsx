import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePicPhotoSelector from '../../components/Inputs/ProfilePicPhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import uploadImage from '../../utils/uploadImage';

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilrPic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();

  // Handle SingUp Form Submit
  const handleSingUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = ""
    if (!fullName) {
      setError("Please enter full name.")
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("")
    //  Singup Api call
    try {
      // Upload image if present
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic)
        profileImageUrl = imgUploadRes.imageUrl || ""
      }

      // const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
      //   name: fullName,
      //   email,
      //   password,
      //   profileImageUrl,
      // })
      // const { token } = response.data
      // if (token) {

      //   updateUser(response.data)
      //   navigate("/dashboard")
      // }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      })
      const { token } = response.data
      if (token) {
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
    <div className="text0lg font-semibold text-black">
      Create an Account
      <p className="">
        Join us today by entering your details below
      </p>
      <form onSubmit={handleSingUp}>
        <ProfilePicPhotoSelector image={profilePic} setImage={setProfilrPic} />


        <div className="grid grid-cols-1 md:grid1 gap-2">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label={"Full Name"}
            placeholder="Akii"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label={"Email"}
            placeholder="ankit@example.com"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label={"password"}
            placeholder="Min 8 Charachters"
            type="password"
          />
        </div>
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
             hover:bg-orange-400 transition"
        >
          SIGN UP
        </button>

        <p className="mt-3 text-[13px] text-slate-800">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  </div>
}

export default SignUp


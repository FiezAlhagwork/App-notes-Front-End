import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TextFild from "../../components/TextFild/TextFild";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("please enter the password");
      return;
    }

    setError("")
    try {
      const response = await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password
      })


      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

      if(response.data && response.data.accessTokin){
        localStorage.setItem("token" ,response.data.accessTokin)
        navigate('/dashbord')
      }
    } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("An unexpected error occurred , please try again")
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-[400px] border rounded bg-white px-7 py-10">
          <form action="" onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>

            <TextFild
              type="text"
              placeholder="Name"
              name=""
              styleInput="input-box"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextFild
              type="text"
              placeholder="Email"
              name=""
              styleInput="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <Button type="submit" className="btn-primary mb-4 w-full">
              Create Account
            </Button>

            <p className="text-center">
              Already have an account?{" "}
              <Link to="/" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

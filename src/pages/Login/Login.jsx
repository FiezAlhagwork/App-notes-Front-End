import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import TextFild from "../../components/TextFild/TextFild";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { validateEmail } from "../../utils/helper";
import PasswordInput from "../../components/PasswordInput/PasswordInput";
import axiosInstance from "../../utils/axiosinstance";
//

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("please enter a valid email address");
      return;
    }

    if (!password) {
      setError("please enter the password");
      return;
    }

    setError("");


    try {
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password
      })

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
          <form action="" onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>

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
              Login
            </Button>

            <p className="text-center">
              Not registered yet?{" "}
              <Link to="/signup" className="font-medium text-primary underline">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

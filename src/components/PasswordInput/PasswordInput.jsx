/* eslint-disable react/prop-types */
import TextFild from "../TextFild/TextFild";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const PasswordInput = ({ onChange, value }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="flex items-center bg-transparent border-[1.5px] rounded mb-3 ">
      <TextFild
        type={isShowPassword ? "text" : "password"}
        placeholder="Password"
        styleInput="w-full text-sm bg-transparent px-5 py-3 mr-3 rounded outline-none"
        value={value}
        onChange={onChange}
      />

      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer mr-4 "
          onClick={() => toggleShowPassword()}
        />
      ) : (
        <FaRegEyeSlash
          size={22}
          className="text-slate-400 cursor-pointer mr-4 "
          onClick={() => toggleShowPassword()}
        />
      )}
    </div>
  );
};

export default PasswordInput;

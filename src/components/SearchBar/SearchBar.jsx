/* eslint-disable react/prop-types */

import TextFild from "../TextFild/TextFild";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
const SearchBar = ({ value, onChange, handelSearch, onClearSearch }) => {
  return (
    <div className="sm:w-80  flex items-center px-4 bg-slate-100 rounded-md">
      <TextFild
        type="text"
        placeholder="Search Notes"
        styleInput="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />

      
      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
          onClick={onClearSearch}
        />
      )}


      <FaMagnifyingGlass
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handelSearch}
      />
    </div>
  );
};

export default SearchBar;

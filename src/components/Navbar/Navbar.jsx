/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = ({ userInfo, onSearchNotes, handelClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handelSearch = () => {
    if (searchQuery) {
      onSearchNotes(searchQuery);
    }
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow  ">
      <h2 className="text-xl font-medium text-black py-2  hidden sm:inline-block">
        {" "}
        Notes
      </h2>
      {userInfo ? (
        <>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClearSearch={() => {
              setSearchQuery("");
              handelClearSearch();
            }}
            handelSearch={handelSearch}
          />
          <ProfileInfo onLogout={onLogout} userInfo={userInfo} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;

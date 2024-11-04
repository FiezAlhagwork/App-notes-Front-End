/* eslint-disable react/prop-types */
import { getInitals } from "../../utils/helper"
import Button from "../Button/Button"

const ProfileInfo = ({onLogout , userInfo}) => {
  return (
    <div className=" flex items-center  gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100  ">
            {getInitals(userInfo.fullName)}
        </div>
        <div>
            <p className="text-sm font-medium">{userInfo.fullName}</p>
            <Button className="p-0 text-slate-700 underline" onClick={onLogout}>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default ProfileInfo
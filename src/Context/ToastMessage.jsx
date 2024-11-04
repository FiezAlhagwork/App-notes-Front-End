/* eslint-disable react/prop-types */
import  { createContext, useState } from "react";
export const  ToastMessageContext = createContext()




export const ToastMessageProvider =({ children })=> {
    const [showToastMsg , setShowToastMsg] = useState({isShow:false  , message:"" , type:"add"})

    const showToastMessage =(message , type) => {
        setShowToastMsg({
            isShow:true,
            message,
            type
        })
    }


    const handleCloseToast = () => {
        setShowToastMsg({
            isShow:false,
        })
    }
    return (
        <ToastMessageContext.Provider value={{showToastMessage , handleCloseToast , showToastMsg , setShowToastMsg}}>
            {children}
        </ToastMessageContext.Provider>
    )
}
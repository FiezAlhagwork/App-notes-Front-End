import { useContext, useEffect } from "react";
import { ToastMessageContext } from "../../Context/ToastMessage";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
const ToastMessage = () => {
  const { showToastMsg, handleCloseToast } = useContext(ToastMessageContext);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleCloseToast();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleCloseToast]);


  return (
    <div
      className={` fixed left-10 bottom-12 transition-all duration-400 
        ${showToastMsg.isShow ? "opacity-100" : " opacity-0"}
    `}
    >
      <div
        className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full 
            ${
              showToastMsg.type === "delete"
                ? "after:bg-red-500"
                : "after:bg-green-500"
            }
             after:absolute after:left-0 after:top-0 after:rounded-l-lg
        `}
      >
        <div className="flex items-center gap-2 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              showToastMsg.type === "delete" ? "bg-red-50" : "bg-green-50"
            }`}
          >
            {showToastMsg.type === "delete" ? (
              <MdDeleteOutline className="text-xl text-red-500" />
            ) : (
              <LuCheck className="text-xl text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{showToastMsg.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;

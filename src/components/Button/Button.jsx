

/* eslint-disable react/prop-types */
    
const Button = ({ onClick, type = "button", className, disabled = false , children }) => {
  return (
    <button
    type={type}
    onClick={onClick}
    className={`p-2 rounded my-1  text-sm bg-primary text-white  hover:bg-blue-600 ${className}`}
    disabled={disabled}
  >
    {children}
  </button>
  )
}

export default Button
/* eslint-disable react/prop-types */


const TextFild = ({ label, value, onChange, placeholder, type = "text", name  ,styleInput ,styleLabel,onkeydown}) => {
  return (

    <>
    {label && <label htmlFor={name} className={styleLabel}>{label}</label>}
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styleInput}
      onKeyDown={onkeydown}
    />
  </>
  )
}

export default TextFild
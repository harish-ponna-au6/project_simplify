import React from "react";

const Input = (props) => {
  const { type, name, value, placeholder, handleOnChange, label } = props;
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          required
          value={value}
          onChange={handleOnChange}
          type={type}
          name={name}
          className="form-control"
          id={name}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default Input;

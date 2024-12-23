import React from 'react';

const CheckBox = ({ id, name, type, handleClick, isChecked, value, defaultValue }) => {
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={handleClick}
        checked={isChecked}
        defaultValue={defaultValue}
      />
    </>
  );
};

export default CheckBox;

import React from "react";
import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const InputArea = ({
  register,
  defaultValue,
  required,
  name,
  prefix,
  label,
  type,
  placeholder,
  disabled,
  value,
  readOnly,
  onChange,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        {...(register
          ? register(`${name}`, {
              required: required ? `${label} ${t("is required!")}` : false,
            })
          : {})}
        defaultValue={defaultValue}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        prefix="VNĐ"
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        readOnly={readOnly}
        onChange={onChange}
      />
    </>
  );
};

export default InputArea;

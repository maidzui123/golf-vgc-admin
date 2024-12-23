import React from "react";
import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const InputPhoneArea = ({
  register,
  defaultValue,
  required,
  name,
  label,
  type,
  placeholder,
  disabled,
  value,
  readOnly,
  onChange,
  message
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Input
        {...register
          ? register(`${name}`, {
              required: required ? `${label} ${t("is required!")}` : false,
              pattern: {
                value: /^(?:\+84|84|0)((\s*[1-9]\d{0,9}\s*)+)?$/,
                message: message,
              },
            })
          : {}}
        defaultValue={defaultValue}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        disabled={disabled}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        readOnly={readOnly}
        onChange={onChange}
      />
    </>
  );
};

export default InputPhoneArea;

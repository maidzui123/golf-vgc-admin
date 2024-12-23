import React from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "../../hooks/useAsync";
import CityServices from "../../services/CityServices";
import { useTranslation } from "react-i18next";

const SelectCity = ({ setCity, register, name, label, defaultValue, disabled }) => {
  const { data: citys, loading } = useAsync(CityServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        disabled={disabled}
        onChange={(e) => setCity(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        defaultValue={defaultValue} // Set the defaultValue here
        {...register(`${name}`, {
          required: `${t(label)} ${t("is required!")}`,
        })}
      >
        {!disabled &&
          <option value="" defaultValue hidden>
            {t("Choose City")}
          </option>
        }
        {citys?.data?.map((e) => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectCity;

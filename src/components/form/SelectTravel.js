import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import TravelServices from '../../services/TravelServices';
import { useTranslation } from "react-i18next";

const SelectTravel = ({ setTravel, register, name, label }) => {
  const { data: travels, loading } = useAsync(TravelServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setTravel(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Travel")}
        </option>
        { travels.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectTravel;

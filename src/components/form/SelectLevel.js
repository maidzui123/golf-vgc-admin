import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import LevelServices from '../../services/LevelServices';
import { useTranslation } from "react-i18next";

const SelectLevel = ({ onChange, register, name, label }) => {
  const { data: levels, loading } = useAsync(LevelServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={onChange}
        className="border mr-3 h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...(register ? register(`${name}`, {
          required: t(" is required!", { label: label }),
        }) : {})}
      >
        <option value="" defaultValue hidden>
          {t("Choose Level")}
        </option>
        {levels?.data?.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select >
    </>
  );
};

export default SelectLevel;

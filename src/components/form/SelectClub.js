import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import ClubServices from '../../services/ClubServices';
import { useTranslation } from "react-i18next";

const SelectClub = ({ setClub, register, name, label }) => {
  const { data: clubs, loading } = useAsync(ClubServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setClub(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(`${label} is required!`, { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Club")}
        </option>
        { clubs.data?.map(e => (
          <option key={e._id} value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectClub;

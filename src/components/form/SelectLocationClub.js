import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import LocationClubServices from '../../services/LocationClubServices';
import { useTranslation } from "react-i18next";

const SelectLocationClub = ({ setLocationClub, register, name, label }) => {
  const { data: locationClubs, loading } = useAsync(LocationClubServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setLocationClub(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose LocationClub")}
        </option>
        { locationClubs.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectLocationClub;

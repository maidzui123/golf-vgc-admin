import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import RatingServices from '../../services/RatingServices';
import { useTranslation } from "react-i18next";

const SelectRating = ({ setRating, register, name, label }) => {
  const { data: ratings, loading } = useAsync(RatingServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setRating(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Rating")}
        </option>
        { ratings.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectRating;

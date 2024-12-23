import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import TickRequestServices from '../../services/TickRequestServices';
import { useTranslation } from "react-i18next";

const SelectTickRequest = ({ setTickRequest, register, name, label }) => {
  const { data: tickRequests, loading } = useAsync(TickRequestServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setTickRequest(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose TickRequest")}
        </option>
        {tickRequests.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectTickRequest;

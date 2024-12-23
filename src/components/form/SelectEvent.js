import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import EventServices from '../../services/EventServices';
import { useTranslation } from "react-i18next";

const SelectEvent = ({ setEvent, register, name, label }) => {
  const { data: events, loading } = useAsync(EventServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setEvent(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Event")}
        </option>
        { events.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectEvent;

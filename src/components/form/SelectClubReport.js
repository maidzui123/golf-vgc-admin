import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import ClubReportServices from '../../services/ClubReportServices';
import { useTranslation } from "react-i18next";

const SelectClubReport = ({ setClubReport, register, name, label }) => {
  const { data: clubReports, loading } = useAsync(ClubReportServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setClubReport(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose ClubReport")}
        </option>
        { clubReports.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectClubReport;

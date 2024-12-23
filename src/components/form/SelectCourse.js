import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import CourseServices from '../../services/CourseServices';
import { useTranslation } from "react-i18next";

const SelectCourse = ({ setCourse, register, name, label }) => {
  const { data: courses, loading } = useAsync(CourseServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setCourse(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} ${t("is required!")}`,
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Course")}
        </option>
        {courses?.data?.map(e => (
          <option key={e._id} value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectCourse;

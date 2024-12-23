import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import SearchKeywordServices from '../../services/SearchKeywordServices';
import { useTranslation } from "react-i18next";

const SelectSearchKeyword = ({ setSearchKeyword, register, name, label }) => {
  const { data: searchKeywords, loading } = useAsync(SearchKeywordServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setSearchKeyword(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose SearchKeyword")}
        </option>
        { searchKeywords.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectSearchKeyword;

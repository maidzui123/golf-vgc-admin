import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import VoucherServices from '../../services/VoucherServices';
import { useTranslation } from "react-i18next";

const SelectVoucher = ({ setVoucher, register, name, label }) => {
  const { data: vouchers, loading } = useAsync(VoucherServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setVoucher(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose Voucher")}
        </option>
        { vouchers.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectVoucher;

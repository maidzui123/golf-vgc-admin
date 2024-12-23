import React from 'react';
import { Select } from '@windmill/react-ui';
import useAsync from '../../hooks/useAsync';
import PaymentMethodServices from '../../services/PaymentMethodServices';
import { useTranslation } from "react-i18next";

const SelectPaymentMethod = ({ setPaymentMethod, register, name, label }) => {
  const { data: paymentMethods, loading } = useAsync(PaymentMethodServices.getAll);
  const { t } = useTranslation();

  return (
    <>
      <Select
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: t(" is required!", { label: label }),
        })}
      >
        <option value="" defaultValue hidden>
          {t("Choose PaymentMethod")}
        </option>
        { paymentMethods.map(e => (
          <option value={e._id}>{e.name}</option>
        ))}
      </Select>
    </>
  );
};

export default SelectPaymentMethod;

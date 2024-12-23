import React from "react";
import { Select } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const SelectRole = ({ setRole, register, name, label }) => {
  const { t } = useTranslation();
  return (
    <>
      <Select
        onChange={(e) => setRole(e.target.value)}
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        {...register(`${name}`, {
          required: `${label} ${t("is required!")}`,
        })}
      >
        <option value="" defaultValue hidden>
          {t("Staff role")}
        </option>
        <option value="Admin">{t("Admin")}</option>
        <option value="Staff">{t("Staff")}</option>
        <option value="Manager">{t("Manager")}</option>
        <option value="Accountant">{t("Accountant")}</option>
        <option value="Driver">{t("Driver")}</option>
        <option value="DeliverPerson">{t("Deliver Person")}</option>
        <option value="Customer">{t("Customer")}</option>
      </Select>
    </>
  );
};

export default SelectRole;

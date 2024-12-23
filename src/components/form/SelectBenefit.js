// SelectBenefit.js
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  TableBody,
  TableRow,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import CheckBox from "components/form/CheckBox";

import useAsync from "hooks/useAsync";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import BenefitServices from "services/BenefitServices";
import { el } from "date-fns/locale";

const SelectBenefit = ({ id, benefits, setBenefits, setValue }) => {
  const [options, setOptions] = useState([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { t } = useTranslation();
  const newBenefits = [...benefits];
  const getOptions = newBenefits.map((benefit) => benefit.value);

  // const handleSelectAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(data?.data.map((li) => li._id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    newBenefits.push(options.find((obj) => obj.value === id));
      setBenefits(newBenefits);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
      setBenefits(newBenefits.filter((obj) => obj.value !== id));
    }
    
  };

  const { data, loading } = useAsync(() =>
    BenefitServices.getAll({ page: 1, limit: 1000 })
  );

  useEffect(() => {
    if (data) {
      const benefitsOption = data?.data?.map((benefit) => ({
        label: benefit.name,
        value: benefit._id,
      }));
      if (benefitsOption?.length > 0) {
        setOptions(benefitsOption);
      }
    }
  }, [data]);
  // Get Data's Benefit of Level and show in Checkbox
  useEffect(() => {
    setIsCheck(getOptions);
  }, [benefits]);

  return (
    // <MultiSelect
    //   options={options}
    //   value={benefits}
    //   onChange={setBenefits}
    //   disableSearch

    <TableContainer className="mb-8 rounded-b-lg">
      <Table>
        <TableHeader>
          <tr>
            <TableCell>
              {/* <CheckBox
                type="checkbox"
                name="selectAll"
                id="selectAll"
                check={isCheckAll}
                handleClick={handleSelectAll}
              /> */}
            </TableCell>
          <TableCell className="text-center">{t("Benefits Name")}</TableCell>
          </tr>
        </TableHeader>
        <TableBody>
          {options?.map((item, i) => (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox
                  // value={benefits}
                  type="checkbox"
                  name={item?.value}
                  id={item?.value}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(item.value)}
                />
              </TableCell>
              <TableCell>
                <span className="text-sm">{item?.label}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <TableFooter>
        <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Benefit Page Navigation"
            />
      </TableFooter> */}
    </TableContainer>
  );
};

export default SelectBenefit;

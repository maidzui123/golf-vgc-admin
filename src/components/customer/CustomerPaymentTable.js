import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import Status from "components/table/Status";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";

const CustomerPaymentTable = ({ data }) => {
  const { globalSetting } = useFilter();
  return (
    <>
      <TableBody>
        {data?.map((item) => (
          <TableRow key={item._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {item?.invoice}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.discount}</span>
            </TableCell>
            <TableCell className="text-center text-red-500 font-semibold">
              <span className="text-sm">{item.total}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {item.description}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <Status status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerPaymentTable;

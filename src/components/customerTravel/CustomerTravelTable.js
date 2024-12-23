import {
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import Status from "components/table/Status";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";

//internal import

const CustomerTravelTable = ({ data }) => {
  const { globalSetting } = useFilter();

  console.log(data);

  return (
    <>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">
                {item?.travel_id?.name}
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

            <TableCell className="text-center truncate max-w-md">
              <span className="text-sm">
                {item?.travel_id?.description}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item?.guest_num}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <Status status={item.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTravelTable;

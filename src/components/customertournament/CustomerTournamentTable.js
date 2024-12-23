import {
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import Status from "components/table/Status";

//internal import

const CustomerTournamentTable = ({ data }) => {
  const { globalSetting } = useFilter();

  return (
    <>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">
                {item?.tournament_id?.name}
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
              <span className="text-sm">
                {showDateFormat(
                  item.tournament_id?.start_date,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item.tournament_id?.club_id?.name}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item?.tournament_id?.register_date,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>


            <TableCell className="text-right">
              <Status status={item?.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTournamentTable;

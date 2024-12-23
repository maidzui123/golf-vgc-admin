import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import CustomerEventDrawer from "components/drawer/CustomerEventDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import { showDateFormat } from "utils/dateFormate";
import useFilter from "hooks/useFilter";
import Status from "components/table/Status";

//internal import

const CustomerEventTable = ({ data }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { globalSetting } = useFilter();

  return (
    <>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">
                {item?.event_id?.name}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item?.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item?.event_id?.club_id?.name}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item?.event_id?.organization}
              </span>
            </TableCell>

            <TableCell className="text-right">
              <Status id={item?._id} status={item?.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
  
};

export default CustomerEventTable;

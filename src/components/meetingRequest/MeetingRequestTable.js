import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import MeetingRequestDrawer from "components/drawer/MeetingRequestDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import useFilter from "hooks/useFilter";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showDateFormat } from "utils/dateFormate";
import { showingTranslateValue } from "utils/translate";

//internal import

const MeetingRequestTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { globalSetting } = useFilter();


  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <MeetingRequestDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.from?.first_name || ""} {item?.from?.last_name || ""}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">{item?.to?.first_name || ""} {item?.to?.last_name || ""}</span>
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
                {showDateFormat(
                  item?.time_play,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item?.note}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <Status status={item?.status} />
            </TableCell>
            <TableCell className="text-right">
              <span className="text-sm">
                {item?.location}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default MeetingRequestTable;

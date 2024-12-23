import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ClubDrawer from "components/drawer/ClubDrawer";
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
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";

//internal import

const ClubTable = ({ data, isCheck, setIsCheck }) => {
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
        <MainDrawer>{serviceId && <ClubDrawer id={serviceId} />}</MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell className="flex items-center">
              <Avatar
                className="hidden mr-3 md:block bg-gray-50"
                src={
                  item?.avatar?.path ||
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
                alt="staff"
              />
              <span className="text-sm font-semibold">{item?.name}</span>
            </TableCell>

            <TableCell className="truncate max-w-md">
              <span className="text-sm ">
                {item?.description && item?.description?.length > 50
                  ? item?.description?.slice(0, 50) + "..."
                  : item?.description}
              </span>
            </TableCell>

            <TableCell className="truncate max-w-md">
              <span className="text-sm">{item?.rules}</span>
            </TableCell>

            <TableCell className="text-center text-red-600 font-semibold">
              <span className="text-sm">
                {`${item?.fee?.toLocaleString()} ${"VND"}`}
              </span>
            </TableCell>

            <TableCell className="text-center text-sm">
              {`${item?.created_by?.first_name || ""} ${item?.created_by?.last_name || ""
                }`}
            </TableCell>

            <TableCell className="text-center text-sm">
              {item.createdAt &&
                showDateFormat(
                  item?.createdAt,
                  globalSetting.default_date_format
                )}
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleModalOpen={handleModalOpen}
                title={item?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ClubTable;

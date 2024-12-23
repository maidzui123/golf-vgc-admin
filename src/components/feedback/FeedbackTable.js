import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import FeedbackDrawer from "components/drawer/FeedbackDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiEye, FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import { showDateFormat } from "utils/dateFormate";
import useFilter from "hooks/useFilter";

//internal import

const FeedbackTable = ({ data, isCheck, setIsCheck }) => {
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
          {serviceId && <FeedbackDrawer id={serviceId} />}
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell className="font-semibold  text-orange-500">
              <div className="flex items-center justify-center gap-4">
                <Avatar
                  className="text-center hidden md:block bg-gray-50"
                  src={
                    item?.customer?.avatar?.path ||
                    "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                  }
                  alt={item.name}
                />
                <span className="text-sm flex-1 text-left">
                  {`${item?.customer?.first_name} ${item?.customer?.last_name}` ||
                    "Not Found"}
                </span>{" "}
              </div>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item?.customer?.phone || "null"}
              </span>
            </TableCell>

            <TableCell className="text-center text-sm">
              <span>
                {item.createdAt &&
                  showDateFormat(
                    item?.createdAt,
                    globalSetting.default_date_format
                  )}
              </span>
            </TableCell>

            <TableCell className="text-sm text-green-500 truncate max-w-xs">
              {item?.description || "Empty ..."}
            </TableCell>

            <TableCell className="flex justify-end">
              <Button
                onClick={() => {
                  handleUpdate(item?._id);
                }}
                disabled={isCheck?.length > 0}
                className="p-2 cursor-pointer text-white hover:text-black-600 focus:outline-none flex justify-end gap-1 w-fit"
              >
                <Tooltip
                  id="view"
                  Icon={FiEye}
                  title={t("View")}
                  bgColor="#34D399"
                />
                <span>{t("View Details")}</span>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default FeedbackTable;

import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import NewsDrawer from "components/drawer/NewsDrawer";
import CheckBox from "components/form/CheckBox";
import { dangerouslySetInnerHTML } from "react";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useFilter from "hooks/useFilter";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showDateFormat } from "utils/dateFormate";
import { showingTranslateValue } from "utils/translate";

//internal import

const NewsTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const { globalSetting } = useFilter();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <NewsDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title?.en}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item._id)}
              />
            </TableCell>

            <TableCell className="text-center flex justify-center items-center">
              <Avatar
                className="text-center hidden md:block bg-gray-50"
                src={
                  item?.images[0]?.path ||
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
                alt="news image"
              />
            </TableCell>

            <TableCell className="overflow-hidden">
              <span className="font-semibold text-green-600 text-sm">
                {item?.title.length >= 50
                  ? item?.title.substring(0, 50) + " ..."
                  : item?.title}
              </span>
            </TableCell>

            {/* <TableCell className="max-w-xs overflow-x-hidden">
              <span className="text-sm">
                {item?.description.length >= 50
                  ? String(item?.description).substring(0, 50) + "..."
                  : item?.description}
              </span>
            </TableCell> */}

            <TableCell>
              <span
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(item?.description, 50),
                }}
              ></span>
            </TableCell>

            {/* <TableCell className="text-center">
                            <span className="text-center text-sm text-orange-500 font-semibold">
                                {String(item?.created_by?.email)}
                            </span>
                        </TableCell> */}

            <TableCell className="text-center text-sm">
              <span>
                {item.createdAt &&
                  showDateFormat(
                    item?.createdAt,
                    globalSetting.default_date_format
                  )}
              </span>
            </TableCell>
            <TableCell className="flex justify-end">
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={item?.title.substring(0, 30) + " ..."}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default NewsTable;

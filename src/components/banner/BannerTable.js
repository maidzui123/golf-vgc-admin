import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import BannerDrawer from "components/drawer/BannerDrawer";
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

//internal import

const BannerTable = ({ data, isCheck, setIsCheck }) => {
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
          <BannerDrawer id={serviceId} />
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

            <TableCell className="max-w-xs">
              <span className="font-semibold text-green-600 text-sm">
                {item?.name?.length >= 50 ? item?.name.substring(0, 50) + " ..." : item?.name}
              </span>
            </TableCell>

            <TableCell className="overflow-x-hidden">
              {/* <span className="text-sm">
                {item?.description.length >= 50 ? String(item?.description).substring(0, 50) + "..." : item?.description}
              </span> */}
              <span
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: truncateDescription(item?.description, 50),
                }}
              ></span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-center text-sm font-semibold text-orange-500">
                {String(item?.created_by?.email)}
              </span>
            </TableCell>

            <TableCell className="text-center text-sm">
              <span>
                {item.createdAt && showDateFormat(
                  item?.createdAt,
                  globalSetting.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
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

export default BannerTable;

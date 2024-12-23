import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ClubReportDrawer from "components/drawer/ClubReportDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { dangerouslySetInnerHTML } from "react";
import { t } from "i18next";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Status from "components/table/Status";
import EditDeleteButton from "components/table/EditDeleteButton";
import { useState } from "react";
import HoverText from "components/hoverText/HoverText";

//internal import

const ClubReportTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const truncateDescription = (description, maxLength) => {
    if (description === undefined) {
      // Handle the case where description is undefined
      return "";
    }
    console.log(data)
    return description.length > maxLength
      ? description.slice(0, maxLength) + "..."
      : description;
  };
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      <MainDrawer>
        {serviceId && <ClubReportDrawer id={serviceId} />}
      </MainDrawer>

      <TableBody>
        {data?.map((item, i) => (
          <TableRow>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title?.en}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item._id)}
              />
            </TableCell>

            {/* Name Club */}
            <TableCell>
              <span className="text-sm">{item?.post?.club?.name || ""}</span>
            </TableCell>

            {/* Post Owner */}
            <TableCell className="text-center">
              <span className="text-sm font-semibold text-orange-600">
                {item?.post?.customer?.first_name || "Poster"} {item?.post?.customer?.last_name || ""}
              </span>
            </TableCell>

            {/* Post Description */}
            <TableCell className="text-sm">
              <HoverText id={item?._id} title={truncateDescription(item?.post?.description, 100)} bgColor={"#eee"}>
                <span className="text-sm" dangerouslySetInnerHTML={{ __html: truncateDescription(item?.post?.description, 100), }}></span>
              </HoverText>
            </TableCell>

            <TableCell className="text-center flex justify-center items-center text-sm">
              {item?.reports?.length}
              <button
                onClick={() => {
                  handleUpdate(item?._id);
                }}
                disabled={isCheck?.length > 0}
                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
              >
                <Tooltip
                  id="view"
                  Icon={FiEye}
                  title={t("View Detail's Report")}
                  bgColor="#34D399"
                />
              </button>
            </TableCell>

            {/* Status */}
            {/* <TableCell TableCell className="text-center">
              <Status status={item?.status || "Pending"} />
            </TableCell> */}

            <TableCell className="text-right">
              <button
                disabled={isCheck?.length > 0}
                onClick={() =>
                  handleModalOpen(
                    item?.post?._id,
                    item?.post?.description.substring(0, 50) + " ...",
                    item
                  )
                }
                className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none"
              >
                <Tooltip
                  id="delete"
                  Icon={FiTrash2}
                  title={t("Delete Post")}
                  bgColor="#EF4444"
                />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ClubReportTable;

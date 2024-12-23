import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import silverMemberLogo from "../../assets/img/membership/silver.png";
import goldMemberLogo from "../../assets/img/membership/gold.png";
import platinumMemberLogo from "../../assets/img/membership/platinum.png";
import diamondMemberLogo from "../../assets/img/membership/diamond.png";
import { BsFillCheckCircleFill } from "react-icons/bs";
import CustomerDrawer from "components/drawer/CustomerDrawer";
import MainDrawer from "components/drawer/MainDrawer";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import Tooltip from "components/tooltip/Tooltip";
import * as dayjs from "dayjs";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import React from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
// internal imports

const CustomerTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <DeleteModal id={serviceId} title={title} />

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                {user?._id?.substring(20, 24)}
              </span>
            </TableCell>

            <TableCell className="flex items-center">
              <Avatar
                className="hidden mr-2 md:block bg-gray-50"
                src={
                  user?.avatar?.path ||
                  "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
                alt={user.name}
              />
              <span className="text-sm font-semibold text-green-500">
                {user.first_name || ""} {user.last_name || ""}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{user.phone}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm font-medium text-orange-500">
                {user.email}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>

            {/* create a table cell to display if use has user.level.level_id , display user.level.level_id.name */}

            <TableCell className="text-center">
              <span className="text-sm font-medium text-orange-500">
                {user.level && user.level.level_id && (
                  <span>{t(user.level.level_id.name)}</span>
                )}
              </span>
            </TableCell>

            <TableCell className="">
              <span className="flex items-center justify-center mt-1">
                {user.tick_status === 0 ? (
                  <span className="w-6 text-gray-300">
                    <BsFillCheckCircleFill />
                  </span>
                ) : user.tick_status === 1 ? (
                  <span className="w-6 text-green-400">
                    <BsFillCheckCircleFill />
                  </span>
                ) : (
                  <span className="w-6 text-yellow-400">
                    <BsFillCheckCircleFill />
                  </span>
                )}
              </span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                  {" "}
                  <Link to={`/customer/${user._id}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("View Detail's Customer")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  id={user?._id}
                  title={user?.first_name}
                  // handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;

import {
  Avatar,
  Badge,
  Button,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import TickRequestDrawer from "components/drawer/TickRequestDrawer";
import CheckBox from "components/form/CheckBox";
import AcceptTickModal from "components/modal/AcceptTickModal";
import DeleteModal from "components/modal/DeleteModal";
import RejectTickModal from "components/modal/RejectTickModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import { SidebarContext } from "context/SidebarContext";
import useFilter from "hooks/useFilter";
import useTickRequestSubmit from "hooks/useTickRequestSubmit";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import TickRequestServices from "services/TickRequestServices";
import { showDateFormat } from "utils/dateFormate";
import { notifyError, notifySuccess } from "utils/toast";
import { showingTranslateValue } from "utils/translate";

//internal import

const TickRequestTable = ({ data, isCheck, setIsCheck }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    handleAcceptTickModalOpen,
    handleRejectTickModalOpen,
  } = useToggleDrawer();

  const { globalSetting } = useFilter();
  const { t } = useTranslation();

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
          <TickRequestDrawer id={serviceId} />
        </MainDrawer>
      )}

      <AcceptTickModal id={serviceId} />
      <RejectTickModal id={serviceId} />

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

            <TableCell className="text-center">
              <span className="text-sm text-center text-green-600 font-semibold">
                {`${item?.customer?.first_name} ${item?.customer?.last_name}` ||
                  item?._id.substring(20, 4)}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm text-center">
                {`${item?.customer?.email}`}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm text-center">
                {`${item?.customer?.phone}`}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {item.createdAt &&
                  showDateFormat(
                    item?.createdAt,
                    globalSetting.default_date_format
                  )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <Status id={item._id} status={item.status} />
            </TableCell>

            <TableCell>
              <span className="text-sm">{item.description}</span>
            </TableCell>

            <TableCell>
              {item?.status === "PENDING" && (
                <div className="flex justify-end gap-2">
                  <Button onClick={() => handleAcceptTickModalOpen(item._id)}>
                    {t("ACCEPT")}
                  </Button>
                  <Button
                    onClick={() => handleRejectTickModalOpen(item._id)}
                    layout="__dropdownItem"
                  >
                    {t("REJECT")}
                  </Button>
                </div>
              )}

              {item?.status === "REJECTED" && (
                <div className="flex justify-end gap-2">
                  <Button onClick={() => handleAcceptTickModalOpen(item._id)}>
                    {t("ACCEPT")}
                  </Button>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TickRequestTable;

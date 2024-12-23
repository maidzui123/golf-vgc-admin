import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import TravelDrawer from "components/drawer/TravelDrawer";
import CheckBox from "components/form/CheckBox";

import DeleteModal from "components/modal/DeleteModal";
import ChangeStatus from "components/table/ChangeStatus";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Status from "components/table/Status";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import TravelServices from "services/TravelServices";
import { useEffect, useState } from "react";

//internal import

const TravelTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [deletedCheck, setDeletedCheck] = useState({});

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    const initialDeletedCheck = {};
    data.forEach((item) => {
      initialDeletedCheck[item._id] = item.active;
    });

    setDeletedCheck(initialDeletedCheck);
  }, [data]);


  const handleDeleteToggle = async (itemId) => {
    const res = await TravelServices.changeActive(itemId, {
      active: !deletedCheck[itemId],
    });
    setDeletedCheck((prevDeletedCheck) => ({
      ...prevDeletedCheck,
      [itemId]: !prevDeletedCheck[itemId],
    }));
  };
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <TravelDrawer id={serviceId} />
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
            <TableCell className="font-semibold uppercase text-xs">
              <span className="text-sm">{item?.name}</span>
            </TableCell>
            <TableCell className="w-40 truncate">
              <div className="text-sm truncate w-40">
                <span className="text-sm truncate w-40">
                  {item?.description}
                </span>
              </div>
            </TableCell>

            <TableCell className="text-center">
              <Status status={item.status} />
            </TableCell>
            {/* <TableCell className="text-center">
              <CheckBox
                type="checkbox"
                name="active"
                id={item._id}
                handleClick={() => handleDeleteToggle(item._id)}
                isChecked={deletedCheck[item._id]}
              />
            </TableCell> */}
            <TableCell>
              <div className="flex items-center justify-end">
                <Link
                  to={`/travel/${item._id}`}
                  className="flex justify-center text-gray-400 hover:text-green-600 mr-2"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={t("View")}
                    bgColor="#10B981"
                  />
                </Link>

                <EditDeleteButton
                  id={item._id}
                  product={item}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={(id, title) => handleModalOpen(id, title)}
                  title={item?.name}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody >
    </>
  );
};

export default TravelTable;

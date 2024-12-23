import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import EventDrawer from "components/drawer/EventDrawer";
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
import Status from "components/table/Status";
import EventServices from "services/EventServices";
import { useEffect, useState } from "react";

//internal import

const EventTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [deletedCheck, setDeletedCheck] = useState({});
  useEffect(() => {
    const initialDeletedCheck = {};
    data.forEach((item) => {
      initialDeletedCheck[item._id] = item.active;
    });

    setDeletedCheck(initialDeletedCheck);
  }, [data]);

  const handleDeleteToggle = async (itemId) => {
    const res = await EventServices.changeActive(itemId, {
      active: !deletedCheck[itemId],
    });
    setDeletedCheck((prevDeletedCheck) => ({
      ...prevDeletedCheck,
      [itemId]: !prevDeletedCheck[itemId],
    }));
  };

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
          <EventDrawer id={serviceId} />
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
            <TableCell>
              <span className="text-sm">
                {item?.name && item?.name?.length > 50
                  ? item?.name?.slice(0, 50) + "..."
                  : item?.name}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {item?.description && item?.description?.length > 50
                  ? item?.description?.slice(0, 50) + "..."
                  : item?.description}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Status status={item?.status} />
              {/* {product.status} */}
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

            <TableCell className="text-right">
              <div className="flex items-center justify-end">
                <Link
                  to={`/event/${item._id}`}
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
                  handleModalOpen={handleModalOpen}
                  title={item?.name}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default EventTable;

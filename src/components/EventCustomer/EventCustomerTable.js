import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import Status from "components/table/Status";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import { Link } from "react-router-dom";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import { useState } from "react";
import EventCustomerDrawer from "components/drawer/EventCustomerDrawer";
//internal import

const EventCustomerTable = ({ data, isCheck, setIsCheck, eventId}) => {
  const { globalSetting } = useFilter();
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [customerId, setCustomerId] = useState("")
  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <>
      <DeleteModal id={serviceId} title={title} pageId={eventId}/>

      <MainDrawer>
        <EventCustomerDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span
                className="text-sm hover:text-transparent"
                style={{
                  fontWeight: "bold",
                  transitionDuration: "0.3s",
                  transitionProperty: "color",
                  transition: "color",
                }}
              >
                <Link to={`/customer/${item?.customer?._id}`}>
                  {item?.customer?.full_name}
                </Link>
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.customer_email || item?.customer?.email}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.customer_phone || item?.customer?.phone}</span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={(id) => {handleUpdate(id)}}
                handleModalOpen={(id, title, product) => {handleModalOpen(id, title, product)}}
                title={item?.customer_name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default EventCustomerTable;

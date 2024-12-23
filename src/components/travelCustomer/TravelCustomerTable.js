import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import Status from "components/table/Status";
import useFilter from "hooks/useFilter";
import { showDateFormat } from "utils/dateFormate";
import { Link } from "react-router-dom";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import TravelCustomerDrawer from "components/drawer/TravelCustomerDrawer";
import { useState } from "react";
//internal import

const CustomerTravelTable = ({ data, isCheck, setIsCheck, travelId }) => {
  const { globalSetting } = useFilter();
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [customerId, setCustomerId] = useState("");
  const VND_CURRENCY = "VND";
  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  return (
    <>
      <DeleteModal id={serviceId} title={title} pageId={travelId}/>

      <MainDrawer>
        <TravelCustomerDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              {/* stylish the name of customer, so it will be more visible */}
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
                  {item?.customer?.first_name} {item?.customer?.last_name}
                </Link>
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item?.booked_date,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.customer?.email}</span>
            </TableCell>

            <TableCell className="text-center">
              {Number(item?.order?.total).toLocaleString() + " " + VND_CURRENCY}
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">{item?.payment?.source}</span>
            </TableCell>

            <TableCell className="text-center">
              <Status status={item?.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item?._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={(id) => {handleUpdate(id)}}
                handleModalOpen={(id, title, product) => {handleModalOpen(id, title, product)}}
                title={item?.customer?.full_name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTravelTable;

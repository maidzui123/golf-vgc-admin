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
import TournamentCustomerDrawer from "components/drawer/TournamentCustomerDrawer";
import { useContext } from "react";
import { SidebarContext } from "context/SidebarContext";
//internal import

const TournamentCustomerTable = ({
  data,
  isCheck,
  setIsCheck,
  currentDrawer,
  tournamentId,
  setCurrentDrawer,
}) => {
  const { globalSetting } = useFilter();

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [isTournamentCustomerDrawerOpen, setIsTournamentCustomerDrawerOpen] =
    useState(false);

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
      {currentDrawer === "tournamentCustomer" && (
        <DeleteModal
          id={serviceId}
          title={title}
          pageId={tournamentId}
          currentTable={currentDrawer}
        />
      )}

      {/* <MainDrawer> */}
        {currentDrawer === "tournamentCustomer" && (
            <TournamentCustomerDrawer key={serviceId} id={serviceId} />
        )}
      {/* </MainDrawer> */}

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
                  item?.createdAt,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.customer?.email}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.customer?.phone}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {item?.order?.total
                  ? Number(item.order.total).toLocaleString() +
                    " " +
                    VND_CURRENCY
                  : "N/A"}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">{item?.payment?.source || "N/A"}</span>
            </TableCell>
            <TableCell className="text-center">
              <Status status={item?.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item?._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={(id) => {
                  setCurrentDrawer("tournamentCustomer");
                  handleUpdate(id);
                }}
                handleModalOpen={(id, title, product) => {
                  setCurrentDrawer("tournamentCustomer");
                  handleModalOpen(id, title, product);
                }}
                title={item?.customer?.full_name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default TournamentCustomerTable;

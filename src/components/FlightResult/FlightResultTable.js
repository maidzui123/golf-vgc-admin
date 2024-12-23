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
import FlightTournamentDrawer from "components/drawer/FlightTournamentDrawer";
import FlightDrawer from "components/drawer/FlightDrawer";
import { useContext } from "react";
import { SidebarContext } from "context/SidebarContext";
import FlightResultDrawer from "components/drawer/FlightResultDrawer";
const FlightResultTable = ({
  data,
  tournamentId,
  currentDrawer,
  setCurrentDrawer,
}) => {
  const { globalSetting } = useFilter();
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  return (
    <>
      {currentDrawer === "FlightResult" && (
        <DeleteModal
          id={serviceId}
          title={title}
          pageId={tournamentId}
          currentTable={currentDrawer}
        />
      )}
      {/* <MainDrawer> */}
        {currentDrawer === "FlightResult" && (
          <FlightResultDrawer
            key={serviceId}
            id={serviceId}
            tournamentId={tournamentId}
          />
        )}
      {/* </MainDrawer> */}
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.name}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.players?.length}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {item?.players.map((player, index) => (
                  (index === item.players.length - 1) ? player.customer_name : player.customer_name + ", "
                ))}
              </span>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={item?._id}
                product={item}
                handleUpdate={(id) => {
                  setCurrentDrawer("FlightResult");
                  handleUpdate(id);
                }}
                handleModalOpen={(id, title, product) => {
                  setCurrentDrawer("FlightResult");
                  handleModalOpen(id, title, product);
                }}
                title={item?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
export default FlightResultTable;

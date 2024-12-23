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

//internal import

const FlightTournamentTable = ({
  data,
  isCheck,
  setIsCheck,
  tournamentId,
  currentDrawer,
  setCurrentDrawer,
}) => {
  const { globalSetting } = useFilter();
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  console.log(data)
  return (
    <>
      {currentDrawer === "flight" && (
        <DeleteModal
          id={serviceId}
          title={title}
          pageId={tournamentId}
          currentTable={currentDrawer}
        />
      )}
      {/* <MainDrawer> */}
      {currentDrawer === "flight" && (
        <FlightDrawer
          key={serviceId}
          id={serviceId}
          tournamentId={tournamentId}
          currentDrawer={currentDrawer}
        />
      )}
      {/* </MainDrawer> */}
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.flight}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.players?.length}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                {item?.players.map((player, index) => (
                  (index === item.players.length - 1) ? player.last_name : player.last_name + ", "
                ))}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">
                <Status status={item?.status} />
              </span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">
                {showDateFormat(
                  item?.start_date,
                  globalSetting?.default_date_format
                )}
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={item?._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={(id) => {
                  setCurrentDrawer("flight");
                  handleUpdate(id);
                }}
                handleModalOpen={(id, title, product) => {
                  setCurrentDrawer("flight");
                  handleModalOpen(id, title, product);
                }}
                title={item?.flight}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default FlightTournamentTable;

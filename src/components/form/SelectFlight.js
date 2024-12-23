import React from "react";
import { Select } from "@windmill/react-ui";
import useAsync from "../../hooks/useAsync";
import FlightServices from "../../services/FlightServices";
import { useTranslation } from "react-i18next";
import FlightResultServices from "services/FlightResultServices";

const SelectFlight = ({
  tournamentId,
  setFlight,
  register,
  name,
  label,
  onChoosePlayer,
  chosenPlayers, // Pass the list of chosen players as a prop
}) => {
  const { data: flights, loading } = useAsync(() =>
    FlightResultServices.getAllPlayerInTour(tournamentId)
  );

  const { t } = useTranslation();

  // Filter out chosen players from the available options
  const availablePlayers = flights?.data?.filter(
    (flight) => !chosenPlayers.some((chosen) => chosen._id === flight._id)
  );
  return (
    <>
      <Select
        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
        name={name}
        onChange={(e) => {
          const selectedFlight = availablePlayers?.find(
            (flight) => flight?._id === e.target.value
          );

          if (selectedFlight) {
            // Now `selectedFlight` contains the selected flight object
            onChoosePlayer((prev) => [...prev, selectedFlight]);
          }
        }}
      >
        <option value="" defaultValue hidden>
          {t("Choose Player")}
        </option>

        {availablePlayers?.map((e) => (
          <option key={e?._id} value={e?._id}>
            {e?.customer_name}
            {" - HDC: "}
            {e?.customer_hdc_num}
            {" - VGA: "}
            {e?.customer_vga_num}
            {" - Điểm hiện tại: "}
            {e?.score}
          </option>
        ))}
      </Select>
    </>
  );
};

export default SelectFlight;

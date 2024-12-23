import React, { useContext } from "react";
import Switch from "react-switch";
import { useLocation } from "react-router-dom";

//internal import
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";

import TravelServices from "../../services/TravelServices";

import CustomerTravelServices from "../../services/CustomerTravelServices";

/** TODO: SHOWHIDEBUTTON IMPORT */
const ChangeStatus = ({
  id,
  status,
  category,
  currencyStatusName,
  setStatus,
}) => {
  const location = useLocation();
  const { setIsUpdate } = useContext(SidebarContext);
  const handleChangeStatus = async (id) => {
    let newStatus;
    try {
      if (status === "show") {
        newStatus = "hide";
      } else {
        newStatus = "show";
      }
      if (location.pathname === "/customerTravels") {
        CustomerTravelServices.updateStatus(id, { status: newStatus })
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(res.message);
          })
          .catch((err) => notifyError(err.message));
      }
      if (location.pathname === "/travels") {
        TravelServices.updateStatus(id, { status: newStatus })
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(res.message);
          })
          .catch((err) => notifyError(err.message));
      }
      /** TODO: SHOWHIDEBUTTON*/
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  return (
    <Switch
      onChange={() => handleChangeStatus(id)}
      checked={status === "show" ? true : false}
      className="react-switch md:ml-0"
      uncheckedIcon={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: 120,
            fontSize: 14,
            color: "white",
            paddingRight: 22,
            paddingTop: 1,
          }}
        ></div>
      }
      width={30}
      height={15}
      handleDiameter={13}
      offColor="#E53E3E"
      onColor={"#2F855A"}
      checkedIcon={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 73,
            height: "100%",
            fontSize: 14,
            color: "white",
            paddingLeft: 20,
            paddingTop: 1,
          }}
        ></div>
      }
    />
  );
};

export default ChangeStatus;

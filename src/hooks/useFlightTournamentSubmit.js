import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import FlightServices from "../services/FlightServices";
import { useTranslation } from "react-i18next";

const useFlightSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [latestUpdate, setLatestUpdate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [player, setPlayer] = useState([]);
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const one = {
      data,
    };

    if (id) {
      FlightServices.updateOne(id, data)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      FlightServices.addOne(data)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("description");
      setValue("tournament");
      clearErrors("name");
      setValue("flight");
      setValue("hole");
      setValue("start_time");
      setLatestUpdate("");
      setPlayer([]);
      clearErrors("description");
      clearErrors("tournament");
      return;
    }
    if (id) {
      FlightServices.getById(id)
        .then((res) => {
          if (res) {
            console.log("res", res);
            setValue("flight", res.flight);
            setValue("hole", res.hole);
            setValue("tournament", res.tournament);
            setPlayer(res.players);
            setValue("start_time", dayjs(res.start_time).format("YYYY-MM-DD"));
            setLatestUpdate(dayjs(res.updatedAt).format("DD/MM/YYYY HH:mm:ss"));
          }
        })
        .catch((err) => {
          notifyError(t("There is a server error!"));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    latestUpdate,
    player,
  };
};

export default useFlightSubmit;

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import FlightServices from "../services/FlightServices";

import FlightResultServices from "services/FlightResultServices";
import { useTranslation } from "react-i18next";
import { set } from "cloudinary/lib/cache";

const useFlightResultSubmit = ({ id, tournamentId }) => {
  const [choosePlayer, setChoosePlayer] = useState([]);
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [player, setPlayer] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const one = {
      data: {
        ...data,
        players: choosePlayer,
        tournamentId: tournamentId,
      },
    };
    if (id) {
      FlightResultServices.updateOne(id, one)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      FlightResultServices.addOne({
        data: {
          ...data,
          tournament_id: tournamentId,
          players: choosePlayer,
        },
      })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t(res.message));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("score");
      setValue("flight");
      setValue("name");
      setValue("players");
      setChoosePlayer([]);
      setPlayer([]);
      return;
    }
    if (id) {
      FlightResultServices.getById({
        id: id,
        tournamentId: tournamentId,
      }).then((res) => {
        setValue(
          "score",
          res?.data?.players?.map((player) => player?.score)
        );
        setValue("name", res.data.name);
        setChoosePlayer(res?.data?.players);
      });
    } else if (!id) {
      FlightResultServices.getAllPlayerInTour(tournamentId).then((res) => {
        setValue("players", res.data);
        setPlayer(res.data);
      });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    choosePlayer,
    setChoosePlayer,
    player,
    setPlayer,
  };
};

export default useFlightResultSubmit;

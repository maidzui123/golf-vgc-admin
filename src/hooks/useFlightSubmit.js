import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { utcToZonedTime, format } from "date-fns-tz";

import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import FlightServices from "../services/FlightServices";
import { useTranslation } from "react-i18next";
import { da } from "date-fns/locale";
import { set } from "cloudinary/lib/cache";

const useFlightSubmit = ({ id, tournamentId }) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [latestUpdate, setLatestUpdate] = useState("");
  const [newPlayer, setNewPlayer] = useState([]);
  const [player, setPlayer] = useState([]);
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // setError("players", "")
    const one = {
      data: {
        ...data,
        players: player,
      },
    };
    if (player.length === 0) {
      setError("players", {
        type: "manual",
        message: t("Need at least one player!"),
      });
    } else if (player.length > 4) {
      setError("players", {
        type: "manual",
        message: t("Only a maximum of 4 players!"),
      });
    } else {
      if (id) {
        FlightServices.updateOne(id, one)
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(t("Data Updated Successfully!"));
          })
          .catch((err) => notifyError(err.message));
        closeDrawer();
      } else {
        FlightServices.addOne({
          data: {
            ...data,
            tournament_id: tournamentId,
          },
        })
          .then((res) => {
            setIsUpdate(true);
            notifySuccess(t(res.message));
          })
          .catch((err) => notifyError(err.message));
        closeDrawer();
      }
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
      setValue("status")
      setLatestUpdate("");
      setNewPlayer([]);
      setPlayer([]);
      clearErrors("description");
      clearErrors("tournament");
      clearErrors("players");
      clearErrors("status");

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
            setValue("status", res.status)
            // setPlayer(res.players);
            setValue(
              "start_time",
              format(
                utcToZonedTime(res.start_time, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );

            setLatestUpdate(dayjs(res.updatedAt).format("DD/MM/YYYY HH:mm:ss"));
          }
        })
        // keep call the getPlayer function to get the latest player list
        .then(() => {
          FlightServices.getPlayer(tournamentId).then((res) => {
            setNewPlayer(res.data);
          });
        })
        .then(() => {
          FlightServices.getCurrentPlayer({
            tournamentId: tournamentId,
            flightId: id,
          }).then((res) => {
            if (res.data) setPlayer(res.data);
          });
        })
        .catch((err) => {
          notifyError(t("There is a server error!"));
        });
    } else if (!id) {
      FlightServices.getPlayer(tournamentId).then((res) => {
        setPlayer([]);
        setNewPlayer(res.data);
      });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setValue,
    setPlayer,
    latestUpdate,
    newPlayer,
    setNewPlayer,
    player,
    control,
    clearErrors
  };
};

export default useFlightSubmit;

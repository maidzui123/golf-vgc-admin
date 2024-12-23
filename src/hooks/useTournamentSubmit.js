import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { utcToZonedTime, format } from "date-fns-tz";

import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import TournamentServices from "../services/TournamentServices";
import { useTranslation } from "react-i18next";

const useTournamentSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [price, setPrice] = useState("");
  const [active, setActive] = useState("");
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
    console.log("data", data);
    data.active = data.active !== undefined ? data.active : false;
    if (id) {
      TournamentServices.updateOne(id, data)
        .then((res) => {
          setIsUpdate(true);
          setPrice("");
          setActive("");
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      TournamentServices.addOne(data)
        .then((res) => {
          setIsUpdate(true);
          setPrice("");
          setActive("");
          notifySuccess(t(res.message));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("category");
      setValue("buggy");
      setValue("elapsed_time");
      setValue("max_player");
      setValue("hole_num");
      setValue("handicap");
      setValue("technical_info");
      setValue("prize");
      setValue("status");
      setValue("club_id");
      setValue("start_date");
      setValue("rate");
      setValue("active");
      setValue("register_expired");
      setValue("end_date");
      setPrice("");
      setActive("");
      setValue("course_id");
      clearErrors("name");
      clearErrors("description");
      clearErrors("prize")
      return;
    }
    if (id) {
      TournamentServices.getById(id)
        .then((res) => {
          // if res is undefined, return
          if (res && res.success !== false) {
            setValue("name", res.data.name);
            setValue("category", res.data.category);
            setValue("buggy", res.data.buggy);
            setValue("elapsed_time", res.data.elapsed_time);
            setValue("max_player", res.data.max_player);
            setValue("hole_num", res.data.hole_num);
            setValue("handicap", res.data.handicap);
            setValue("rate", res.data.rate);
            setValue("active", res.data.active);
            setValue("club_id", res.data.club_id);
            setValue("course_id", res.data.course_id);
            setValue("technical_info", res.data.technical_info);
            setValue("prize", res.data.prize);
            setValue("status", res.data.status);
            setValue(
              "start_date",
              format(
                utcToZonedTime(res.data.start_date, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setValue(
              "register_expired",
              format(
                utcToZonedTime(res.data.register_expired, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setValue(
              "end_date",
              format(
                utcToZonedTime(res.data.end_date, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setPrice(res.data.prize);
            setActive(res.data.active);
          } else if (res.success === false || res === undefined) {
            // if res is false, dont do anything
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
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    onSubmit,
    setPrice,
    setValue,
    price,
    active,
    setActive,
    errors,
  };
};

export default useTournamentSubmit;

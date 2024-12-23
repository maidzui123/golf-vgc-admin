import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import { useTranslation } from "react-i18next";
import TournamentServices from "services/TournamentServices";

const useTournamentCustomerSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dataRes, setDataRes] = useState({});
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

    if (id) {
      TournamentServices.updateOneCustomerTournament(id, data)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      TournamentServices.addOneCustomerTournament(data)
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
      setValue("customer_email");
      setValue("customer_name");
      setValue("customer_phone");
      setImageUrl("");
      clearErrors("name");
      clearErrors("description");
      setDataRes({})
      return;
    }
    if (id) {
      TournamentServices.getCustomerTournamentById(id)
        .then((res) => {
          if (res) {
            setValue("customer_email", res.data.customer_email);
            setValue("customer_phone", res.data.customer_phone);
            setValue("customer_name", res.data.customer_name);
            setDataRes(res.data)
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
    setValue,
    selectedDate,
    setSelectedDate,
    imageUrl,
    setImageUrl,
    onSubmit,
    errors,
    dataRes,
    setDataRes
  };
};

export default useTournamentCustomerSubmit;

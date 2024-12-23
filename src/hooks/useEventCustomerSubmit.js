import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import { useTranslation } from "react-i18next";
import EventServices from "services/EventServices";

const useEventCustomerSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
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
      EventServices.updateOneCustomerEvent(id, data)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
     EventServices.addOneCustomerEvent(data)
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
      return;
    }
    if (id) {
      EventServices.getCustomerEventById(id)
        .then((res) => {
          if (res) {
            console.log(res);
            setValue("customer_email", res.data.customer_email);
            setValue("customer_phone", res.data.customer_phone);
            setValue("customer_name", res.data.customer_name);
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
  };
};

export default useEventCustomerSubmit;

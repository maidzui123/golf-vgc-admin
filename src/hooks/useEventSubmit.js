import { useContext, useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { utcToZonedTime, format } from "date-fns-tz";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import EventServices from "../services/EventServices";
import { useTranslation } from "react-i18next";
import { set } from "lodash";

const useEventSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const location = useLocation();
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [active, setActive] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();

    for (const file of imageFiles) {
      formData.append("files[]", file);
    }

    data.active = data.active !== undefined ? data.active : false;
    Object.keys(data).forEach((e) => {
      formData.append(e, data[e]);
    });
    if (id) {
      EventServices.updateOne(id, formData)
        .then((res) => {
          setIsUpdate(true);
          setActive("");
          setPhoneNumber("");
          setImageFiles([]);
          setPreviews([]);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      if (imageFiles.length > 0) {
        EventServices.addOne(formData)
          .then((res) => {
            setIsUpdate(true);
            setImageFiles([]);
            setPhoneNumber("");
            setActive("");
            setPreviews([]);
            notifySuccess(t(res.message));
          })
          .catch((err) => notifyError(err.message));
        closeDrawer();
      } else {
        notifyError(t("Please add at least one image!"));
      }
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("name");
      setValue("description");
      setValue("start_date");
      setValue("end_date");
      setValue("register_expired");
      setValue("address");
      setValue("club_id");
      setValue("images");
      setValue("rate");
      setValue("organization");
      setValue("active");
      setValue("phone");
      setValue("city_id");
      setValue("course_id");
      setPreviews([]);
      clearErrors("name");
      clearErrors("description");
      clearErrors("start_date");
      setImageFiles([]);
      setActive("");
      setPhoneNumber("");
      setPreviews([]);
      return;
    }
    if (id) {
      EventServices.getById(id)
        .then((res) => {
          if (res && res.success !== false) {
            console.log("res", res);
            setValue("name", res.name);
            setValue("description", res.description);
            setValue(
              "start_date",
              format(
                utcToZonedTime(res.start_date, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setValue(
              "end_date",
              format(
                utcToZonedTime(res.end_date, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setValue(
              "register_expired",
              format(
                utcToZonedTime(res.register_expired, "Etc/UTC"),
                "yyyy-MM-dd'T'HH:mm"
              )
            );
            setValue("phone", res.phone);
            setValue("city_id", res.city_id);
            setValue("address", res.address);
            setValue("club_id", res.club_id);
            setValue("course_id", res.course_id);
            setValue("rate", res.rate);
            setValue("active", res.active);
            res?.images?.forEach((item) =>
              setPreviews((prev) => [...prev, item?.path])
            );
            setValue("organization", res.organization);
            setActive(res.active);
            setPhoneNumber(res.phone);
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
    onSubmit,
    errors,
    control,
    selectedDate,
    setSelectedDate,
    setValue,
    imageFiles,
    setImageFiles,
    previews,
    setActive,
    phoneNumber,
    setPhoneNumber,
    active,
    setPreviews,
  };
};

export default useEventSubmit;

import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { utcToZonedTime, format } from "date-fns-tz";

import { AdminContext } from "context/AdminContext";
import { SidebarContext } from "context/SidebarContext";
import AdminServices from "services/AdminServices";
import { notifyError, notifySuccess } from "utils/toast";
import { useTranslation } from "react-i18next";
const useStaffSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [language, setLanguage] = useState(lang);
  const [resData, setResData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("")

  const location = useLocation();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("file", file);
      const staffData = {
        name: {
          [language]: data.name,
        },
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.role,
        joiningDate: selectedDate
          ? selectedDate
          : dayjs(new Date()).format("YYYY-MM-DD"),
        lang: language,
      };

      for (const key in staffData) {
        if (staffData.hasOwnProperty(key)) {
          if (typeof staffData[key] === "object") {
            for (const subKey in staffData[key]) {
              if (staffData[key].hasOwnProperty(subKey)) {
                formData.append(
                  key,
                  JSON.stringify({ [subKey]: staffData[key][subKey] })
                );
              }
            }
          } else {
            formData.append(key, staffData[key]);
          }
        }
      }

      if (id) {
        // console.log('id is ',id)
        const res = await AdminServices.updateStaff(id, formData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(t(res.message));
        setFile(null);
        setPreview(null);
        setSelectedDate(null);
        closeDrawer();
      } else {
        const res = await AdminServices.addStaff(formData);
        setIsUpdate(true);
        setIsSubmitting(false);
        setFile(null);
        setPreview(null);
        setSelectedDate(null);
        notifySuccess(t(res.message));
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
      setIsSubmitting(false);
      closeDrawer();
    }
  };

  const getStaffData = async () => {
    try {
      const res = await AdminServices.getStaffById(id, {
        email: adminInfo.email,
      });
      if (res) {
        console.log(res);
        setResData(res);
        setValue("name", res.name[language ? language : "en"]);
        setValue("email", res.email);
        setValue("password");
        setValue("phone", res.phone);
        setValue("role", res.role);
        setValue("joiningData", dayjs(res.joiningData).format("YYYY-MM-DD"));
        setSelectedDate(dayjs(res.joiningData).format("YYYY-MM-DD"));
        setPreview(res.image);
        setPhoneNumber(res.phone)
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);

    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("email");
      setValue("password");
      setValue("phone");
      setValue("role");
      setValue("joiningDate");
      clearErrors("name");
      clearErrors("email");
      clearErrors("password");
      clearErrors("phone");
      clearErrors("role");
      clearErrors("joiningDate");
      setPhoneNumber("")
      setLanguage(lang);
      setSelectedDate(null)
      setValue("language", language);
      setFile(null);
      setPreview(null);
      return;
    }
    if (id) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  useEffect(() => {
    if (location.pathname === "/edit-profile" && Cookies.get("adminInfo")) {
      getStaffData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, setValue]);

  return {
    register,
    handleSubmit,
    onSubmit,
    language,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    handleSelectLanguage,
    file,
    setFile,
    preview,
    setPreview,
    phoneNumber,
    setPhoneNumber
  };
};

export default useStaffSubmit;

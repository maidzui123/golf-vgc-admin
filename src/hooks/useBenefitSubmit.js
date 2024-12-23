import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import BenefitServices from "../services/BenefitServices";
import { useTranslation } from "react-i18next";
import IconServices from "../services/IconServices";

const useBenefitSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [icons, setIcons] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(null);
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
      const formData = new FormData();
      formData.append("file", file);
      Object.keys(data).forEach((e) => {
        formData.append(e, data[e]);
      });

      BenefitServices.updateOne(id, formData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      BenefitServices.addOne(data)
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
      setValue("icon_id");
      setSelectedIcon(null);
      setIcons([]);
      setValue("description");
      clearErrors("name");
      clearErrors("description");
      setFile(null);
      setPreview(null);
      return;
    }
    if (id) {
      BenefitServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("name", res.name);
            setValue("description", res.description);
            setValue("icon_id", res.icon_id);
            setSelectedIcon(res.icon_id);
            setPreview(res?.avatar?.path);
          }
        })
        .then(() => {
          IconServices.getAll({ limit: 1000, page: 1 }).then((res) => {
            console.log("icons", res.data);
            if (res) {
              setIcons(res.data);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      IconServices.getAll({ limit: 1000, page: 1 }).then((res) => {
        console.log("icons", res.data);
        if (res) {
          setIcons(res.data);
        }
      });

    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    setValue,
    setSelectedIcon,
    setIcons,
    icons,
    selectedIcon,
    errors,
    setFile,
    file,
    preview,
    setPreview,
  };
};

export default useBenefitSubmit;

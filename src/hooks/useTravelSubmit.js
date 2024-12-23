import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import TravelServices from "../services/TravelServices";
import { useTranslation } from "react-i18next";
import CityServices from "services/CityServices";
import { set } from "lodash";

const useTravelSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [discountPrice, setDiscountPrice] = useState();
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [imageFiles, setImageFiles] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [active, setActive] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [previews, setPreviews] = useState([]);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("files[]", file);
    }
    data.active = data.active !== undefined ? data.active : false;
    Object.keys(data).forEach((e) => {
      if (e === "default_price") {
        formData.append(e, originalPrice);
      } else if (e === "discount_percent") {
        formData.append(e, discountPercent);
      } else {
        formData.append(e, data[e]);
      }
    });

    if (id) {
      TravelServices.updateOne(id, formData)
        .then((res) => {
          setIsUpdate(true);
          setImageFiles([]);
          setActive("");
          setPhoneNumber("");
          setPreviews([]);
          setOriginalPrice(0);
          setDiscountPercent(0);
          setDiscountPrice(0);
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      if (imageFiles.length > 0) {
        TravelServices.addOne(formData)
          .then((res) => {
            setIsUpdate(true);
            setImageFiles([]);
            setPhoneNumber("");
            setActive("");
            setPreviews([]);
            setOriginalPrice(0);
            setDiscountPercent(0);
            setDiscountPrice(0);
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
      setValue("address");
      setValue("images");
      setValue("hotel");
      setValue("rating");
      setValue("default_price");
      setValue("active");
      setValue("status", "ONGOING");
      setValue("discount_percent");
      setValue("phone_contact");
      setValue("start_date");
      setValue("move");
      setValue("other");
      setValue("city_id");
      setImageUrl("");
      clearErrors("name");
      clearErrors("description");
      setImageFiles([]);
      setPreviews([]);
      setActive("");
      setPhoneNumber("");
      setOriginalPrice(0);
      setDiscountPercent(0);
      setDiscountPrice(0);
      return;
    }
    if (id) {
      TravelServices.getById(id)
        .then((res) => {
          if (res && res.success !== false) {
            setValue("name", res.data.name);
            setValue("description", res.data.description);
            setValue("address", res.data.address);
            setValue("status", res.data.status);
            setValue("city_id", res.data.city_id);
            setValue("discount_price", parseInt(res.data.discount_price));
            // setValue("default_price", res.data.default_price);
            setValue("phone_contact", res.data.phone_contact);
            setValue(
              "start_date",
              dayjs(res.data.start_date).format("YYYY-MM-DD")
            );
            setValue("hotel", res.data.hotel);
            setValue("move", res.data.move);
            setValue("other", res.data.other);
            setValue("active", res.data.active);
            setValue("rating", res.data.rating);
            setActive(res.data.active);
            setPhoneNumber(res.data.phone_contact);
            setOriginalPrice(res.data.default_price);
            setDiscountPercent(res.data.discount_percent);
            res.data?.images?.forEach((item) =>
              setPreviews((prev) => [...prev, item?.path])
            );
            setDiscountPrice(res.data.discount_price);
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
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    imageFiles,
    setImageFiles,
    previews,
    setPreviews,
    setValue,
    discountPrice,
    discountPercent,
    originalPrice,
    setDiscountPercent,
    setDiscountPrice,
    setActive,
    phoneNumber,
    setPhoneNumber,
    active,
    setOriginalPrice,
    // handleOriginalPriceChange
  };
};

export default useTravelSubmit;

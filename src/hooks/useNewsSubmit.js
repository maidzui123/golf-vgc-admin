import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AdminContext } from "../context/AdminContext";
import { SidebarContext } from "../context/SidebarContext";
import { notifyError, notifySuccess } from "../utils/toast";
import NewsServices from "../services/NewsServices";
import { useTranslation } from "react-i18next";

const useNewsSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [imageFiles, setImageFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const { t } = useTranslation();
  const [editorDescription, setEditorDescription] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const file of imageFiles) {
      formData.append("files[]", file);
    }

    formData.append("description", editorDescription);
    Object.keys(data).forEach((e) => {
      if (e !== "description") {
        formData.append(e, data[e]);
      }
    });

    if (id) {
      NewsServices.updateOne(id, formData)
        .then((res) => {
          setIsUpdate(true);
          setImageFiles([]);
          setPreviews([]);
          setEditorDescription("");
          notifySuccess(t("Data Updated Successfully!"));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      NewsServices.addOne(formData)
        .then((res) => {
          setIsUpdate(true);
          setImageFiles([]);
          setPreviews([]);
          setEditorDescription("");
          notifySuccess(t(res.message));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("title");
      setValue("description");
      setValue("author");
      clearErrors("title");
      clearErrors("description");
      setEditorDescription("");
      setImageFiles([]);
      setPreviews([]);
      return;
    }
    if (id) {
      NewsServices.getById(id)
        .then((res) => {
          if (res) {
            setValue("title", res.title);
            // setValue('description', res.description);
            setEditorDescription(res.description);
            setValue("author", res.created_by || "Not Found");
            res?.images?.forEach((item) =>
              setPreviews((prev) => [...prev, item.path])
            );
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
    imageFiles,
    setImageFiles,
    previews,
    setPreviews,
    editorDescription,
    setEditorDescription,
  };
};

export default useNewsSubmit;

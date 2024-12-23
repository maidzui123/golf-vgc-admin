import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import BannerServices from '../services/BannerServices';
import { useTranslation } from "react-i18next";

const useBannerSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("")
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
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
    formData.append("file", file);
    
    formData.append("description", editorDescription);
    console.log("🚀 ~ file: useBannerSubmit.js:34 ~ onSubmit ~ editorDescription:", editorDescription)
    Object.keys(data).forEach((e) => {
      if (e !== "description") {
        formData.append(e, data[e]);
      }
    });
    if (id) {
      BannerServices.updateOne(id, formData)
        .then((res) => {
          setIsUpdate(true);
          setEditorDescription("");
          notifySuccess(t('Data Updated Successfully!'));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      BannerServices.addOne(formData)
        .then((res) => {
          setIsUpdate(true);
          setFile(null)
          setPreview(null)
          setEditorDescription("");
          notifySuccess(res.message);
          closeDrawer()
        })
        .catch((err) => notifyError(err.message));
      // closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name');
      setValue('description');
      clearErrors('name');
      clearErrors('description');
      setFile(null)
      setPreview(null)
      return;
    }
    if (id) {
      BannerServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res.name);
            // setValue('description', res.description);
            setEditorDescription(res.description);
            setStatus(res.status);
            setPreview(res.image?.path);
          }
        })
        .catch((err) => {
          notifyError(t('There is a server error!'));
        });
    }

  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  useEffect(() => {
    if (id) {
      BannerServices.getById(id)
        .then((res) => {
          if (res) {
            setStatus(res.status);
          }
        })
        .catch((err) => {
          notifyError(t('There is a server error!'));
        });
    }
  }, [status]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    status,
    setStatus,
    file,
    setFile,
    preview,
    setPreview,
    editorDescription,
    setEditorDescription
  };
};

export default useBannerSubmit;

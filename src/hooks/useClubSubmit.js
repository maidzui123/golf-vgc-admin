import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import ClubServices from '../services/ClubServices';
import { useTranslation } from "react-i18next";

const useClubSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (id) {
      const formData = new FormData();
      formData.append("file", file);
      Object.keys(data).forEach((e) => {
        formData.append(e, data[e]);
      });

      ClubServices.updateOne(id, formData)
        .then(() => {
          setIsUpdate(true);
          notifySuccess(t('Data Updated Successfully!'));
        })
        .catch((err) => {
          console.error(err)
          notifyError(err.message)
        });
      closeDrawer();
    } else {
      return
      // ClubServices.addOne(data)
      //   .then((res) => {
      //     setIsUpdate(true);
      //     notifySuccess(res.message);
      //   })
      //   .catch((err) => notifyError(err.message));
      // closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name');
      setValue('description');
      setValue('rules');
      setValue('fee');
      clearErrors('name');
      clearErrors('description');
      clearErrors('rules');
      setFile(null)
      setPreview(null)
      return;
    }
    if (id) {
      ClubServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res.name);
            setValue('description', res.description);
            setValue('rules', res.rules)
            setValue('fee', res.fee)
            setPreview(res.avatar?.path);
          }
        })
        .catch((err) => {
          console.error(err);
          notifyError(t('There is a server error!'));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    setFile,
    errors,
    file,
    preview,
    setPreview
  };
};

export default useClubSubmit;

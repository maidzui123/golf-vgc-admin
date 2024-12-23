import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';
import RatingServices from '../services/RatingServices';
import { useTranslation } from "react-i18next";

const useRatingSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
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
     data
    };

    if (id) {
      RatingServices.updateOne(id, data)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(t('Data Updated Successfully!'));
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      RatingServices.addOne(data)
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
      setValue('name');
      setValue('description');
      clearErrors('name');
      clearErrors('description');
      return;
    }
    if (id) {
      RatingServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('name', res.name);
            setValue('description', res.description);
          }
        })
        .catch((err) => {
          notifyError(t('There is a server error!'));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};

export default useRatingSubmit;

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError } from '../utils/toast';
import FeedbackServices from '../services/FeedbackServices';
import { useTranslation } from "react-i18next";

const useFeedbackSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [dataFeedBack, setDataFeedback] = useState({})
  const [imageFeedback, setImageFeedback] = useState([])
  const { isDrawerOpen } = useContext(SidebarContext);
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation();

  const {
    register,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isDrawerOpen) {
      setDataFeedback({})
      setValue('description');
      return;
    }

    if (id) {
      FeedbackServices.getById(id)
        .then((res) => {
          if (res) {
            setValue('description', res.description);
            setDataFeedback(res)
            setLoading(false)
            setImageFeedback(res.images)
          }
        })
        .catch((err) => {
          notifyError(t('There is a server error!'));
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  return {
    register,
    dataFeedBack,
    imageFeedback,
    loading
  };
};

export default useFeedbackSubmit;

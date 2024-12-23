import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SidebarContext } from 'context/SidebarContext';
import CustomerServices from 'services/CustomerServices';
import { notifyError, notifySuccess } from 'utils/toast';
import { useTranslation } from 'react-i18next';

const useCustomerSubmit = (id) => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tickStatus, setTickStatus] = useState(0);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { t } = useTranslation()

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", file);
    Object.keys(data).forEach((e) => {
      formData.append(e, data[e]);
    });
    formData.append("tick_status", tickStatus)
    try {
      if (id) {
        const res = await CustomerServices.updateAdminCustomer(id, formData);
        setIsUpdate(true);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      notifyError(err ? err?.response?.data?.message : err.message);
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('first_name');
      setValue('last_name');
      setValue('phone');
      setValue('email');
      setTickStatus(0);
      clearErrors('first_name');
      clearErrors('phone');
      clearErrors('email');
      setImageUrl("")
      setFile(null)
      setPreview(null)
      return;
    }
    if (id) {
      CustomerServices.getCustomerById(id)
        .then((res) => {
          if (res) {
            setValue('first_name', res.data.first_name);
            setValue('last_name', res.data.last_name);
            setValue('phone', res.data.phone);
            setValue('email', res.data.email);
            setTickStatus(Number(res.data.tick_status));
            if (res.data.avatar) setPreview(res.data.avatar.path);
          }
        })
        .catch((err) => {
          notifyError(t('There is a server error!'));
        });
    }
  }, [id, setValue, isDrawerOpen, clearErrors]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    tickStatus,
    setTickStatus,
    file,
    setFile,
    preview,
    setPreview,
  };
};

export default useCustomerSubmit;

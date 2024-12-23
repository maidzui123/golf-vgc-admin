import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import Title from "components/form/Title";
import useCustomerSubmit from "hooks/useCustomerSubmit";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { BsFillCheckCircleFill } from "react-icons/bs"
import { useTranslation } from "react-i18next";
import { Avatar, Select } from '@windmill/react-ui'
import Uploader from "components/image-uploader/Uploader";
import CustomerServices from "services/CustomerServices";

const CustomerDrawer = ({ id }) => {
  const {
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
  } = useCustomerSubmit(id);

  const { t } = useTranslation()

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          title={"Edit Customer"}
          description={"Edit your Customer necessary information from here"}
        />
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Banner image" />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  id={id}
                  file={file}
                  setFile={setFile}
                  preview={preview}
                  setPreview={setPreview}
                  service={CustomerServices}
                />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"First name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="firstName"
                  name="first_name"
                  type="text"
                  placeholder={"First Name"}
                />
                <Error errorName={errors.first_name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Last name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="lastName"
                  name="last_name"
                  type="text"
                  placeholder={"Last Name"}
                />
                <Error errorName={errors.last_name} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Phone"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Phone"}
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Tick Status"} />
              <div className="col-span-8 sm:col-span-4">
                <Select className="mt-1" value={tickStatus} onChange={(e) => setTickStatus(e.target.value)}>
                  <option value="0">Gray</option>
                  <option value="1">Green</option>
                  <option value="2">Gold</option>
                </Select>
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Customer" />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;

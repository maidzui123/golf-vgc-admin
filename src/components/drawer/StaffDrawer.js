import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import useStaffSubmit from "hooks/useStaffSubmit";
import Title from "components/form/Title";
import LabelArea from "components/form/LabelArea";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import Error from "components/form/Error";
import SelectRole from "components/form/SelectRole";
import DrawerButton from "components/form/DrawerButton";
import AdminServices from "services/AdminServices";
import InputPhoneArea from "components/form/InputPhoneArea";
const StaffDrawer = ({ id }) => {
  
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    selectedDate,
    setSelectedDate,
    file,
    setFile,
    preview,
    setPreview,
    phoneNumber,
    setPhoneNumber
  } = useStaffSubmit(id);
  const { t } = useTranslation();
  console.log(selectedDate)
  // implement a function  to delete image directly from service
  const handleDeleteImage = async () => {
    try {
      await AdminServices.deleteImage(id);
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.log(error);
    }
  }
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[\s+]/g, '')
    const pattern = /^[0-9+\s]{0,11}$/;
    if (pattern.test(numericValue) || numericValue.trim() === "") {
      setPhoneNumber(inputValue);
    }
  };
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            title={t("UpdateStaff")}
            description={t("UpdateStaffdescription")}
          />
        ) : (
          <Title
            register={register}
            title={t("AddStaffTitle")}
            description={t("AddStaffdescription")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Staff Image")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Uploader
                      setFile={setFile}
                      id={id}
                      file={file}
                      preview={preview}
                      setPreview={setPreview}
                      service={AdminServices}
                     
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("StaffName")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Staff name")}
                      required={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Email")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Email")}
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                      required={true}
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Contact Number")} />
                  <div className="col-span-8 sm:col-span-4">
                    {/* <InputArea
                      register={register}
                      label={t("Contact Number")}
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="text"
                      placeholder={t("Phone number")}
                      required={true}
                    />
                    <Error errorName={errors.phone} /> */}
                    <InputPhoneArea
                      register={register}
                      label={t("Contact Number")}
                      name="phone"
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder={t("Phone number")}
                      autoFocus={true}
                      message={t("Invalid phone number.")}
                      required
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Joining Date")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="date"
                      {...register("joiningDate")}
                      name="joiningDate"
                      placeholder={t("Joining Date")}
                      autoFocus={true}
                      required={true}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                      }}
                      value={selectedDate}
                    />
                    <Error errorName={errors.joiningData} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Staff Role")} required/>
                  <div className="col-span-8 sm:col-span-4">
                    <SelectRole
                      register={register}
                      label={t("Role")}
                      name="role"
                    />
                    <Error errorName={errors.role} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title="Staff" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;

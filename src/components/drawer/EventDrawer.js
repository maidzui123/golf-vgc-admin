import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputPhoneArea from "../form/InputPhoneArea";

import { useForm, Controller } from "react-hook-form";
import SelectEvent from "../form/SelectEvent";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useEventSubmit from "../../hooks/useEventSubmit";
import { useTranslation } from "react-i18next";
import SelectClub from "components/form/SelectClub";
import SelectCity from "components/form/SelectCity";
import UploadManyImages from "components/image-uploader/UploadManyImages";
import EventServices from "services/EventServices";
import SelectCourse from "components/form/SelectCourse";
import { useState, useRef } from "react";
const EventDrawer = ({ id }) => {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
    setValue,
    imageFiles,
    active,
    setActive,
    phoneNumber,
    setPhoneNumber,
    setImageFiles,
    previews,
    setPreviews,
  } = useEventSubmit(id);
  const { t } = useTranslation();
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
          <Title title={t("Update Event")} description={t("Updated Event")} />
        ) : (
          <Title title={t("Add Event")} description={t("Add Event")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Event name")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Active")} />
                  <div className="col-span-8 sm:col-span-4 flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("active")}
                        name="active"
                        autoFocus={true}
                        defaultChecked={active}
                        onChange={(e) => {
                          setValue("active", e.target.checked);
                          setActive(e.target.checked);
                        }}
                        className="form-checkbox text-indigo-600 h-5 w-5"
                      />
                      <span className="text-gray-900 text-sm">
                        {t("Active")}
                      </span>
                    </label>
                    <Error errorName={errors.active} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Phone")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputPhoneArea
                      register={register}
                      label={t("Phone")}
                      name="phone"
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder={t("Contact phone to event")}
                      autoFocus={true}
                      message={t("Invalid phone number.")}
                      required
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Rating")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Rate")}
                      name="rate"
                      type="number"
                      placeholder={t("Rating")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.rate} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Organization")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Organization")}
                      name="organization"
                      type="text"
                      placeholder={t("Organization name")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.organization} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Description")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("description", {
                        required: t("Description is required!"),
                      })}
                      name="description"
                      placeholder={t("Description")}
                      rows="4"
                      spellCheck="false"
                    />
                    <Error errorName={errors.description} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Register Expired Date")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("register_expired")}
                      name="register_expired"
                      placeholder={t("Register Expired Date")}
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.register_expired} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Start Date")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("start_date")}
                      name="start_date"
                      placeholder="Start Date"
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.start_date} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("End Date")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("end_date")}
                      name="end_date"
                      placeholder="End Date"
                      autoFocus={true}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      defaultValue={selectedDate}
                    />
                    <Error errorName={errors.end_date} />
                  </div>
                </div>

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Club ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectClub
                      name="club_id"
                      label="Club"
                      register={register}
                      defaultValue={"club_id"} // Pass the selected city's ID as defaultValue
                      required={true}
                    />
                    <Error errorName={errors.club_id} />
                  </div>
                </div> */}

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Course ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectCourse
                      name="course_id"
                      label={t("Course")}
                      register={register}
                      defaultValue={"course_id"} // Pass the selected city's ID as defaultValue
                      required={true}
                    />
                    <Error errorName={errors.course_id} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("City ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectCity
                      name="city_id"
                      label={t("City")}
                      register={register}
                      defaultValue={"city_id"} // Pass the selected city's ID as defaultValue
                      required={true}
                    />
                    <Error errorName={errors.city_id} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Address detailed")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Address Detailed")}
                      name="address"
                      type="text"
                      placeholder={t("Address")}
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.address} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Upload Image")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <UploadManyImages
                      id={id}
                      required={true}
                      imageFiles={imageFiles}
                      setImageFiles={setImageFiles}
                      previews={previews}
                      setPreviews={setPreviews}
                      service={EventServices}
                    />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("Event")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default EventDrawer;

import React, { useEffect, useState, useMemo } from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";

import Cleave from "cleave.js/react";
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import InputPhoneArea from "../form/InputPhoneArea";
import SelectTravel from "../form/SelectTravel";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useTravelSubmit from "../../hooks/useTravelSubmit";
import { useTranslation } from "react-i18next";
import UploadManyImages from "components/image-uploader/UploadManyImages";
import SelectCity from "components/form/SelectCity";
import TravelServices from "services/TravelServices";

const TravelDrawer = ({ id }) => {
  const {
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
    setImageFiles,
    previews,
    // handleOriginalPriceChange,
    originalPrice,
    setOriginalPrice,
    setPreviews,
    active,
    setActive,
    phoneNumber,
    setPhoneNumber,
    discountPrice,
    discountPercent,
    setDiscountPrice,
    setDiscountPercent,
  } = useTravelSubmit(id);
  const statusOptions = ["ONGOING", "CLOSED", "REGISTERING"];
  const VND_CURRENCY = "VND"; // Define the VND currency symbol
  const PERCENT = "%";
  const { t } = useTranslation();
  const [realTimeDiscountPrice, setRealTimeDiscountPrice] = useState(0);
  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[\s+]/g, "");
    const pattern = /^[0-9+\s]{0,11}$/;
    if (pattern.test(numericValue) || numericValue.trim() === "") {
      setPhoneNumber(inputValue);
    }
  };
  // Event handler for changes in default_price
  const handleDefaultPriceChange = (e) => {
    const inputValue = parseFloat(e.target.rawValue.replace(/,/g, ""));
    // Check nếu NaN hoặc bé hơn 0 thì set giá trị về 0
    const numericValue = isNaN(inputValue) || inputValue < 0 ? 0 : inputValue;
    setOriginalPrice(Number(numericValue));
    updateRealTimeDiscountPrice(Number(numericValue), discountPercent);
  };

  const handleDiscountPercentChange = (e) => {
    const cleaveValue = parseFloat(e.target.rawValue.replace(/,/g, ""));
    // Check nếu NaN hoặc bé hơn 0 thì set giá trị về 0
    const newDiscountPercent =
      isNaN(cleaveValue) || cleaveValue < 0 ? 0 : cleaveValue;
    if (newDiscountPercent > 100) {
      updateRealTimeDiscountPrice(originalPrice, 100);
      setDiscountPercent(100);
    } else {
      updateRealTimeDiscountPrice(originalPrice, newDiscountPercent);
      setDiscountPercent(newDiscountPercent);
    }
  };
  // Function to update the real-time discount price
  const updateRealTimeDiscountPrice = (defaultPrice, newDiscountPercent) => {
    const newDiscountPrice =
      defaultPrice - (defaultPrice * newDiscountPercent) / 100;
    setRealTimeDiscountPrice(newDiscountPrice);
    setDiscountPrice(newDiscountPrice);
  };

  // Use useEffect to set the real-time discount price when discountPrice changes
  useEffect(() => {
    setRealTimeDiscountPrice(discountPrice);
  }, [discountPrice]);
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Travel")} description={t("Updated Travel")} />
        ) : (
          <Title title={t("Add Travel")} description={t("Add Travel")} />
        )}
      </div>
      <Card className="h-full relative overflow-hidden flex flex-col">
        <Scrollbars autoHide className="flex-grow">
          <CardBody>
            <form
              onSubmit={handleSubmit(onSubmit)}
              encType="multipart/form-data"
            >
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Upload Image")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <UploadManyImages
                      id={id}
                      imageFiles={imageFiles}
                      setImageFiles={setImageFiles}
                      previews={previews}
                      setPreviews={setPreviews}
                      service={TravelServices}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Travel name")}
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

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Start Date")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="date"
                      {...register("start_date")}
                      name="start_date"
                      placeholder={t("Start Date")}
                      autoFocus={true}
                      required={false}
                      onChange={(e) => {
                        setSelectedDate(e.target.value);
                      }}
                      defaultValue={selectedDate}
                    />
                    <Error errorName={errors.start_date} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Original Price")} required />
                  <div className="col-span-8 sm:col-span-4 relative">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        backgroundColor: "inherit",
                      }}
                    >
                      <Cleave
                        name="default_price"
                        value={originalPrice}
                        onChange={handleDefaultPriceChange}
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                          numeralMaxValue: 100,
                        }}
                        className="border border-1 border-gray-200 px-3 rounded-md h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      />
                      <span className="absolute right-0 mr-3 top-1/2 translate-x-1/2 text-gray-700 text-sm">
                        {VND_CURRENCY}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Discount Percent")} />
                  <div className="col-span-8 sm:col-span-4 relative">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        backgroundColor: "inherit",
                      }}
                    >
                      <Cleave
                        name="discount_percent"
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        value={discountPercent}
                        onChange={handleDiscountPercentChange}
                        className="border border-1 border-gray-200 px-3 rounded-md h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      />
                      <span className="absolute right-0 mr-3 top-1/2 translate-x-1/2 text-gray-700 text-sm">
                        {PERCENT}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Discount Price")} />
                  <div className="col-span-8 sm:col-span-4 relative">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        backgroundColor: "inherit",
                      }}
                    >
                      <Cleave
                        value={realTimeDiscountPrice}
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        readOnly={true}
                        className="border border-1 border-gray-200 px-3 rounded-md h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      />
                      <span className="absolute right-0 mr-3 top-1/2 translate-x-1/2 text-gray-700 text-sm">
                        {VND_CURRENCY}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Phone Contact")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputPhoneArea
                      register={register}
                      label={t("Phone Contact")}
                      name="phone_contact"  
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      placeholder={t("Contact information of the travel")}
                      autoFocus={true}
                      message={t("Invalid phone number.")}
                      required
                    />
                    
                    <Error errorName={errors.phone_contact} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Rating")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Rating")}
                      name="rating"
                      type="text"
                      placeholder={t("Rating of the travel")}
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.rating} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Status")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Select
                      // {...register("status")}
                      {...register(`status`, {
                        required: t(`Status is required!`),
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                    >
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {t(option)}{" "}
                        </option>
                      ))}
                      <option value="" defaultValue selected hidden>
                        {t("ONGOING")}{" "}
                      </option>
                    </Select>
                    <Error errorName={errors.status} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Address Detail")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("address", {
                        required: t("Address Detail is required!"),
                      })}
                      name="address"
                      placeholder={t("Input address ...")}
                      rows="8"
                      spellCheck="false"
                    />
                    <Error errorName={errors.address} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Hotel ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("hotel", {
                        required: t("Hotel name is required!"),
                      })}
                      name="hotel"
                      placeholder={t("Input hotel ...")}
                      rows="8"
                      spellCheck="false"
                    />
                    <Error errorName={errors.hotel} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Move ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("move", {
                        required: t("Move is required!"),
                      })}
                      name="move"
                      placeholder={t("Input move ...")}
                      rows="8"
                      spellCheck="false"
                    />
                    <Error errorName={errors.move} />
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
                      placeholder={t("Description ...")}
                      rows="8"
                      spellCheck="false"
                    />
                    <Error errorName={errors.description} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Others ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("other", {
                        required: t("Other is required!"),
                      })}
                      name="other"
                      placeholder={t("Other ...")}
                      rows={8}
                      spellCheck
                    />
                    <Error errorName={errors.other} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("City ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectCity
                      name="city_id"
                      label="City"
                      register={register}
                      defaultValue={"city_id"} // Pass the selected city's ID as defaultValue
                    />
                    <Error errorName={errors.city_id} />
                  </div>
                </div>
              </div>
              <DrawerButton id={id} title={t("Travel")} />
            </form>
          </CardBody>
        </Scrollbars>
      </Card>
    </>
  );
};

export default TravelDrawer;

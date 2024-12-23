import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectBenefit from "../form/SelectBenefit";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useBenefitSubmit from "../../hooks/useBenefitSubmit";
import { useTranslation } from "react-i18next";
import BenefitServices from "services/BenefitServices";
import Select from "react-select";
import { useState } from "react";
const BenefitDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    preview,
    icons,
    selectedIcon,
    setSelectedIcon,
    setIcons,
    setValue,
    setFile,
    setPreview,
    file,
    setImageUrl,
    selectedDate,
    setSelectedDate,
  } = useBenefitSubmit(id);
  const [checkTheme, setCheckTheme] = useState("");
  const handleIconChange = (selectedOption) => {
    if (selectedOption) {
      const iconId = selectedOption.value;
      setSelectedIcon(icons.find((icon) => icon._id === selectedOption.value));
      setValue("icon_id", iconId);
    } else {
      setSelectedIcon(null);
      setIcons("");
    }
    console.log("selectedOption", selectedOption);
  };
  const customLight = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #e2e8f0",
      height: "2.75rem",
      outline: "none",
      width: "100%",
      backgroundColor: "#f7fafc",
      color: "#1a202c",
      borderColor: "transparent",
      "&:focus": {
        backgroundColor: "#ffffff",
      },
    }),
  };
  const customDark = {
    control: (provided) => ({
      ...provided,
      border: "2px solid #4c4f52",
      height: "2.75rem",
      outline: "none",
      width: "100%",
      backgroundColor: "#24262c",
      color: "#a0aec0",
      borderColor: "transparent",
      "&:focus": {
        backgroundColor: "#24262c",
      },
    }),
   
  };
  const { t } = useTranslation();
  useEffect(() => {
    setCheckTheme(localStorage.getItem("theme"));
  }, []);
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update Benefit")}
            description={t("Updated Benefit")}
          />
        ) : (
          <Title title={t("Add Benefit")} description={t("Add Benefit")} />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      name="name"
                      type="text"
                      label={t("Benefit name")}
                      placeholder={t("Benefit name")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Icon ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Select
                      className="border h-12 text-sm focus:outline-none block w-ful border-transparent"
                      value={
                        selectedIcon && {
                          label: (
                            <div>
                              <img
                                src={selectedIcon?.imagePath}
                                alt={selectedIcon?.name}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  marginRight: "8px",
                                }}
                              />
                            </div>
                          ),
                          value: selectedIcon?._id,
                        }
                      }
                      menuPlacement="auto"
                      onChange={handleIconChange}
                      isSearchable={false}
                      placeholder={t("Choose Icon")}
                      options={icons.map((icon) => ({
                        value: icon?._id,
                        label: (
                          <div className="flex items-center">
                            <img
                              src={icon?.imagePath}
                              alt={icon?.name}
                              className="w-6 h-6 mr-2"
                            />
                          </div>
                        ),
                      }))}
                      styles={checkTheme === "dark" ? customDark : customLight}
                      
                    />
                    {selectedIcon && (
                      <div className="mt-2">
                        <img
                          src={selectedIcon.imagePath}
                          alt={selectedIcon.name}
                          style={{ maxWidth: "0%" }}
                        />
                      </div>
                    )}
                    <Error errorName={errors.icon_id} />
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
              </div>

              <DrawerButton id={id} title={t("Benefit")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default BenefitDrawer;

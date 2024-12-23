import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FaTrash } from "react-icons/fa";
import {
  Card,
  CardBody,
  Input,
  Select,
  Label,
  Textarea,
} from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectLevel from "../form/SelectLevel";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useLevelSubmit from "../../hooks/useLevelSubmit";
import { useTranslation } from "react-i18next";
import SelectBenefit from "../form/SelectBenefit";
import LevelServices from "services/LevelServices";

const LevelDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, benefits, setBenefits, setValue } =
    useLevelSubmit(id);

  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("Update Level")} description={t("Updated Level")} />
        ) : (
          <Title title={t("Add Level")} description={t("Add Level")} />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200 h-full">
        {" "}
        <Card className="overflow-y-scroll flex-grow w-full h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Level name")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Description")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Description")}
                      name="description"
                      type="text"
                      placeholder={t("Description")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Fee")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Fee")}
                      name="fee"
                      type="number"
                      placeholder={t("Fee")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Benefits ")} required />
                  <div className="col-span-8">
                    <SelectBenefit
                      id={id}
                      benefits={benefits}
                      setBenefits={setBenefits}
                      setValue={setValue}
                    />
                    <Error errorName={errors.benefits} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("Level")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default LevelDrawer;

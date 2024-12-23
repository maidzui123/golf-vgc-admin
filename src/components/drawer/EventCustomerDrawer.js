import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectTravel from "../form/SelectTravel";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useTravelCustomerSubmit from "hooks/useTravelCustomerSubmit";
import { useTranslation } from "react-i18next";
import UploadManyImages from "components/image-uploader/UploadManyImages";
import useEventCustomerSubmit from "hooks/useEventCustomerSubmit";


const TournamentCustomerDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
  } = useEventCustomerSubmit(id);
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update Event Customer")}
            description={t("Updated Event Customer")}
          />
        ) : (
          <Title
            title={t("Add Event Customer")}
            description={t("Add Event Customer")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("email")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("customer_email")}
                      name="customer_email"
                      type="text"
                      placeholder={t("Enter customer email here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("customer_name")}
                      name="customer_name"
                      type="text"
                      placeholder={t("Enter the number of guests here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Phone")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("customer_phone")}
                      name="customer_phone"
                      type="text"
                      placeholder={t("Enter the number of guests here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
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

export default TournamentCustomerDrawer;

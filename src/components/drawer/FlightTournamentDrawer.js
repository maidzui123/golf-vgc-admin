import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import DrawerButton from "../form/DrawerButton";
import { useTranslation } from "react-i18next";
import SelectCity from "components/form/SelectCity";
import useTournamentCustomerSubmit from "hooks/useTournamentCustomerSubmit";
import dayjs from "dayjs";

const FlightTournamentDrawer = ({ id }) => {
  const { register, handleSubmit, onSubmit, errors, dataRes } =
    useTournamentCustomerSubmit(id);
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update Tournament Flight")}
            description={t("Updated Tournament Flight")}
          />
        ) : (
          <Title
            title={t("Add Tournament Flight")}
            description={t("Add Tournament Flight")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Email")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("customer_email")}
                      name="customer_email"
                      type="text"
                      placeholder={t("Enter customer email here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.customer_email} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("customer_name")}
                      name="customer_name"
                      type="text"
                      placeholder={t("Enter the number of guests here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.customer_name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Phone")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Customer phone")}
                      name="customer_phone"
                      type="text"
                      placeholder={t("Enter the number of guests here")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.customer_phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Gender")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      name="customer_gender"
                      type="text"
                      value={dataRes.customer_gender}
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Clothed size")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      name="customer_clothed_size"
                      type="text"
                      value={dataRes.customer_clothed_size}
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("City")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      name="customer_hdc_num"
                      type="text"
                      value={dataRes.customer_hdc_num}
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("City")} />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectCity
                      name="customer_city_id"
                      label="City"
                      register={register}
                      defaultValue={dataRes.customer_city_id}
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("HDC Index")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      name="customer_hdc_num"
                      type="text"
                      value={dataRes.customer_hdc_num}
                      readOnly
                    />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Date of birth")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      name="customer_birth_date"
                      type="text"
                      value={dayjs(dataRes.customer_birth_date).format(
                        "DD-MM-YYYY"
                      )}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("Tournament")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default FlightTournamentDrawer;

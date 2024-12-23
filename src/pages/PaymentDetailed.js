import React from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
} from "@windmill/react-ui";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import Loading from "components/preloader/Loading";
import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";
import { ImFileEmpty } from "react-icons/im";
import * as dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";

import PaymentServices from "services/PaymentServices";

const PaymentDetailed = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data, loading, error } = useAsync(() => PaymentServices.getById(id));
  console.log("data", data);

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (error || !data) {
    return (
      <div className="w-full bg-white rounded-md dark:bg-gray-800">
        <div className="p-8 text-center">
          <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
            <ImFileEmpty />
          </span>
          <h2 className="font-medium text-base mt-4 text-gray-600">
            {t("Payment Not Found")}
          </h2>
        </div>
      </div>
    );
  }

  const paymentData = data;
  console.log(paymentData);

  return (
    <>
      <PageTitle>{t("PAYMENT DETAILED")}</PageTitle>
      {/* make the width larger than height */}
      {/* <BulkActionDrawer ids={allId} title="Travels" /> */}
      {/* <MainDrawer>
        <TravelCustomerDrawer id={id} />
      </MainDrawer> */}
      <DeleteModal ids={id} title={paymentData?.name} />

      <div className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 md:w-2/3 md:mx-auto rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 justify-center text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <h1 className="font-bold font-serif text-xl uppercase text-center flex-1">
              {t("GENERAL INFORMATION")}
            </h1>
          </div>

          <p className="font-bold font-serif text-lg text-orange-400 dark:text-gray-500 block mt-4">
            {t("PAYMENT TYPE:")} {paymentData?.source}
          </p>

          <div className="flex lg:flex-col md:flex-col flex-col py-6 flex-1 w-full">
            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Created Date")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {dayjs(paymentData?.added_at).format("DD/MM/YYYY")}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Amount")}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {/* if the description is too long,add the ...more to view instead of display all */}
                {`${paymentData?.amount}`}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Start Date")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {dayjs(paymentData?.start_date).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Status")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
              {`${paymentData?.status}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDetailed;

import React from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
  Avatar,
} from "@windmill/react-ui";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import Loading from "components/preloader/Loading";
import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";
import { ImFileEmpty } from "react-icons/im";
import * as dayjs from "dayjs";
import CustomerPaymentTable from "components/customer/CustomerPaymentTable";
import OrderServices from "services/OrderServices";
import CustomerEventServices from "services/CustomerEventServices";
import CustomerEventTable from "components/customerEvent/CustomerEventTable";
import CustomerTravelServices from "services/CustomerTravelServices";
import CustomerTravelTable from "components/customerTravel/CustomerTravelTable";
import CustomerTournamentServices from "services/CustomerTournamentServices";
import CustomerTournamentTable from "components/customertournament/CustomerTournamentTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import MeetingRequestServices from "services/MeetingRequestServices";
import MeetingRequestTable from "components/meetingRequest/MeetingRequestTable";

const CustomerDetailed = () => {
  const { id } = useParams();
  const { t } = useTranslation();

  const { data, loading, error } = useAsync(() =>
    CustomerServices.getCustomerDetailedById(id)
  );

  const { data: dataPaymentHistory, loading: loadingPaymentHistory } = useAsync(
    () => OrderServices.getAllOrderCustomer(id)
  );

  const { data: dataEventHistory, loading: loadingEventHistory } = useAsync(
    () => CustomerEventServices.getEventCustomer(id)
  );

  const { data: dataTravelHistory, loading: loadingTravelHistory } = useAsync(
    () => CustomerTravelServices.getTravelCustomer(id)
  );

  const { data: dataTournamentHistory, loading: loadingTournamentHistory } =
    useAsync(() => CustomerTournamentServices.getTournamentCustomer(id));

  const { data: dataMeetingRequest, loading: loadingMeetingRequest } = useAsync(
    () => MeetingRequestServices.getAllOfCustomer(id)
  );

  const {
    handleChangePage: handleChangePagePayment,
    totalResults: totalResultsPayment,
    resultsPerPage: resultsPerPagePayment,
    dataTable: dataTablePayment,
  } = useFilter(dataPaymentHistory.data?.order);

  console.log(dataMeetingRequest);

  return (
    <>
      <PageTitle>{t("CUSTOMER DETAILED")}</PageTitle>

      {loading && <Loading loading={loading} />}

      {!error && !loading && data?.length === 0 && (
        <div className="w-full bg-white rounded-md dark:bg-gray-800">
          <div className="p-8 text-center">
            <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
              <ImFileEmpty />
            </span>
            <h2 className="font-medium text-base mt-4 text-gray-600">
              {t("Customer Not Found")}
            </h2>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 md:w-1/2 md:mx-auto rounded-xl shadow-sm overflow-hidden">
        {!loading && (
          <div className="flex flex-col items-center">
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase text-center flex-1">
                {t("GENERAL INFOMATION")}
              </h1>
            </div>

            <div className="rounded-full w-40 h-40 overflow-hidden border-gray-300 border">
              <img
                className="select-none object-contain"
                src={
                  data?.data?.avatar
                    ? data?.data?.avatar.path
                    : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                }
              />
            </div>

            <p className="font-bold font-serif text-lg text-orange-400 dark:text-gray-500 block mt-4">
              {`${data?.data?.first_name || ""} ${data?.data?.last_name || ""}`}
            </p>

            <div className="flex lg:flex-col md:flex-col flex-col py-6 flex-1 w-full">
              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Email")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.email}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Phone")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.phone}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Birthday")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {dayjs(data?.data?.birthday).format("MMM D, YYYY")}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Joining Date")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {dayjs(data?.data?.createdAt).format("MMM D, YYYY")}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Age")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.age || ""}
                </p>
              </div>

              {/* the clubs is an array , display all clubs that user has joined */}
              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Clubs")}
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.clubs?.map((club) => (
                    <div className="flex items-center">
                      <Avatar
                        className="mr-2"
                        src={club.avatar?.path || ""}
                        size="small"
                      />
                      <p>{club.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Birthday")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.birthday
                    ? dayjs(data?.data?.birthday).format("MMM D, YYYY")
                    : ""}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Code")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block">
                  {data?.data?.code || ""}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Level")}
                </p>
                {data?.data?.level?.level_id?.code && (
                  <p className="text-sm text-gray-600 dark:text-gray-600 block">
                    {data?.data?.level?.level_id?.code || ""}
                  </p>
                )}
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Playing time")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block capitalize">
                  {data?.data?.playing_time || ""}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Tee color")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block capitalize">
                  {data?.data?.tee_color?.name || ""}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("Gender")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block capitalize">
                  {data?.data?.gender || ""}
                </p>
              </div>

              <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                  {t("HDC Number")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-600 block capitalize">
                  {data?.data?.hdc_num || ""}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY MEETING REQUEST")}
        </h1>

        {!loadingMeetingRequest ? (
          dataMeetingRequest.data?.length > 0 ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell> {t("From")} </TableCell>
                    <TableCell className="text-center">{t("To")}</TableCell>
                    <TableCell className="text-center">
                      {t("Time invited")}
                    </TableCell>
                    <TableCell className="text-center">
                      {t("Time play")}
                    </TableCell>
                    <TableCell className="text-center">{t("Note")}</TableCell>
                    <TableCell className="text-center">
                      {t("Status")}{" "}
                    </TableCell>
                    <TableCell className="text-right">
                      {t("Location")}{" "}
                    </TableCell>
                  </tr>
                </TableHeader>
                <MeetingRequestTable data={dataMeetingRequest.data} />
              </Table>
            </TableContainer>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Meeting Request History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY PAYMENT")}
        </h1>

        {!loadingPaymentHistory ? (
          dataPaymentHistory.data?.order?.length > 0 ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell> {t("Invoice ID")} </TableCell>
                    <TableCell className="text-center">{t("Time")}</TableCell>
                    <TableCell className="text-center">
                      {t("DISCOUNT")}
                    </TableCell>
                    <TableCell className="text-center">{t("Total")}</TableCell>
                    <TableCell className="text-center">
                      {t("Description")}
                    </TableCell>
                    <TableCell className="text-right">{t("Status")} </TableCell>
                  </tr>
                </TableHeader>
                <CustomerPaymentTable data={dataPaymentHistory.data?.order} />
              </Table>
            </TableContainer>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Payment History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY MEMBERSHIP")}
        </h1>
        {!loadingPaymentHistory ? (
          dataPaymentHistory.data?.order?.length > 0 ? (
            <>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell> {t("Invoice ID")} </TableCell>
                      <TableCell className="text-center">{t("Time")}</TableCell>
                      <TableCell className="text-center">
                        {t("DISCOUNT")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Total")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Description")}
                      </TableCell>
                      <TableCell className="text-right">
                        {t("Status")}{" "}
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <CustomerPaymentTable data={dataPaymentHistory.data?.order} />
                </Table>
                <TableFooter>
                  <Pagination
                    totalResults={totalResultsPayment}
                    resultsPerPage={resultsPerPagePayment}
                    onChange={handleChangePagePayment}
                    label="Table navigation"
                  />
                </TableFooter>
              </TableContainer>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Payment History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY JOINING EVENT")}
        </h1>

        {!loadingEventHistory ? (
          dataEventHistory?.data?.length > 0 ? (
            <>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell className="text-left">
                        {t("EVENT NAME")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Joining time")}
                      </TableCell>
                      <TableCell className="text-center">{t("Club")}</TableCell>
                      <TableCell className="text-center">
                        {t("Organization")}
                      </TableCell>
                      <TableCell className="text-right">
                        {t("Status")}{" "}
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <CustomerEventTable data={dataEventHistory?.data} />
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Payment History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY PURCHASE TRAVEL PACKAGE")}
        </h1>

        {!loadingTravelHistory ? (
          dataTravelHistory?.data?.length > 0 ? (
            <>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell> {t("Travel Name")} </TableCell>
                      <TableCell className="text-center">{t("Time")}</TableCell>
                      <TableCell className="text-center">
                        {t("Description")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Guest Number")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Status")}
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <CustomerTravelTable data={dataTravelHistory.data} />
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Travel History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("HISTORY JOINING TOURNAMENT")}
        </h1>

        {!loadingTournamentHistory ? (
          dataTournamentHistory?.data?.length > 0 ? (
            <>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell> {t("Tournament Name")} </TableCell>
                      <TableCell className="text-center">{t("Time")}</TableCell>
                      <TableCell className="text-center">
                        {t("Start Date")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Club Name")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Register Date")}
                      </TableCell>
                      <TableCell className="text-right">
                        {t("Status")}{" "}
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <CustomerTournamentTable data={dataTournamentHistory?.data} />
                </Table>
              </TableContainer>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title="Customer Tournament History" />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>
    </>
  );
};

export default CustomerDetailed;

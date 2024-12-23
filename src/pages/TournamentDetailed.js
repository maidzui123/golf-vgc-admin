import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Pagination,
  Card,
  CardBody,
  Button,
  Input,
} from "@windmill/react-ui";
import { format } from "date-fns";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import PageTitle from "components/Typography/PageTitle";
import Loading from "components/preloader/Loading";
import { useTranslation } from "react-i18next";
import CustomerServices from "services/CustomerServices";
import { ImFileEmpty } from "react-icons/im";
import * as XLSX from "xlsx";
import * as dayjs from "dayjs";
import { Carousel } from "react-responsive-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TournamentCustomerTable from "components/TournamentCustomer/TournamentCustomerTable";
import DeleteModal from "components/modal/DeleteModal";
import MainDrawer from "components/drawer/MainDrawer";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TournamentServices from "services/TournamentServices";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import FlightTournamentTable from "components/FlightTournament/FlightTouramentTable";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "context/SidebarContext";
import useToggleDrawer from "hooks/useToggleDrawer";

import FlightResultTable from "components/FlightResult/FlightResultTable";
import FlightResultDrawer from "components/drawer/FlightResultDrawer";
import FlightResultServices from "services/FlightResultServices";
import FlightDrawer from "components/drawer/FlightDrawer";

const TournamentDetailed = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const {
    toggleDrawer,
    closeDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
    handleSearchSubmit,
    setIsUpdate,
    currentDrawer,
    setCurrentDrawer,
    isDrawerOpen,
    setIsDrawerOpen,
    nameDrawer,
    setNameDrawer,
  } = useContext(SidebarContext);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setIsUpdate(true);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
    setIsUpdate(true);
  };
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  //Test Drawer

  const { data, loading, error } = useAsync(() =>
    TournamentServices.getById(id)
  );
  const {
    data: dataCustomerTournament,
    loading: loadingCustomerTournament,
    error: errorCustomerTournament,
  } = useAsync(() =>
    TournamentServices.getAllCustomer(id, {
      search,
      start_date: startDate,
      end_date: endDate,
    })
  );
  const {
    data: dataFlightTournament,
    loading: loadingFlightTournament,
    error: errorFlightTournament,
  } = useAsync(() => TournamentServices.getAllFlightInTour(id));

  const {
    data: dataFlightResult,
    loading: loadingFlightResult,
    error: errorFlightResult,
  } = useAsync(() => TournamentServices.getAllFlightResult(id));
  const {
    handleChangePage: handleChangePageCustomerTournament,
    totalResults: totalResultsTournament,
    resultPerPageCustomerTournament,
    dataTable: dataTableCustomerTournament,
  } = useFilter(dataCustomerTournament.data);

  const {
    data: dataFlightResultTournament,
    loading: loadingFlightResultTournament,
    error: errorFlightResultTournament,
  } = useAsync(() => FlightResultServices.getAllCurrentFlightResult(id));
  const exportCustomerHistoriesToExcel = () => {
    const keysToRemove = ["tournament_id", "customer_id", "_id"];
    const keysToFormat = ["createdAt", "updatedAt", "booked_date"];
    const newCustomerTournaments = dataCustomerTournament?.data.map((obj) => {
      const newArr = {};
      for (const key in obj) {
        if (!keysToRemove.includes(key)) {
          if (keysToFormat.includes(key)) {
            const originalDate = new Date(obj[key]);
            const formattedDate = format(originalDate, "dd/MM/yy");
            newArr[t(key)] = formattedDate;
          } else if (typeof obj[key] === "object") {
            // Get Customer value
            for (const objKey in obj[key]) {
              if (objKey !== "_id" && objKey !== "avatar") {
                newArr[t(objKey)] = t(obj[key][objKey]);
              }
            }
          } else {
            newArr[t(key)] = t(obj[key]);
          }
        }
      }
      return newArr;
    });
    const ws = XLSX.utils.json_to_sheet(newCustomerTournaments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "customer_tournament_histories.xlsx");
  };

  if (loading) {
    return <Loading loading={loading} />;
  }

  if (error || !data || !data.data) {
    return (
      <div className="w-full bg-white rounded-md dark:bg-gray-800">
        <div className="p-8 text-center">
          <span className="flex justify-center my-30 text-red-500 font-semibold text-6xl">
            <ImFileEmpty />
          </span>
          <h2 className="font-medium text-base mt-4 text-gray-600">
            {t("Tournament Not Found")}
          </h2>
        </div>
      </div>
    );
  }

  const tournamentData = data.data;

  return (
    <>
      <PageTitle>{t("Tournament DETAILED")}</PageTitle>
      <DeleteModal ids={id} title={tournamentData?.name} />

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="lg:flex  md:flex xl:w-1/2  md:w-full md:justify-end flex-grow-0">
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={() => {
                    setCurrentDrawer("flight");
                    toggleDrawer();
                  }}
                  className="w-full rounded-md h-10"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add Flight")}
                </Button>
              </div>
            </div>
            <div className="lg:flex  md:flex  xl:w-1/2  md:w-full  flex-grow-0">
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={() => {
                    setCurrentDrawer("FlightResult");
                    toggleDrawer();
                  }}
                  className="w-full rounded-md h-10"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add Result")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <div className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 md:w-2/3 md:mx-auto rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <h1 className="font-bold font-serif text-xl uppercase text-center flex-1">
              {t("GENERAL INFORMATION")}
            </h1>
          </div>

          <p className="font-bold font-serif text-lg text-orange-400 dark:text-gray-500 block mt-4">
            {`${tournamentData?.name}`}
          </p>

          <div className="flex lg:flex-col md:flex-col flex-col py-6 flex-1 w-full">
            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Description")}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {tournamentData?.category.length > 100 ? (
                  <>{tournamentData?.category.substring(0, 100)}...</>
                ) : (
                  tournamentData?.category
                )}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Start Date")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {dayjs(tournamentData?.start_date).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("CUSTOMER BOOKED HISTORIES")}
        </h1>

        <Button
          onClick={exportCustomerHistoriesToExcel}
          className="h-12 my-2 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded inline-flex items-center text-xs"
        >
          <i className="fas fa-download mr-2"></i>
          <span>{t("Export Customer Histories")}</span>
        </Button>

        <div className="flex items-center w-full my-2 pb-4">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <label className="mb-1 dark:text-gray-300">{t("From")}:</label>
              <Input
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white mr-3"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 dark:text-gray-300">{t("To")}:</label>
              <Input
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white mr-3"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>

          <Input
            className="border h-12 text-sm focus:outline-none block w-48 bg-gray-100 border-transparent focus:bg-white self-end ml-3"
            type="search"
            name="search"
            placeholder={t("Search Customer")}
            onChange={(event) => {
              setSearch(event.target.value);
              setIsUpdate(true);
            }}
          />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-1">
            {/* Your button content here */}
          </button>
        </div>

        {!loadingCustomerTournament ? (
          dataCustomerTournament?.data?.length > 0 ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell> {t("Customer Name")} </TableCell>
                    <TableCell className="text-center">
                      {t("Booking Date")}
                    </TableCell>
                    <TableCell className="text-center">{t("Email")}</TableCell>
                    <TableCell className="text-center">{t("Phone")}</TableCell>
                    <TableCell className="text-center">
                      {t("Price Amount")}
                    </TableCell>
                    <TableCell className="text-center">
                      {t("Payment Method")}
                    </TableCell>
                    <TableCell className="text-center">{t("Status")}</TableCell>
                    <TableCell className="text-right">{t("Action")} </TableCell>
                  </tr>
                </TableHeader>
                <TournamentCustomerTable
                  data={dataCustomerTournament.data}
                  currentDrawer={currentDrawer}
                  tournamentId={id}
                  setCurrentDrawer={setCurrentDrawer}
                />
              </Table>
              <TableFooter>
                {/* <Pagination
                  totalResults={totalResultsTournament}
                  resultsPerPage={resultPerPageCustomerTournament}
                  onChange={handleChangePageCustomerTournament}
                  label="Table navigation"
                /> */}
              </TableFooter>
            </TableContainer>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title={t("History")} />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>
      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("ALL FLIGHTS IN THIS TOURNAMENT")}
        </h1>

        {!loadingFlightTournament ? (
          dataFlightTournament.data.length > 0 ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell className="text-left"> {t("Flight")} </TableCell>
                    <TableCell className="text-center">
                      {" "}
                      {t("Players Number")}{" "}
                    </TableCell>
                    <TableCell className="text-center">
                      {" "}
                      {t("Players")}{" "}
                    </TableCell>
                    <TableCell className="text-center">{t("Status")}</TableCell>
                    <TableCell className="text-center">
                      {t("Start Date")}
                    </TableCell>
                    <TableCell className="text-right">{t("Action")} </TableCell>
                  </tr>
                </TableHeader>
                <FlightTournamentTable
                  data={dataFlightTournament.data}
                  tournamentId={id}
                  currentDrawer={currentDrawer}
                  setCurrentDrawer={setCurrentDrawer}
                />
              </Table>
              <TableFooter>
                {/* <Pagination
                  totalResults={totalResultsTournament}
                  resultsPerPage={resultPerPageCustomerTournament}
                  onChange={handleChangePageCustomerTournament}
                  label="Table navigation"
                /> */}
              </TableFooter>
            </TableContainer>
          ) : (
            <>
              {/* <MainDrawer> */}
                {currentDrawer === "flight" && (
                    <FlightDrawer
                      key={serviceId}
                      id={serviceId}
                      tournamentId={id}
                    />
                )}
              {/* </MainDrawer> */}

              <div className="flex items-center justify-center">
                <NotFound title={t("History")} />
              </div>
            </>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 mb-4 p-4 lg:p-8 rounded-xl shadow-sm overflow-hidden">
        <h1 className="font-bold font-serif text-xl uppercase mb-4 dark:text-gray-300">
          {t("RESULTS OF TOURNAMENT")}
        </h1>
        {!loadingFlightResultTournament ? (
          dataFlightResultTournament?.data?.length > 0 ? (
            <TableContainer className="mb-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell className="text-left"> {t("Name")} </TableCell>
                    <TableCell className="text-center">
                      {t("Number of Players")}
                    </TableCell>
                    <TableCell className="text-center">
                      {t("Players")}
                    </TableCell>
                    <TableCell className="text-right">{t("Action")} </TableCell>
                  </tr>
                </TableHeader>
                <FlightResultTable
                  data={dataFlightResultTournament.data}
                  tournamentId={id}
                  currentDrawer={currentDrawer}
                  setCurrentDrawer={setCurrentDrawer}
                />
              </Table>
              <TableFooter>
                <Pagination
                  totalResults={totalResultsTournament}
                  resultsPerPage={resultPerPageCustomerTournament}
                  onChange={handleChangePageCustomerTournament}
                  label="Table navigation"
                />
              </TableFooter>
            </TableContainer>
          ) : (
            <>
              {/* <MainDrawer> */}
                {currentDrawer === "FlightResult" && (
                    <FlightResultDrawer
                      key={serviceId}
                      id={serviceId}
                      tournamentId={id}
                    />
                )}
              {/* </MainDrawer> */}

              <div className="flex items-center justify-center">
                <NotFound title={t("History")} />
              </div>
            </>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>
    </>
  );
};

export default TournamentDetailed;

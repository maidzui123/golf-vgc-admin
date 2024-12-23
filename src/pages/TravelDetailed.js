import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Button,
  Input,
} from "@windmill/react-ui";
import { format } from "date-fns";
import useAsync from "hooks/useAsync";
import PageTitle from "components/Typography/PageTitle";
import Loading from "components/preloader/Loading";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";
import { ImFileEmpty } from "react-icons/im";
import * as dayjs from "dayjs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TravelServices from "services/TravelServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TravelCustomerTable from "components/travelCustomer/TravelCustomerTable";
import DeleteModal from "components/modal/DeleteModal";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import { SidebarContext } from "context/SidebarContext";

const TravelDetailed = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { setIsUpdate } = useContext(SidebarContext);
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
  const { data, loading, error } = useAsync(() => TravelServices.getById(id));

  const { data: dataCustomerTravel, loading: loadingCustomerTravel } = useAsync(
    () =>
      TravelServices.getAllCustomer(id, {
        search,
        start_date: startDate,
        end_date: endDate,
      })
  );
  const styles = {
    carouselContainer: {
      maxWidth: "80%",
      margin: "0 auto",
    },
    
    horizontalImage: {
      width: "100%",
      maxHeight: "400px",
      objectFit: "contain",
      padding: "10px",
    },
  };

  const exportCustomerHistoriesToExcel = () => {
    const keysToRemove = ["travel_id", "customer_id", "_id", "order", "payment"];
    const keysToFormat = ["createdAt", "updatedAt", "booked_date"];
    const newCustomerTravels = dataCustomerTravel?.data.map((obj) => {
      const newArr = {};
      for (const key in obj) {
        if (!keysToRemove.includes(key)) {
          if (keysToFormat.includes(key)) {
            const originalDate = new Date(obj[key]);
            const formattedDate = format(originalDate, "dd/MM/yy");
            newArr[t(key)] = formattedDate;
          } 
          else if (typeof obj[key] === "object") {
            // Get Customer value
            for (const objKey in obj[key]) {
              if (objKey !== "_id" && objKey !== "avatar") {
                newArr[t(objKey)] = t(obj[key][objKey]);
              }
            }
          }
           else {
            newArr[t(key)] = t(obj[key]);
          }
        }
      }
      return newArr;
    });
    console.log(newCustomerTravels);
    const ws = XLSX.utils.json_to_sheet(newCustomerTravels);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "customer_travel_histories.xlsx");
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
            {t("Travel Not Found")}
          </h2>
        </div>
      </div>
    );
  }

  const travelData = data.data;

  return (
    <>
      <PageTitle>{t("TRAVEL DETAILED")}</PageTitle>
      <DeleteModal ids={id} title={travelData.name} />

      <div className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 md:w-2/3 md:mx-auto rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col items-center">
          <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 justify-center text-gray-700 dark:border-gray-700 dark:text-gray-300">
            <h1 className="font-bold font-serif text-xl uppercase text-center flex-1">
              {t("GENERAL INFORMATION")}
            </h1>
          </div>
          <Carousel
            showThumbs={false}
            showStatus={false}
            showArrows={true}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
            style={styles.carouselContainer}
          >
            {travelData?.images.map((image, index) => (
              <div key={index}>
                <img src={image?.path} alt="Event" style={styles.horizontalImage} />
              </div>
            ))}
          </Carousel>

          <p className="font-bold font-serif text-lg text-orange-400 dark:text-gray-500 block mt-4">
            {`${travelData?.name}`}
          </p>

          <div className="flex lg:flex-col md:flex-col flex-col py-6 flex-1 w-full">
            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Email")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {travelData?.rating}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Address")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {travelData?.address}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Description")}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {travelData.description.length > 100 ? (
                  <>{travelData.description.substring(0, 100)}...</>
                ) : (
                  travelData?.description
                )}
              </p>
            </div>

            <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
              <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                {t("Start Date")}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-600 block">
                {dayjs(travelData?.start_date).format("DD/MM/YYYY")}
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
          <span>{t("Export Customer Booked Histories")}</span>
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
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white self-end ml-3"
            type="search"
            name="search"
            placeholder={t("Search Customer")}
            onChange={(event) => {
              setSearch(event.target.value);
              setIsUpdate(true);
            }}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 mt-5 mr-1"
          ></button>
        </div>

        {!loadingCustomerTravel ? (
          dataCustomerTravel?.data?.length > 0 ? (
            <>
              <TableContainer className="mb-8">
                <Table>
                  <TableHeader>
                    <tr>
                      <TableCell> {t("Customer Name")} </TableCell>
                      <TableCell className="text-center">
                        {t("Booking Date")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Email")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Price Amount")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Payment Method")}
                      </TableCell>
                      <TableCell className="text-center">
                        {t("Status")}{" "}
                      </TableCell>
                      <TableCell className="text-right">
                        {t("Action")}{" "}
                      </TableCell>
                    </tr>
                  </TableHeader>
                  <TravelCustomerTable data={dataCustomerTravel?.data} travelId={id}/>
                </Table>
                <TableFooter>
                  {/* <Pagination
                    totalResults={totalResultsTravel}
                    resultsPerPage={resultPerPageCustomerTravel}
                    onChange={handleChangePageCustomerTravel}
                    label="Table navigation"
                  /> */}
                </TableFooter>
              </TableContainer>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <NotFound title={t("History")} />
            </div>
          )
        ) : (
          <TableLoading row={12} col={7} width={160} height={20} />
        )}
      </div>
    </>
  );
};

export default TravelDetailed;

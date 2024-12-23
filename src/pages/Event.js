import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import { format } from "date-fns";
import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import EventServices from "services/EventServices";
import * as XLSX from "xlsx";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import EventTable from "components/event/EventTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import EventDrawer from "components/drawer/EventDrawer";
import CheckBox from "components/form/CheckBox";
import useEventFilter from "hooks/useEventFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const Events = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    setIsUpdate,
    toggleDrawer,
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
  } = useContext(SidebarContext);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
    status: "",
  });

  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  useEffect(() => {
    setQueryParams({
      page: currentPage,
      limit: limitData,
      search,
      status: statusSearch,
    });
  }, [currentPage, limitData, search, statusSearch]);

  const { data, loading } = useAsync(() => EventServices.getAll(queryParams));

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsUpdate(true);
  };
  const exportToExcel = async () => {
    try {
      // Fetch all events without pagination
      const allEvents = await EventServices.getAll({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
        search,
        status: statusSearch,
      });

      // Check if there is data
      if (allEvents.data && allEvents.data.length > 0) {
        const keysToRemove = [
          "_id",
          "id",
          "deleted",
          "admin_id",
          "course_id",
          "club_id",
          "max_player",
          "__v",
          "city_id",
          "geometry",
          "registered",
          "images",
          "active",
          "organiztion",
        ];
        const keysToFormat = [
          "register_expired",
          "createdAt",
          "end_date",
          "start_date",
          "updatedAt",
        ];
        const newAllEvents = allEvents.data.map((obj) => {
          const newArr = {};
          for (const key in obj) {
            if (!keysToRemove.includes(key)) {
              if (keysToFormat.includes(key)) {
                const originalDate = new Date(obj[key]);
                const formattedDate = format(originalDate, "dd/MM/yy");
                newArr[t(key)] = formattedDate;
              } else if (key === "status") { // translate status
                newArr[t(key)] = t(obj[key]);
              } else {
                newArr[t(key)] = obj[key];
              }
            }
          }
          return newArr;
        });
        console.log(newAllEvents);
        const ws = XLSX.utils.json_to_sheet(newAllEvents);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "events.xlsx");
      } else {
        console.error("No data available for export");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { serviceData } = useEventFilter(data?.data);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      ></link>
      <PageTitle>{t("EVENTS MANAGEMENT")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Events" />
      <MainDrawer>
        <EventDrawer id={serviceId} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <button
          onClick={exportToExcel}
          className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-2 rounded inline-flex items-center text-xs"
        >
          <i className="fas fa-download mr-2"></i>
          <span> {t("Export to Excel")}</span>
        </button>
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="flex justify-start xl:w-1/2  md:w-full"></div>
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0">
              <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
                <Button
                  disabled={isCheck?.length < 1}
                  onClick={() => handleDeleteMany(isCheck, data.products)}
                  className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                >
                  <span className="mr-2">
                    <FiTrash2 />
                  </span>

                  {t("Delete")}
                </Button>
              </div>
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add Event")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form onSubmit={handleSearchSubmit} className="py-3">
            <div className="flex flex-col md:flex-row items-center">
              <Select
                value={statusSearch}
                onChange={(e) => {
                  setStatusSearch(e.target.value);
                  setIsUpdate(true);
                }}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white md:mr-3 my-2 md:my-0"
                name="search"
              >
                <option value="" hidden defaultValue>
                  {t("Fillter by status ...")}
                </option>
                <option value="">{t("ALL STATUS")}</option>
                <option value="ONGOING">{t("ONGOING")}</option>
                <option value="REGISTERING">{t("REGISTERING")}</option>
                <option value="CLOSED">{t("CLOSED")}</option>
              </Select>{" "}
              <Input
                value={search}
                onChange={handleSearchChange}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white my-2 md:my-0 md:mr-3"
                type="search"
                name="search"
                placeholder={t("Search Event")}
              />
              <Button
                type="submit"
                className="w-full md:w-40 text-white px-3 py-2 rounded h-12"
              >
                {t("Search")}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t("Name")}</TableCell>
                <TableCell className="text-left">{t("Description")}</TableCell>
                <TableCell className="text-center">{t("Status")}</TableCell>
                {/* <TableCell className="text-center">{t("Active")}</TableCell> */}
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <EventTable
              lang={lang}
              isCheck={isCheck}
              data={data?.data}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Event Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title={t("Event")} />
      )}
    </>
  );
};

export default Events;

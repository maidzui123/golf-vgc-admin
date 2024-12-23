import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";

import CustomerTable from "components/customer/CustomerTable";
import SelectLevel from "components/form/SelectLevel";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import React, { useContext, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import CustomerServices from "services/CustomerServices";

const Customers = () => {
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
  } = useContext(SidebarContext);

  const exportToExcel = async () => {
    try {
    
      const allCustomers = await CustomerServices.getAll({
        page: 1,
        limit: Number.MAX_SAFE_INTEGER,
        search,
        tick_status: statusSearch,
        level,
      });

      // Check if there is data
      if (allCustomers.data && allCustomers.data.length > 0) {
        const ws = XLSX.utils.json_to_sheet(allCustomers.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "customers.xlsx");
      } else {
        console.error("No data available for export");
      }
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");
  const [level, setLevel] = useState("");

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
    tick_status: "",
    level: "",
  });

  useEffect(() => {
    setQueryParams({
      page: currentPage,
      limit: limitData,
      search,
      tick_status: statusSearch,
      level,
    });
  }, [currentPage, limitData, search, statusSearch, level]);

  const { data, loading } = useAsync(() =>
    CustomerServices.getAll(queryParams)
  );

  const { serviceData } = useFilter(data?.data);

  const { t } = useTranslation();

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      ></link>
      <PageTitle>{t("CUSTOMERS")}</PageTitle>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <button
          onClick={exportToExcel}
          className="bg-black hover:bg-gray-700 text-white font-bold py-1 px-2 rounded inline-flex items-center text-xs"
        >
          <i className="fas fa-download mr-2"></i>
          <span>{t("Export to Excel")}</span>
        </button>
        <CardBody className="">
          <div className="flex items-center">
            <Select
              value={statusSearch}
              onChange={(e) => {
                setStatusSearch(e.target.value);
                setIsUpdate(true);
              }}
              className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white mr-3"
              name="search"
            >
              <option value="" hidden defaultValue>
                {t("Fillter by Tick status ...")}
              </option>
              <option value={0}>{t("GRAY")}</option>
              <option value={1}>{t("GREEN")}</option>
              <option value={2}>{t("GOLD")}</option>
            </Select>

            <SelectLevel
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                setIsUpdate(true);
              }}
              className="mr-3"
            />

            <Input
              className="mr-2 border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              type="search"
              name="search"
              placeholder={t("CustomersPageSearchPlaceholder")}
              onChange={(event) => {
                setSearch(event.target.value);
                setIsUpdate(true);
              }}
            />

            <div className="w-full md:w-50 lg:w-50 xl:w-50">
              <Button className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiSearch />
                </span>
                {t("Search")}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("CustomersId")}</TableCell>
                <TableCell className="text-center">{t("Full Name")}</TableCell>
                <TableCell className="text-center">{t("Phone")}</TableCell>
                <TableCell className="text-center">{t("Email")}</TableCell>
                <TableCell className="text-center">
                  {t("Joining Date")}
                </TableCell>
                <TableCell className="text-center">{t("Membership")}</TableCell>
                <TableCell className="text-center">{t("Type tick")}</TableCell>
                <TableCell className="text-right">
                  {t("CustomersActions")}
                </TableCell>
              </tr>
            </TableHeader>

            <CustomerTable customers={data?.data} />
          </Table>

          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title={t("CustomersP")} />
      )}
    </>
  );
};

export default Customers;

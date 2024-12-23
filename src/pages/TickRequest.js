import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
  Select,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import NotFound from "components/table/NotFound";
import TickRequestServices from "services/TickRequestServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import TickRequestTable from "components/tickRequest/TickRequestTable";
import MainDrawer from "components/drawer/MainDrawer";
import TickRequestDrawer from "components/drawer/TickRequestDrawer";
import CheckBox from "components/form/CheckBox";
import useTickRequestFilter from "hooks/useTickRequestFilter";
import TableLoading from "components/preloader/TableLoading";

const TickRequests = () => {
  const { serviceId } = useToggleDrawer();

  const { t } = useTranslation();
  const {
    lang,
    currentPage,
    handleChangePage,
    searchText,
    searchRef,
    handleSubmitForAll,
    limitData,
    handleSearchSubmit,
    setIsUpdate
  } = useContext(SidebarContext);

  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
    status: ""
  });

  useEffect(() => {
    setQueryParams({ page: currentPage, limit: limitData, search, status: statusSearch });
  }, [currentPage, limitData, search, statusSearch]);

  const { data, loading } = useAsync(() => TickRequestServices.getAll(queryParams), [queryParams]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsUpdate(true)
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
  const { serviceData, dataTable } = useTickRequestFilter(data?.data);

  return (
    <>
      <PageTitle>{t("TICK GOLD REQUESTS PAGE")}</PageTitle>

      <MainDrawer>
        {serviceId && <TickRequestDrawer id={serviceId} />}
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form onSubmit={handleSearchSubmit} className="py-3">
            <div className="flex items-center">
              <Select
                value={statusSearch}
                onChange={e => {
                  setStatusSearch(e.target.value)
                  setIsUpdate(true)
                }}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white mr-3"
                name="search"
              >
                <option value="" hidden defaultValue>{t("Fillter by status ...")}</option>
                <option value="PENDING">{t("PENDING")}</option>
                <option value="REJECTED">{t("REJECTED")}</option>
              </Select>
              {" "}
              <Input
                value={search}
                onChange={handleSearchChange}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Search Tick Request")}
              />
              <Button
                type="submit"
                className="ml-2 text-white px-4 py-2 rounded w-32 h-12"
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
                <TableCell className="text-center">{t("Fullname")}</TableCell>
                <TableCell className="text-center">{t("Email")}</TableCell>
                <TableCell className="text-center">{t("Phone")}</TableCell>
                <TableCell className="text-center">
                  {t("Request Date")}
                </TableCell>
                <TableCell className="text-center">{t("Status")}</TableCell>
                <TableCell>{t("Description")}</TableCell>

                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <TickRequestTable
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
              label="TickRequest Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="TickRequest" />
      )}
    </>
  );
};

export default TickRequests;

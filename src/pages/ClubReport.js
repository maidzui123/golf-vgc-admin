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
import { FiPlus, FiSearch } from "react-icons/fi";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ClubReportServices from "services/ClubReportServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ClubReportTable from "components/clubReport/ClubReportTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ClubReportDrawer from "components/drawer/ClubReportDrawer";
import CheckBox from "components/form/CheckBox";
import useClubReportFilter from "hooks/useClubReportFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const ClubReports = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    setIsUpdate,
    lang,
    currentPage,
    handleChangePage,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const [search, setSearch] = useState("");

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
  });

  useEffect(() => {
    setQueryParams({ page: currentPage, limit: limitData, search });
  }, [currentPage, limitData, search]);

  const { data, loading } = useAsync(() =>
    ClubReportServices.getAll(queryParams)
  );
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

  const { serviceData } = useClubReportFilter(data?.products);

  return (
    <>
      <PageTitle>{t("Club's Post Reports Page")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="ClubReports" />
      <MainDrawer>
        <ClubReportDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Search Club Post's Report")}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setIsUpdate(true);
                }}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5"
              ></button>
            </div>

            <div className="w-50 md:w-50 lg:w-50 xl:w-50">
              <Button className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiSearch />
                </span>
                {t("Search")}
              </Button>
            </div>

            <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
              <Button
                disabled={isCheck?.length < 1}
                onClick={() => handleDeleteMany(isCheck, data.products)}
                className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
              >
                <span className="mr-2">
                  <FiTrash2 />
                </span>

                {t("Delete Many")}
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
                <TableCell>{t("Name Club")}</TableCell>
                <TableCell className="text-center">{t("Post Owner")}</TableCell>
                <TableCell>{t("Post Description")}</TableCell>
                <TableCell className="text-center">
                  {t("Number Of User Reports")}
                </TableCell>
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>

            <ClubReportTable
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
              label="ClubReport Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Club Post's Report" />
      )}
    </>
  );
};

export default ClubReports;

import React, { useContext, useState, useEffect } from "react";
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

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import LevelServices from "services/LevelServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import LevelTable from "components/level/LevelTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import LevelDrawer from "components/drawer/LevelDrawer";
import CheckBox from "components/form/CheckBox";
import useLevelFilter from "hooks/useLevelFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const Levels = () => {
  const { title, allId, serviceId, handleDeleteMany } = useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
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
    setIsUpdate,
    handleSearchSubmit,
  } = useContext(SidebarContext);

  const [search, setSearch] = useState("");

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
  });
  useEffect(() => {
    setQueryParams({
      page: currentPage,
      limit: limitData,
      search,
    });
  }, [currentPage, limitData, search]);

  const { data, loading } = useAsync(
    () => LevelServices.getAll(queryParams),
    [queryParams]
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
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsUpdate(true);
  };
  const { serviceData, dataTable } = useLevelFilter(data?.data);

  return (
    <>
      <PageTitle>{t("LEVELS MANAGEMENT")}</PageTitle>

      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />

      <BulkActionDrawer ids={allId} title="Levels" />

      <MainDrawer>
        <LevelDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form onSubmit={handleSearchSubmit} className="py-3">
            <div className="flex items-center">
              {" "}
              <Input
                value={search}
                onChange={handleSearchChange}
                ref={searchRef}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Search Level")}
              />
              <Button
                type="submit"
                className="ml-2 text-white px-4  py-2 rounded" //
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
                {/* <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>{t("Name")}</TableCell>
                <TableCell>{t("Description")}</TableCell>
                <TableCell>{t("Benefits")}</TableCell>
                <TableCell>{t("Fee")}</TableCell>
                <TableCell className="text-center">{t("Status")}</TableCell>
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <LevelTable
              lang={lang}
              isCheck={isCheck}
              data={data?.data}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={
                dataTable?.length < 10 ? dataTable.length : data?.totalDoc
              }
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Level Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Level" />
      )}
    </>
  );
};

export default Levels;

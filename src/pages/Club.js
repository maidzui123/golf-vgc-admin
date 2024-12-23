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

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import NotFound from "components/table/NotFound";
import ClubServices from "services/ClubServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ClubTable from "components/club/ClubTable";
import MainDrawer from "components/drawer/MainDrawer";
import ClubDrawer from "components/drawer/ClubDrawer";
import CheckBox from "components/form/CheckBox";
import useClubFilter from "hooks/useClubFilter";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import { FiPlus } from "react-icons/fi";

const Clubs = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const [search, setSearch] = useState("");

  const { t } = useTranslation();
  const {
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
    setIsUpdate,
    handleSearchSubmit
  } = useContext(SidebarContext);

  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
  });

  useEffect(() => {
    setQueryParams({ page: currentPage, limit: limitData, search });
  }, [currentPage, limitData, search]);

  const { data, loading } = useAsync(
    () => ClubServices.getAll(queryParams),
    [queryParams]
  );


  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setIsUpdate(true);
  };


  const { serviceData } = useClubFilter(data?.data);
  // console.log("dataaaa: ", data);

  return (
    <>
      <PageTitle>{t("CLUBS MANAGEMENT")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Clubs" />
      <MainDrawer>
        <ClubDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form onSubmit={handleSearchSubmit} className="py-3">
            <div className="flex items-center">
              {" "}
              <Input
                value={search}
                onChange={handleSearchChange}
                className="flex-grow border h-12 text-sm focus:outline-none bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Search Club by Name / Description / Rules / Creator")}
              />
              <Button
                type="submit"
                className="ml-2 text-white px-4  py-2 rounded"
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
                <TableCell>{t("Name")}</TableCell>
                <TableCell className="mx-0.5">
                  {t("Description")}
                </TableCell>
                <TableCell className="text-left">{t("Rules")}</TableCell>
                <TableCell className="text-center">
                  {t("Joining Fee")}
                </TableCell>
                <TableCell className="text-center">{t("Creator")}</TableCell>
                <TableCell className="text-center">
                  {t("Time Create")}
                </TableCell>
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <ClubTable
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
              label="Club Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Club" />
      )}
    </>
  );
};

export default Clubs;

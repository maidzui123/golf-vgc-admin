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

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import UploadManyTwo from "components/common/UploadManyTwo";
import NotFound from "components/table/NotFound";
import ClubCommentServices from "services/ClubCommentServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import ClubCommentTable from "components/clubComment/ClubCommentTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import ClubCommentDrawer from "components/drawer/ClubCommentDrawer";
import CheckBox from "components/form/CheckBox";
import useClubCommentFilter from "hooks/useClubCommentFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const ClubComments = () => {
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
    handleSearchSubmit
  } = useContext(SidebarContext);

  // const { data, loading } = useAsync(() =>
  //   ClubCommentServices.getAll({
  //     page: currentPage,
  //     limit: limitData,
  //     // category: category,
  //     title: searchText,
  //     // price: sortedField,
  //   })
  // );


  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: limitData,
    search: "",
  });

  useEffect(() => {
    setQueryParams({ page: currentPage, limit: limitData, search });
  }, [currentPage, limitData, search]);

  const { data, loading } = useAsync(
    () => ClubCommentServices.getAll(queryParams),
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
  };


  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useClubCommentFilter(data?.data);

  return (
    <>
      <PageTitle>{t("CLUB'S COMMENTS MANAGEMENT")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="ClubComments" />
      <MainDrawer>
        <ClubCommentDrawer id={serviceId} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
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
              {/* <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("AddClubComment")}
                </Button>
              </div> */}
            </div>
          </form>
        </CardBody>
      </Card>

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
                placeholder="Search Club Comment by Name / Description"
              />
              <Button
                type="submit"
                className="ml-2 text-white px-4  py-2 rounded"
              >
                Search
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
                <TableCell>{t("Description")}</TableCell>

                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <ClubCommentTable
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
              label="ClubComment Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Club's Comment" />
      )}
    </>
  );
};

export default ClubComments;

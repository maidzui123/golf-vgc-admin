import React, { useContext, useState } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
  Button,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import NotFound from "components/table/NotFound";
import NewsServices from "services/NewsServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import NewsTable from "components/news/NewsTable";
import MainDrawer from "components/drawer/MainDrawer";
import NewsDrawer from "components/drawer/NewsDrawer";
import CheckBox from "components/form/CheckBox";
import useNewsFilter from "hooks/useNewsFilter";
import TableLoading from "components/preloader/TableLoading";
import { FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { EditorState } from "draft-js";
import DeleteModal from "components/modal/DeleteModal";

const Newss = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    lang,
    toggleDrawer,
    currentPage,
    handleChangePage,
    searchText,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
    setIsUpdate,
  } = useContext(SidebarContext);

  const [search, setSearch] = useState("");

  const { data, loading } = useAsync(() =>
    NewsServices.getAll({
      page: currentPage,
      limit: limitData,
      title: search,
    })
  );

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    console.log("data", data);
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data.map((li) =>   li._id));
    if (isCheckAll) {
      setIsCheck([]);

    }
  };
  const { serviceData, dataTable } = useNewsFilter(data?.data);

  return (
    <>
      <PageTitle>{t("NEWS MANAGEMENT")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <MainDrawer>
        <NewsDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <form
              onSubmit={handleSubmitForAll}
              className="w-full py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex xl:flex-1 md:mr-4"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={searchRef}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                  type="search"
                  name="search"
                  placeholder={t("Search News by Name")}
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
            </form>
            <div className="w-full md:w-32 lg:w-32 xl:w-32 mr-3 mb-3 lg:mb-0">
              <Button
                disabled={isCheck?.length < 1}
                onClick={() => handleDeleteMany(isCheck, data.products)}
                className="w-full rounded-md h-12 disabled btn-red"
              >
                <span className="mr-2">
                  <FiTrash2 />
                </span>

                {t("Delete")}
              </Button>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56 md:mr-3">
              <Button className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiSearch />
                </span>
                {t("Search")}
              </Button>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                {t("Add News")}
              </Button>
            </div>
          </div>
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
                <TableCell className="text-center">{t("Image")}</TableCell>
                <TableCell>{t("Title")}</TableCell>
                <TableCell>{t("Description")}</TableCell>
                <TableCell className="text-center">
                  {t("Date Posted")}
                </TableCell>
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <NewsTable
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
              label="News Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="News" />
      )}
    </>
  );
};

export default Newss;

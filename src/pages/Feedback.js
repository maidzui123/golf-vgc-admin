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
import FeedbackServices from "services/FeedbackServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import FeedbackTable from "components/feedback/FeedbackTable";
import SelectCategory from "components/form/SelectCategory";
import MainDrawer from "components/drawer/MainDrawer";
import FeedbackDrawer from "components/drawer/FeedbackDrawer";
import CheckBox from "components/form/CheckBox";
import useFeedbackFilter from "hooks/useFeedbackFilter";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import SettingServices from "services/SettingServices";

const Feedbacks = () => {
  const { serviceId } = useToggleDrawer();

  const { t } = useTranslation();
  const {
    lang,
    limitData,
    currentPage,
    handleChangePage,
    setIsUpdate,
    searchText,
    searchRef,
    handleSubmitForAll,
    handleSearchSubmit,
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

  const { data, loading } = useAsync(
    () => FeedbackServices.getAll(queryParams),
    [queryParams]
  );

  const handleSearchChange = (event) => {
    setIsUpdate(true);
    setSearch(event.target.value);
  };

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { serviceData, dataTable } = useFeedbackFilter(data?.data);
  console.log("dataaaaa: ", data);

  return (
    <>
      <PageTitle>{t("FEEDBACK MANAGEMENT")}</PageTitle>

      <MainDrawer>{serviceId && <FeedbackDrawer id={serviceId} />}</MainDrawer>

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
                placeholder={t("Search Feedback")}
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
                <TableCell className="text-left">{t("Name")}</TableCell>
                <TableCell className="text-center">{t("Phone")}</TableCell>
                <TableCell className="text-center">{t("Time")}</TableCell>
                <TableCell>{t("Description")}</TableCell>
                <TableCell className="text-right">{t("Actions")}</TableCell>
              </tr>
            </TableHeader>
            <FeedbackTable
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
              label="Feedback Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title={t("Feedback")} />
      )}
    </>
  );
};

export default Feedbacks;

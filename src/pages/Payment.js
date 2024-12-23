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
  Select,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

import useAsync from "hooks/useAsync";
import useToggleDrawer from "hooks/useToggleDrawer";
import NotFound from "components/table/NotFound";
import PaymentServices from "services/PaymentServices";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import PaymentTable from "components/payment/PaymentTable";
import MainDrawer from "components/drawer/MainDrawer";
import PaymentDrawer from "components/drawer/PaymentDrawer";
import usePaymentFilter from "hooks/usePaymentFilter";
import DeleteModal from "components/modal/DeleteModal";
import TableLoading from "components/preloader/TableLoading";
import { FiSearch } from "react-icons/fi";

const Payments = () => {
  const { title, allId, serviceId } = useToggleDrawer();

  const { t } = useTranslation();
  const {
    lang,
    currentPage,
    handleChangePage,
    searchRef,
    handleSubmitForAll,
    limitData,
    setIsUpdate
  } = useContext(SidebarContext);

  const [search, setSearch] = useState("");
  const [statusSearch, setStatusSearch] = useState("");

  const { data, loading } = useAsync(() =>
    PaymentServices.getAll({
      page: currentPage,
      limit: limitData,
      title: search,
      status: statusSearch
    })
  );

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.data.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const { serviceData } = usePaymentFilter(data?.data);

  return (
    <>
      <PageTitle>{t("Payments Management")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <MainDrawer>
        <PaymentDrawer id={serviceId} />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex items-center w-full">
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
                  {t("Fillter by status ...")}
                </option>
                <option value="">{t("ALL STATUS")}</option>
                <option value="PAID">{t("PAID")}</option>
                <option value="UNPAID">{t("UNPAID")}</option>
                <option value="FAILED">{t("FAILED")}</option>
                <option value="PENDING">{t("PENDING")}</option>
              </Select>

              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder= {t("Search payment")}
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

            <div className="w-full md:w-56 lg:w-56 xl:w-56 md:mr-3">
              <Button className="w-full rounded-md h-12">
                <span className="mr-2">
                  <FiSearch />
                </span>
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
                <TableCell>{t("Buyer")}</TableCell>
                <TableCell className="text-center">{t("VGA num")}</TableCell>
                <TableCell className="text-center">{t("Source")}</TableCell>
                <TableCell className="text-center">{t("Amount")}</TableCell>
                <TableCell className="text-left">{t("Order description")}</TableCell>
                <TableCell className="text-center">{t("Status")}</TableCell>
                {/* <TableCell className="text-right">{t("Actions")}</TableCell> */}
              </tr>
            </TableHeader>
            <PaymentTable
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
              label="Payment Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Payment" />
      )}
    </>
  );
};

export default Payments;

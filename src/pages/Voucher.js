import React, { useContext } from 'react';
import {
Table,
TableHeader,
TableCell,
TableFooter,
TableContainer,
Button,
Input,
Card,
CardBody,
Pagination,
} from '@windmill/react-ui';
import { FiPlus } from 'react-icons/fi';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import { SidebarContext } from '../context/SidebarContext';
import PageTitle from '../components/Typography/PageTitle';
import VoucherServices from '../services/VoucherServices';
import VoucherTable from '../components/voucher/VoucherTable';
import MainDrawer from '../components/drawer/MainDrawer';
import VoucherDrawer from '../components/drawer/VoucherDrawer';
import { useTranslation } from 'react-i18next';

const Voucher = () => {
const { toggleDrawer } = useContext(SidebarContext);
const { data, loading } = useAsync(VoucherServices.getAll);
const {t} = useTranslation();
const {
  voucherRef,
  setFilter,
  handleChangePage,
  totalResults,
  resultsPerPage,
  dataTable,
  serviceData,
  handleSubmitVoucher,
} = useFilter(data);

return (
<>
  <PageTitle>{t('Voucher')}</PageTitle>

  <MainDrawer>
    <VoucherDrawer />
  </MainDrawer>

  <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
    <CardBody>
      <form onSubmit={handleSubmitVoucher } className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <Input ref={ voucherRef }
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
            type="search" name="search" placeholder="Search by voucher" />
          <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
        </div>
        <div className="w-full md:w-56 lg:w-56 xl:w-56">
          <Button type="button" onClick={toggleDrawer} className="w-full rounded-md h-12">
            <span className="mr-3">
              <FiPlus />
            </span>
            {t("Add Voucher")}
          </Button>
        </div>
      </form>
    </CardBody>
  </Card>

  {loading ? (
  <Loading loading={loading} />
  ) : serviceData.length !== 0 ? (
  <TableContainer className="mb-8">
    <Table>
      <TableHeader>
        <tr>
          <TableCell>ID</TableCell>
          <TableCell>{t("Name")}</TableCell>
          <TableCell>{t("Description")}</TableCell>
          <TableCell className="text-center">{t("Status")}</TableCell>
          <TableCell className="text-right">{t("Actions")}</TableCell>
        </tr>
      </TableHeader>
      <VoucherTable vouchers={dataTable} />
    </Table>
    <TableFooter>
      <Pagination totalResults={totalResults} resultsPerPage={resultsPerPage} onChange={handleChangePage}
        label={t("Table navigation")} />
    </TableFooter>
  </TableContainer>
  ) : (
  <NotFound title={t("Voucher")} />
  )}
</>
);
};

export default Voucher;
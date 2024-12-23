import {
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  WindmillContext,
} from "@windmill/react-ui";
import silverMemberLogo from "../assets/img/membership/silver.png";
import goldMemberLogo from "../assets/img/membership/gold.png";
import platinumMemberLogo from "../assets/img/membership/platinum.png";
import diamondMemberLogo from "../assets/img/membership/diamond.png";
import LineChart from "components/chart/LineChart/LineChart";
import PieChart from "components/chart/Pie/PieChart";
import CardItem from "components/dashboard/CardItem";
import CardItemTwo from "components/dashboard/CardItemTwo";
import ChartCard from "components/chart/ChartCard";
import OrderTable from "components/order/OrderTable";
import TableLoading from "components/preloader/TableLoading";
import NotFound from "components/table/NotFound";
import PageTitle from "components/Typography/PageTitle";
import { SidebarContext } from "context/SidebarContext";
import * as dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import useAsync from "hooks/useAsync";
import useFilter from "hooks/useFilter";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaUser } from "react-icons/fa";
import { MdGolfCourse, MdFlight } from "react-icons/md";
import { GiTrophyCup } from "react-icons/gi";
import OrderServices from "services/OrderServices";
import CustomerServices from "services/CustomerServices";
import ClubServices from "services/ClubServices";
import TournamentServices from "services/TournamentServices";
import TravelServices from "services/TravelServices";
import CustomerTable from "components/customer/CustomerTable";
//internal import

const Dashboard = () => {
  const { globalSetting } = useFilter();
  const { mode } = useContext(WindmillContext);

  dayjs.extend(isBetween);
  dayjs.extend(isToday);
  dayjs.extend(isYesterday);

  const { currentPage, handleChangePage, lang } = useContext(SidebarContext);

  const [salesReport, setSalesReport] = useState([]);

  const { data: dashboardCustomerCount, loading: loadingCustomerCount } =
    useAsync(CustomerServices.getDashboardCount);

  const { data: dashboardClubCount, loading: loadingClubCount } = useAsync(
    ClubServices.getDashboardCount
  );

  const { data: dashboardTournamentCount, loading: loadingTournamentCount } =
    useAsync(TournamentServices.getDashboardCount);

  const { data: dashboardTravelCount, loading: loadingTravelCount } = useAsync(
    TravelServices.getDashboardCount
  );

  const { data: dashboardOrderAmount, loading: loadingOrderAmount } = useAsync(
    OrderServices.getDashboardAmount
  );

  const { data: bestSellerProductChart, loading: loadingBestSellerProduct } =
    useAsync(OrderServices.getBestSellerProductChart);

  const { data: dashboardRecentCustomer, loading: loadingRecentCustomer } =
    useAsync(() =>
      CustomerServices.getDashboardRecentCustomer({
        page: currentPage,
        limit: 5,
      })
    );

  const { dataTable, serviceData } = useFilter(
    dashboardRecentCustomer?.customers
  );

  const { t } = useTranslation();

  useEffect(() => {
    const salesOrderChartData = dashboardOrderAmount?.ordersData?.filter(
      (order) =>
        dayjs(order.updatedAt).isBetween(
          new Date().setDate(new Date().getDate() - 7),
          new Date()
        )
    );

    salesOrderChartData?.reduce((res, value) => {
      let onlyDate = value.updatedAt.split("T")[0];

      if (!res[onlyDate]) {
        res[onlyDate] = { date: onlyDate, total: 0, order: 0 };
        salesReport.push(res[onlyDate]);
      }
      res[onlyDate].total += value.total;
      res[onlyDate].order += 1;
      return res;
    }, {});

    setSalesReport(salesReport);
  }, [dashboardOrderAmount]);

  return (
    <>
      <PageTitle>{t("VGC ADMIN DASHBOARD OVERVIEW")}</PageTitle>

      <div className="grid gap-4 mb-8 md:grid-cols-4 xl:grid-cols-4">
        <CardItemTwo
          title="Total Customer"
          title2="Total Customer"
          subTitle={t("Customer")}
          Icon={FaUser}
          quantity={dashboardCustomerCount.totalCustomer || 0}
          className="text-white dark:text-green-100 bg-purple-500"
          loading={loadingCustomerCount}
        />

        <CardItemTwo
          title="Total Club"
          title2="Total Club"
          Icon={MdGolfCourse}
          subTitle={t("Club")}
          quantity={dashboardClubCount.totalClub || 0}
          className="text-white dark:text-orange-100 bg-orange-400"
          loading={loadingClubCount}
        />

        <CardItemTwo
          title="Total Tournament"
          title2="Total Tournament"
          subTitle={t("Tournament")}
          Icon={GiTrophyCup}
          quantity={dashboardTournamentCount.totalTournament || 0}
          className="text-white dark:text-orange-100 bg-green-500"
          loading={loadingTournamentCount}
        />
        <CardItemTwo
          title="Total Travel"
          title2="Total Travel"
          subTitle={t("Travel")}
          Icon={MdFlight}
          quantity={dashboardTravelCount.totalTravel || 0}
          className="text-white dark:text-orange-100 bg-pink-400"
          loading={loadingTravelCount}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CardItem
          title={t("Total Customer Silver")}
          imageLink={silverMemberLogo}
          loading={loadingCustomerCount}
          quantity={dashboardCustomerCount?.totalCustomerSilver || 0}
          className="text-orange-600 dark:text-black-100 bg-gray-100 dark:bg-gray-500"
        />
        
        <CardItem
          title={t("Total Customer Gold")}
          imageLink={goldMemberLogo}
          loading={loadingCustomerCount}
          quantity={dashboardCustomerCount?.totalCustomerGold || 0}
          className="text-blue-600 dark:text-blue-100 bg-yellow-100 dark:bg-yellow-400"
        />

        <CardItem
          title={t("Total Customer Platium")}
          imageLink={platinumMemberLogo}
          loading={loadingCustomerCount}
          quantity={dashboardCustomerCount?.totalCustomerPlatium || 0}
          className="text-teal-600 dark:text-teal-100 bg-gray-100 dark:bg-gray-200"
        />
        <CardItem
          title={t("Total Customer Diamond")}
          loading={loadingCustomerCount}
          imageLink={diamondMemberLogo}
          quantity={dashboardCustomerCount?.totalCustomerDiamond || 0}
          className="text-green-600 dark:text-green-100 bg-blue-300 dark:bg-blue-300"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 my-8">
        <ChartCard
          mode={mode}
          loading={loadingOrderAmount}
          title={t("Weekly Sales")}
        >
          <LineChart salesReport={salesReport} />
        </ChartCard>

        <ChartCard
          mode={mode}
          loading={loadingBestSellerProduct}
          title={t("Best Travel")}
        >
          <PieChart data={bestSellerProductChart} />
        </ChartCard>
      </div>

      <PageTitle>{t("Recent Customer")}</PageTitle>
      {loadingRecentCustomer ? (
        <TableLoading row={5} col={4} />
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
                <TableCell className="text-center">{t("Action")}</TableCell>
              </tr>
            </TableHeader>

            <CustomerTable customers={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={dashboardRecentCustomer?.totalOrder}
              resultsPerPage={5}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Sorry, There are no recent customer right now." />
      )}
    </>
  );
};

export default Dashboard;

import React, { useContext, useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Card,
  CardBody,
  Input,
  Label,
  TableHeader,
  Textarea,
  TableFooter,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Table,
  Button,
  Pagination,
} from "@windmill/react-ui";

import Title from "../form/Title";
import { useTranslation } from "react-i18next";
import ClubReportServices from "services/ClubReportServices";
import useAsync from "hooks/useAsync";
import Status from "components/table/Status";
import { SidebarContext } from "context/SidebarContext";
import useFilter from "hooks/useFilter";
import { Carousel } from "react-responsive-carousel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import ClubPostServices from "services/ClubPostServices";
import { notifySuccess } from "utils/toast";

const ClubReportDrawer = ({ id }) => {
  const [reports, setReports] = useState([]);
  const { toggleDrawer, isDrawerOpen, setIsUpdate } =
    useContext(SidebarContext);
  const styles = {
    carouselContainer: {
      maxWidth: "80%",
      margin: "0 auto",
    },

    horizontalImage: {
      border: "1px solid #e0e0e0",
      padding: "10px",
    },
    minHeightTable: {
      marginBottom: "200px",
    },
  };
  const { t } = useTranslation();
  const [postId, setPostId] = useState(null);

  const handleDeletePost = async () => {
    console.log("postId", postId);
    if (postId) {
      try {
        await ClubPostServices.deleteOne(postId).then((res) => {
          setIsUpdate(true);
          notifySuccess("Delete post successfully");
          console.log("res", res);
          toggleDrawer();
        });
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };
  const { data, loading, error } = useAsync(
    () => id && ClubReportServices.getById(id)
  );

  useEffect(() => {
    console.log(data);
    setReports(data?.reports);
    setPostId(data?.post_id?._id?._id); // Set the post ID here
  }, [data]);

  // console.log("Data", data);
  const { handleChangePage, totalResults, resultsPerPage, dataTable } =
    useFilter(reports);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title title={t("DETAILED REPORT OF POST")} />
        ) : (
          <Title title={t("NOT FOUND POST")} />
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center flex-col flex-1">
          <Title title={t("Loading ...")} />
        </div>
      ) : reports?.length > 0 ? (
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
          <div className="bg-white w-full dark:bg-gray-800 mb-4 p-6 lg:p-8 md:mx-auto rounded-xl shadow-sm overflow-hidden">
            <div className="flex flex-col items-center">
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 text-gray-700 dark:border-gray-700 dark:text-gray-300">
                <h1 className="font-bold font-serif text-xl uppercase text-center flex-1">
                  {t("GENERAL INFORMATION")}
                </h1>
              </div>

              {data?.post_id?.image && data?.post_id?.image.length > 0 && (
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showArrows={true}
                  infiniteLoop={data?.post_id?.image.length > 1}
                  autoPlay={true}
                  interval={3000}
                  style={styles.carouselContainer}
                >
                  {data?.post_id?.image.map((image, index) => (
                    <div
                      key={index}
                      style={styles.carouselItem}
                      className="rounded-lg border-2 border-gray-300 overflow-hidden"
                    >
                      <img
                        src={image?.path}
                        alt="ClubPost"
                        className="h-40 w-80"
                      />
                    </div>
                  ))}
                </Carousel>
              )}
              {/* <p className="font-bold font-serif text-lg text-orange-400 dark:text-gray-500 block mt-4">
                {`${data?.name}`}
              </p> */}

              <div className="flex lg:flex-col md:flex-col flex-col py-6 flex-1 w-full">
                <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                  <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                    {t("Description")}
                  </p>

                  <p className=" ml-10 text-sm text-gray-600 dark:text-gray-600 block">
                    {/* if the description is too long,add the ...more to view instead of display all */}
                    {data?.post_id?.description.length > 100 ? (
                      <>{data?.post_id?.description} ...more</>
                    ) : (
                      data?.post_id?.description
                    )}
                  </p>
                </div>

                <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                  <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                    {t("Created Date")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-600 block">
                    {dayjs(data?.post_id?.createdAt).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                  <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                    {t("Publisher")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-600 block">
                    <Link to={`/customer/${data?.post_id?.customer_id?._id}`}>
                      {data?.post_id?.customer_id?.name}
                    </Link>
                  </p>
                </div>
                <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                  <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                    {t("Club ")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-600 block">
                    <Link to={`/customer/${data?.post_id?.club_id?._id}`}>
                      {data?.post_id?.club_id?.name}
                    </Link>
                  </p>
                </div>

                {/* <div className="flex lg:flex-row md:flex-row justify-between pt-2 flex-1">
                  <p className="font-bold font-serif text-sm text-gray-600 dark:text-gray-500 block">
                    {t("Organization")}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-600 block">
                    {eventData?.organization}
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div style={styles.minHeightTable} className="overflow-y-auto">
            <TableContainer className="mb-8 mt-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell> {t("Index")} </TableCell>
                    <TableCell>{t("Reporter Name")}</TableCell>
                    <TableCell>{t("Reason Name")}</TableCell>
                    <TableCell className="text-center">
                      {t("Status")}{" "}
                    </TableCell>
                  </tr>
                </TableHeader>

                <TableBody>
                  {reports?.map((item, i) => (
                    <TableRow key={i + 1}>
                      <TableCell>
                        <span className="text-sm">{i + 1}</span>
                      </TableCell>

                      <TableCell className="text-left">
                        <span className="text-sm">
                          {`${item?.customer_id?.last_name || "Reporter"} ${
                            item?.customer_id?.first_name || ""
                          }`}
                        </span>
                      </TableCell>

                      <TableCell>
                        <span className="text-sm">{item.reason_id?.name}</span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center">
                        <Status status={item?.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TableFooter>
                <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={handleChangePage}
                  label="Table navigation"
                />
              </TableFooter>
            </TableContainer>
          </div>
          <div
            className="fixed z-10 bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            style={{ right: !isDrawerOpen && -50 }}
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                onClick={toggleDrawer}
                className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700"
                layout="outline"
              >
                {t("CancelBtn")}
              </Button>
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Button
                type="submit"
                className="w-full h-12"
                onClick={handleDeletePost}
              >
                <span>{t("DELETE POST")}</span>
              </Button>
            </div>
          </div>
        </Scrollbars>
      ) : (
        <div className="flex justify-center items-center flex-col flex-1">
          <Title title={t("THIS POST HASN'T REPORT!!!")} />
        </div>
      )}
    </>
  );
};

export default ClubReportDrawer;

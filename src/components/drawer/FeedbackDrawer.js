import React, { useContext } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Avatar, Button, Card, CardBody, Input, Label, Textarea } from '@windmill/react-ui';

import Title from '../form/Title';
import LabelArea from '../form/LabelArea';
import Uploader from '../image-uploader/Uploader';
import useFeedbackSubmit from '../../hooks/useFeedbackSubmit';
import { useTranslation } from 'react-i18next';
import { SidebarContext } from 'context/SidebarContext';
import { showDateFormat } from 'utils/dateFormate';
import useFilter from 'hooks/useFilter';

const FeedbackDrawer = ({ id }) => {
  const { dataFeedBack, imageFeedback, loading } = useFeedbackSubmit(id);
  const { isDrawerOpen, toggleDrawer } = useContext(SidebarContext)
  const { globalSetting } = useFilter();

  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <Title
          title={t("VIEW DETAILED FEEDBACK")}
          description={t("View Infomation detailed feedback")}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center flex-col flex-1">
          <Title
            title={t("Loading ...")}
          />
        </div>
      ) : (
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
          <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
            <CardBody>
              <form >
                <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Name's User Feedback")} />
                    <div className="col-span-8 sm:col-span-4 flex items-center gap-2">
                      <Avatar
                        className="text-center hidden md:block bg-gray-50"
                        src={dataFeedBack?.customer_id?.avatar?.path || "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"}
                        alt={dataFeedBack.name}
                      />
                      <span className="font-semibold text-lg text-green-500">
                        {`${dataFeedBack.customer_id?.last_name || ""} ${dataFeedBack?.customer_id?.first_name || ""}`}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Phone")} />
                    <div className="col-span-8 sm:col-span-4 text-sm">
                      {dataFeedBack?.customer_id?.phone || "Not Found"}
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Time Feedback")} />
                    <div className="col-span-8 sm:col-span-4 text-sm">
                      {dataFeedBack.createdAt && showDateFormat(
                        dataFeedBack?.createdAt,
                        globalSetting.default_date_format
                      )}
                    </div>
                  </div>

                  {imageFeedback.length > 0 &&
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("List Image")} />
                      <div className="col-span-8 sm:col-span-4 flex gap-2">
                        {imageFeedback.map(item =>
                          <img
                            src={item?.path}
                            className='w-24 border border-gray-200 rounded'
                          />)}
                      </div>
                    </div>
                  }

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Description Feedback")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Textarea
                        className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        value={dataFeedBack.description || "Empty ..."}
                        readOnly
                        name="description"
                        placeholder={t("Description")}
                        rows="10"
                        spellCheck="false"
                      />
                    </div>
                  </div>
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

                </div>
              </form>
            </CardBody>
          </Card>
        </Scrollbars>
      )}
    </>
  );
};

export default FeedbackDrawer;

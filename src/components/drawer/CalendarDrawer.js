import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Card, CardBody, Input, Label,Textarea } from '@windmill/react-ui';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import SelectCalendar from '../form/SelectCalendar';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import useCalendarSubmit from '../../hooks/useCalendarSubmit';
import { useTranslation } from 'react-i18next';

const CalendarDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
  } = useCalendarSubmit(id);
const {t} = useTranslation();
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title= {t("Update Calendar")}
            description= {t("Updated Calendar")}
          />
        ) : (
          <Title
            title= {t("Add Calendar")}
            description= {t("Add Calendar")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label= {t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Calendar name")}
                      autoFocus={true}
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Description")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("description", {
                        required: t("Description is required!"),
                      })}
                      name="description"
                      placeholder={t("Description")}
                      rows="4"
                      spellCheck="false"
                    />
                    <Error errorName={errors.description} />
                  </div>
                </div>
               
                </div>
              
              <DrawerButton id={id} title={ t("Calendar")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default CalendarDrawer;

import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Card,
  CardBody,
  Input,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectTournament from "../form/SelectTournament";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useTournamentSubmit from "../../hooks/useTournamentSubmit";
import { useTranslation } from "react-i18next";
import SelectCourse from "components/form/SelectCourse";
import Cleave from "cleave.js/react";
import SelectClub from "components/form/SelectClub";

const TournamentDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    active,
    setActive,
    setImageUrl,
    setValue,
    selectedDate,
    price,
    setPrice,
    setSelectedDate,
  } = useTournamentSubmit(id);
  const statusOptions = ["REGISTERING", "FULL", "ONGOING", "CLOSED"];
  const VND_CURRENCY = "VND";
  const { t } = useTranslation();

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={t("Update Tournament")}
            description={t("Updated Tournament")}
          />
        ) : (
          <Title
            title={t("Add Tournament")}
            description={t("Add Tournament")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Name")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Name")}
                      name="name"
                      type="text"
                      placeholder={t("Tournament name")}
                      autoFocus={true}
                      required
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Active")} />
                  <div className="col-span-8 sm:col-span-4 flex items-center">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("active")}
                        name="active"
                        autoFocus={true}
                        defaultChecked={active}
                        onChange={(e) => {
                          setValue("active", e.target.checked);
                          setActive(e.target.checked);
                        }}
                        className="form-checkbox text-indigo-600 h-5 w-5"
                      />
                      <span className="text-gray-900 text-sm">
                        {t("Active")}
                      </span>
                    </label>
                    <Error errorName={errors.active} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Price")} required />
                  <div className="col-span-8 sm:col-span-4 relative">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        backgroundColor: "inherit",
                        textColor: "inherit",
                      }}
                    >
                      <Cleave
                        name="price"
                        {...register(("prize"), {
                          required: t("Price is required!"),
                        })}
                        value={price}
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        className="block w-full px-3 py-1 text-sm focus:outline-none dark:text-gray-300 leading-5 rounded-md focus:border-gray-200 border-gray-200 dark:border-gray-600 focus:ring focus:ring-orange-300 dark:focus:border-gray-500 dark:focus:ring-gray-300 dark:bg-gray-700 border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-"
                        onChange={(e) => {
                          const numericValue = parseFloat(
                            e.target.rawValue.replace(/[^0-9]/g, "")
                          );
                          if (!isNaN(numericValue)) {
                            setValue("prize", numericValue);
                            setPrice(numericValue);
                          }
                        }}
                        placeholder={t("Input price ...")}
                        // required
                      />
                      <span className="absolute right-0 mr-3 top-1/2 translate-x-1/2 text-white-700 text-sm">
                        {VND_CURRENCY}
                      </span>
                    </div>
                    <Error errorName={errors.prize} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Start Date")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border text-sm h-12 focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("start_date")}
                      placeholder={t("Start Date")}
                      autoFocus={true}
                      required={true}
                      name="start_date"
                    />
                    <Error errorName={errors.start_date} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("Register Expired Date")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("register_expired")}
                      name="register_expired"
                      placeholder={t("Register Expired Date")}
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.register_expired} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                  <LabelArea label={t("End Date")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      className="h-12 border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      type="datetime-local"
                      {...register("end_date")}
                      name="end_date"
                      placeholder={t("End Date")}
                      autoFocus={true}
                      required={true}
                    />
                    <Error errorName={errors.end_date} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Categories")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("category", {
                        required: t("Categories is required!"),
                      })}
                      name="category"
                      placeholder={t("Categories Description")}
                      rows={4}
                      spellCheck
                    />
                    <Error errorName={errors.category} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Buggy")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("buggy", {
                        required: t("Buggy is required!"),
                      })}
                      name="buggy"
                      placeholder={t("Buggy")}
                      rows="4"
                      spellCheck="false"
                    />
                    <Error errorName={errors.buggy} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Technical Info")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <Textarea
                      className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                      {...register("technical_info", {
                        required: t("Technical Info is required!"),
                      })}
                      name="technical_info"
                      placeholder={t("Technical Information ")}
                      rows="4"
                      spellCheck="false"
                    />
                    <Error errorName={errors.technical_info} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Max Player")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Max player")}
                      name="max_player"
                      type="number"
                      placeholder={t("Number of players can join")}
                      autoFocus={true}
                      required={true}
                      pattern="[0-9]*"
                    />
                    <Error errorName={errors.max_player} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Number of Hole")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Hole number")}
                      name="hole_num"
                      type="number"
                      placeholder={t("Number of holes in the game")}
                      autoFocus={true}
                      required={true}
                      pattern="[0-9]*"
                    />
                    <Error errorName={errors.hole_num} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Handicap Number")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Handicap Number")}
                      name="handicap"
                      type="number"
                      placeholder={t("Handicap Number")}
                      autoFocus={true}
                      required={true}
                      pattern="[0-9]*"
                      min="1"
                      max="200"
                    />
                    <Error errorName={errors.handicap} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Elapsed Time")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label={t("Elapsed Time")}
                      name="elapsed_time"
                      type="number"
                      placeholder={t("Elapsed Number")}
                      autoFocus={true}
                      required={true}
                      pattern="[0-9]*"
                    />
                    <Error errorName={errors.elapsed_time} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Club ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectClub
                      name="club_id"
                      label="Club"
                      register={register}
                      defaultValue={"club_id"}
                    />
                    <Error errorName={errors.club_id} />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("Course ")} required />
                  <div className="col-span-8 sm:col-span-4">
                    <SelectCourse
                      name="course_id"
                      label={t("Course")}
                      register={register}
                      defaultValue={"course_id"}
                    />
                    <Error errorName={errors.course_id} />
                  </div>
                </div>
              </div>

              <DrawerButton id={id} title={t("Tournament")} />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default TournamentDrawer;

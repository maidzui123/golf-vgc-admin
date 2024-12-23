import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { Card, CardBody, Input, Label, Textarea } from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";

import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import DrawerButton from "../form/DrawerButton";
import { useTranslation } from "react-i18next";
import SelectCity from "components/form/SelectCity";
import useTournamentCustomerSubmit from "hooks/useTournamentCustomerSubmit";
import dayjs from "dayjs";
import useFlightResultSubmit from "hooks/useFlightResultSubmit";
import SelectFlight from "components/form/SelectFlight";

const FlightResultDrawer = ({ id, tournamentId }) => {

  const {
    register,
    handleSubmit,
    player,
    setPlayer,
    onSubmit,
    choosePlayer,
    setChoosePlayer,
    setValue,
    errors,
    dataRes,
  } = useFlightResultSubmit({ id, tournamentId });
  const removePlayer = (index) => {
    setChoosePlayer((prev) => {
      const newPlayers = [...prev];
      newPlayers.splice(index, 1); // Remove the player at the specified index
      return newPlayers;
    });
  };
  const { t } = useTranslation();
  return (
    <>
      <MainDrawer>
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {id ? (
            <Title
              title={t("Update Tournament Result")}
              description={t("Updated Tournament Result")}
            />
          ) : (
            <Title
              title={t("Add Tournament Result")}
              description={t("Add Tournament Result")}
            />
          )}
        </div>
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
          <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Result Name")} required />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label={t("Result Name")}
                        name="name"
                        type="text"
                        placeholder={t("Result name")}
                        autoFocus={true}
                        required
                      />
                      <Error errorName={errors.name} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Choose Player")} required />
                    <div className="col-span-8 sm:col-span-4">
                      <SelectFlight
                        tournamentId={tournamentId}
                        name="flight_id"
                        label="Flight"
                        register={register}
                        defaultValue={"flight_id"}
                        chosenPlayers={choosePlayer}
                        onChoosePlayer={setChoosePlayer}
                      />
                      <Error errorName={errors.flight_id} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Players In Tournament")} required />
                    <div className="col-span-8 sm:col-span-4">
                      <table className="min-w-full">
                        <thead>
                          <tr>
                            <th className="px-4 py-2 text-left">{t("Name")}</th>
                            <th className="px-4 py-2 text-left">
                              {t("Score")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {choosePlayer?.map((e, index) => (
                            <tr key={e?._id}>
                              <td className="px-2 py-2">{e?.customer_name}</td>
                              <td className="px-2 py-2">
                                <InputArea
                                  register={register}
                                  label={t("Score")}
                                  name={`score[${index}]`}
                                  type="text" // Change type to text
                                  defaultValue={e?.score}
                                  placeholder={t("Player score")}
                                  autoFocus={true}
                                  onKeyPress={(event) => {
                                    // Allow only numeric input
                                    const isValidInput = /^\d$/.test(event.key);
                                    if (!isValidInput) {
                                      event.preventDefault();
                                    }
                                  }}
                                  onChange={(event) => {
                                    const inputValue = event.target.value;

                                    const isValidInput = /^\d+$/.test(
                                      inputValue
                                    );

                                    if (isValidInput) {
                                      setChoosePlayer((prev) => {
                                        const newPlayers = [...prev];
                                        newPlayers[index].score = inputValue;
                                        return newPlayers;
                                      });
                                    } else {
                                      console.error(
                                        "Invalid input for score:",
                                        inputValue
                                      );
                                    }
                                  }}
                                  required
                                />
                              </td>

                              <td className="px-2 py-2">
                                <button
                                  type="button"
                                  className="text-red-600 hover:text-red-800"
                                  onClick={() => removePlayer(index)}
                                >
                                  {t("Delete")}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <DrawerButton id={id} title={t("Result")} />
              </form>
            </CardBody>
          </Card>
        </Scrollbars>
      </MainDrawer>
    </>
  );
};

export default FlightResultDrawer;

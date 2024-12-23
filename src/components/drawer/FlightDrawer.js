import React, { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Textarea,
  Select,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import Title from "../form/Title";
import Error from "../form/Error";
import LabelArea from "../form/LabelArea";
import InputArea from "../form/InputArea";
import SelectFlight from "../form/SelectFlight";
import DrawerButton from "../form/DrawerButton";
import Uploader from "../image-uploader/Uploader";
import useFlightSubmit from "../../hooks/useFlightSubmit";
import { useTranslation } from "react-i18next";
import { Pl } from "react-flags-select";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SelectTournamentForFlight from "components/form/SelectTournamentForFlight";
import { set } from "cloudinary/lib/cache";
import { Controller } from "react-hook-form";
import DraggableController from "components/dragable/DraggableController";
const FlightDrawer = ({ id, tournamentId }) => {
  const [isChoosing, setChoosing] = useState(false);

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    latestUpdate,
    imageUrl,
    setImageUrl,
    setValue,
    newPlayer,
    setPlayer,
    setNewPlayer,
    player,
    selectedDate,
    setSelectedDate,
    control,
  } = useFlightSubmit({ id, tournamentId });
  const statusOptions = ["ONGOING", "CLOSED", "REGISTERING"];
  const playerCardStyle = {
    backgroundColor: "#4B5563",
    color: "white",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "8px",
    position: "relative",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "20px",
    height: "20px",
    backgroundColor: "red",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "white",
  };
  const [updNewPlayer, setUpdNewPlayer] = useState([]);
  const resetNewPlayer = () => {
    const filterNewPlayer = newPlayer.filter(
      (sameNewPlayer) =>
        !player.some((samePlayer) => sameNewPlayer._id === samePlayer._id)
    );
    setUpdNewPlayer(filterNewPlayer);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const draggedPlayer = newPlayer[result.source.index];

    setNewPlayer((prevPlayers) =>
      prevPlayers.filter(
        (player) => player.customer_id !== draggedPlayer.customer_id
      )
    );
    // handleRemoveNewPlayer(draggedPlayer)
    // handlePlayerClick(draggedPlayer)
    setPlayer((prevPlayers) => [...prevPlayers, draggedPlayer]);
    setValue("players", [...player, draggedPlayer]);
  };

  const handlePlayerClick = (clickedPlayer) => {
    const isSelected = player.some(
      (player) => player.customer_id === clickedPlayer.customer_id
    );

    if (!isSelected) {
      setPlayer((prevPlayers) => [...prevPlayers, clickedPlayer]);
      setValue("players", [...player, clickedPlayer]);
    }
  };
  const handleReturnPlayerClick = (clickedPlayer) => {
    !id
      ? setNewPlayer((prevPlayers) => [...prevPlayers, clickedPlayer])
      : setUpdNewPlayer((prevPlayers) => [...prevPlayers, clickedPlayer]);
  };
  // const handleReturnPlayerClickUpd = (clickedPlayer) => {
  //   setUpdNewPlayer((prevPlayers) => [...prevPlayers, clickedPlayer]);
  // };
  const handleRemovePlayer = (removedPlayer) => {
    setPlayer((prevPlayers) =>
      prevPlayers.filter(
        (player) => player.customer_id !== removedPlayer.customer_id
      )
    );
    setValue(
      "players",
      player.filter(
        (player) => player.customer_id !== removedPlayer.customer_id
      )
    );
  };
  const handleRemoveNewPlayer = (removedNewPlayer) => {
    // Remove the selected player

    !id
      ? setNewPlayer((prevPlayers) =>
          prevPlayers.filter(
            (player) => player.customer_id !== removedNewPlayer.customer_id
          )
        )
      : setUpdNewPlayer((prevPlayers) =>
          prevPlayers.filter((player) => player._id !== removedNewPlayer._id)
        );
  };
  // const handleRemoveNewPlayerUpd = (removedNewPlayer) => {
  //   // Remove the selected player
  //   setUpdNewPlayer((prevPlayers) =>
  //     prevPlayers.filter((player) => player._id !== removedNewPlayer._id)
  //   );
  // };
  const dragable = {
    height: "300px",
  };
  const { t } = useTranslation();
  return (
    <>
      <MainDrawer>
        <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {id ? (
            <Title
              title={t("Update Flight")}
              description={t("Updated Flight")}
            />
          ) : (
            <Title title={t("Add Flight")} description={t("Add Flight")} />
          )}
        </div>
        <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
          <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Latest Update")} />
                    <div className="col-span-8 sm:col-span-4 relative">
                      <InputArea
                        label={t("Latest Update")}
                        name="updatedAt"
                        type="text"
                        disabled={true}
                        className="w-1/2"
                        value={latestUpdate}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    {/* <Button
                      onClick={() => setChoosing((prev) => !prev)}
                      className="h-12 bg-white w-full text-black-500 hover:bg-red-50 hover:border-red-100 hover:text-black-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-black-700"
                      layout="outline"
                    >
                      {t("Choose Player")}
                    </Button> */}
                    {!id ? (
                      <>
                        <LabelArea label={t("Players")} />
                        <div className="col-span-8 sm:col-span-4">
                          <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="grid grid-cols-2 gap-4">
                              <Droppable
                                droppableId="players"
                                direction="horizontal"
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={dragable}
                                    className="w-80 overflow-y-scroll border border-dashed border-gray-150 p-2"
                                  >
                                    {newPlayer.map((player, index) => (
                                      <Draggable
                                        key={player?.customer_id?._id}
                                        draggableId={player?.customer_id?._id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <div
                                            className="player-card "
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            onClick={() => {
                                              handleRemoveNewPlayer(player);
                                              handlePlayerClick(player);
                                            }} // Handle player click
                                            style={playerCardStyle}
                                          >
                                            <Avatar
                                              className=""
                                              src={
                                                player?.customer_id?.avatar
                                                  ?.path
                                              }
                                              size="small"
                                            />
                                            <span className="text-white">
                                              {" "}
                                              {player?.customer_name}
                                            </span>
                                            <p className="text-yellow-300">
                                              <span>
                                                VGA: {player?.customer_vga_num}
                                              </span>{" "}
                                              <span>
                                                HDC: {player?.customer_hdc_num}
                                              </span>
                                            </p>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}

                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                              <Droppable
                                droppableId="selectedPlayers"
                                direction="horizontal"
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={dragable}
                                    className="w-full overflow-y-scroll border border-dashed border-gray-300 p-2"
                                  >
                                    
                                    <Controller
                                      name="players"
                                      control={control}s
                                      defaultValue={[]}
                                      render={({ field: { onChange, onBlur, value } }) => (
                                        <>
                                          <DraggableController
                                          player={player}
                                          handleRemovePlayer={handleRemovePlayer}
                                          handleReturnPlayerClick={handleReturnPlayerClick}
                                          playerCardStyle={playerCardStyle}
                                          closeButtonStyle={closeButtonStyle}
                                          />
                                          {provided.placeholder}
                                        </>
                                      )}
                                    />
                                  </div>
                                )}
                              </Droppable>
                            </div>
                            <Error errorName={errors.players} />
                          </DragDropContext>
                        </div>
                      </>
                    ) : (
                      <>
                        <LabelArea label={t("Players")} />
                        <div className="col-span-8 sm:col-span-4">
                          <Button
                            onClick={() => {
                              setChoosing((prev) => !prev);
                              resetNewPlayer();
                            }}
                            className="h-12 bg-white w-full text-black-500 hover:bg-red-50 hover:border-red-100 hover:text-black-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-black-700"
                            layout="outline"
                          >
                            {t("Choose Player")}
                          </Button>
                          {isChoosing && (
                            <DragDropContext onDragEnd={handleDragEnd}>
                              <div className="grid grid-cols-2 gap-4">
                                <Droppable
                                  droppableId="players"
                                  direction="horizontal"
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      style={dragable}
                                      className="w-full overflow-y-auto border border-dashed border-gray-300 p-2"
                                    >
                                      {updNewPlayer.map((player, index) => (
                                        <Draggable
                                          key={player?.customer_id?._id}
                                          draggableId={player?.customer_id?._id}
                                          index={index}
                                        >
                                          {(provided) => (
                                            <div
                                              className="player-card"
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              onClick={() => {
                                                handleRemoveNewPlayer(player);
                                                handlePlayerClick(player);
                                              }} // Handle player click
                                              style={playerCardStyle}
                                            >
                                              <Avatar
                                                className=""
                                                src={
                                                  player?.customer_id?.avatar
                                                    ?.path
                                                }
                                                size="small"
                                              />
                                              <span className="text-white">
                                                {" "}
                                                {player?.customer_name}
                                              </span>
                                              <p className="text-yellow-300">
                                                <span>
                                                  VGA:{" "}
                                                  {player?.customer_vga_num}
                                                </span>{" "}
                                                <span>
                                                  HDC:{" "}
                                                  {player?.customer_hdc_num}
                                                </span>
                                              </p>
                                            </div>
                                          )}
                                        </Draggable>
                                      ))}

                                      {provided.placeholder}
                                    </div>
                                  )}
                                </Droppable>

                                <Droppable
                                  droppableId="selectedPlayers"
                                  direction="horizontal"
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.droppableProps}
                                      style={dragable}
                                      className="w-full overflow-y-auto border border-dashed border-gray-300 p-2"
                                    >
                                      <Controller
                                        name="players"
                                        control={control}
                                        defaultValue={[]}
                                        render={({ field }) => (
                                          <>
                                            <DraggableController
                                              player={player}
                                              handleRemovePlayer={
                                                handleRemovePlayer
                                              }
                                              handleReturnPlayerClick={
                                                handleReturnPlayerClick
                                              }
                                              playerCardStyle={playerCardStyle}
                                              closeButtonStyle={
                                                closeButtonStyle
                                              }
                                            />
                                            {provided.placeholder}
                                          </>
                                        )}
                                      />
                                    </div>
                                  )}
                                </Droppable>
                              </div>
                              <Error errorName={errors.players} />
                            </DragDropContext>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Flight")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label={t("flight")}
                        name="flight"
                        type="number"
                        placeholder={t("Flight Number")}
                        autoFocus={true}
                        required={true}
                        pattern="[0-9]*"
                      />
                      <Error errorName={errors.flight} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Hole Number")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label={t("Hole Number")}
                        name="hole"
                        type="text"
                        placeholder={t("Hole Number")}
                        autoFocus={true}
                        required={true}
                      />
                      <Error errorName={errors.hole} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
                    <LabelArea label={t("Start Date")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        type="datetime-local"
                        {...register("start_time", { required: true })}
                        name="start_time"
                        placeholder={t("Start Date")}
                        autoFocus={true}
                        required={false}
                        onChange={(e) => {
                          setValue("start_time", e.target.value);
                        }}
                        defaultValue={selectedDate}
                      />
                      <Error errorName={errors.start_time} />
                      <Error errorName={errors.start_date} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Status")} required />
                    <div className="col-span-8 sm:col-span-4">
                      <Select
                        // {...register("status")}
                        {...register(`status`, {
                          required: t(`Status is required!`),
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      >
                        {statusOptions.map((option) => (
                          <option key={option} value={option}>
                            {t(option)}{" "}
                          </option>
                        ))}
                        <option value="" defaultValue selected hidden>
                          {t("ONGOING")}{" "}
                        </option>
                      </Select>
                      <Error errorName={errors.status} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    {id ? (
                      <>
                        <LabelArea label={t("Players In This Flight")} />
                        <div className="col-span-8">
                          <table className="min-w-full">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left">
                                  {t("Name")}
                                </th>
                                <th className="px-4 py-2 text-left">
                                  {t("Email")}
                                </th>
                                <th className="px-4 py-2 text-left">
                                  {t("Phone")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {player.map((player) => (
                                <tr key={player?._id}>
                                  <td className="px-4 py-2">
                                    <Link
                                      to={`/customer/${player?.customer_id?._id}`}
                                      className="hover:underline hover:text-blue-500"
                                    >
                                      {player?.customer_name}
                                    </Link>
                                  </td>
                                  <td className="px-4 py-2">
                                    <a
                                      href={`mailto:${player?.customer_email}`}
                                      className="hover:underline hover:text-blue-500"
                                    >
                                      {player?.customer_email}
                                    </a>
                                  </td>
                                  <td className="px-4 py-2">
                                    <a
                                      href={`tel:${player?.customer_phone}`}
                                      className="hover:underline hover:text-blue-500"
                                    >
                                      {player?.customer_phone}
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <DrawerButton id={id} title={t("Flight")} />
              </form>
            </CardBody>
          </Card>
        </Scrollbars>
      </MainDrawer>
    </>
  );
};

export default FlightDrawer;

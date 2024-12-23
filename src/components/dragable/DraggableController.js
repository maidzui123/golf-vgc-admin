import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

const DraggableController = ({
  player,
  handleRemovePlayer,
  handleReturnPlayerClick,
  playerCardStyle,
  closeButtonStyle,
}) => {
  return (
    <>
      {player.map((selectedPlayer, index) => (
        <Draggable
          key={selectedPlayer?.customer_id?._id}
          draggableId={selectedPlayer?.customer_id?._id}
          index={index}
        >
          {(provided) => (
            <div
              className="player-card selected-player"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={playerCardStyle}
            >
              <button
                style={closeButtonStyle}
                onClick={() => {
                  handleRemovePlayer(selectedPlayer);
                  handleReturnPlayerClick(selectedPlayer);
                }}
              >
                X
              </button>
              <Avatar
                className=""
                src={selectedPlayer?.customer_id?.avatar?.path}
                size="small"
              />
              <span className="text-white">
                {" "}
                {selectedPlayer?.customer_name}
              </span>
              <p className="text-yellow-300">
                <span>VGA: {selectedPlayer?.customer_vga_num}</span>{" "}
                <span>HDC: {selectedPlayer?.customer_hdc_num}</span>
              </p>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
};
export default DraggableController;

import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import CityDrawer from "components/drawer/CityDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";

//internal import

const CityTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <CityDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={item?.title?.en}
                id={item._id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(item._id)}
              />
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.name}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {item?.description}
              </span>
            </TableCell>

           
            <TableCell className="text-center">
              <ShowHideButton id={item._id} status={item.status} />
              {/* {product.status} */}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={item._id}
                product={item}
                isCheck={isCheck}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={item?.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CityTable;

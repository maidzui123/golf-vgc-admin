import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import PaymentDrawer from "components/drawer/PaymentDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import ShowHideButton from "components/table/ShowHideButton";
import Tooltip from "components/tooltip/Tooltip";
import Status from "components/table/Status";
import useToggleDrawer from "hooks/useToggleDrawer";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { showingTranslateValue } from "utils/translate";
import Cleave from "cleave.js/react";

//internal import

const PaymentTable = ({ data, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const VND_CURRENCY = "VND";

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
          <PaymentDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="text-sm">{item?.order?.customer?.first_name || ""} {item?.order?.customer?.last_name || ""}</span>
            </TableCell>

            <TableCell className="text-center">
              <span className="text-sm">{item?.order?.customer?.vga_num || ""}</span>
            </TableCell>
            <TableCell className="text-center">
              <span className="text-sm">{item?.source}</span>
            </TableCell>
            <TableCell className=" text-center text-sm font-semibold text-orange-500">
              {Number(item?.amount || "").toLocaleString() + " " + VND_CURRENCY}
            </TableCell>
            <TableCell className="text-sm truncate max-w-lg">
              {item?.order?.description}
            </TableCell>
            <TableCell className="text-center">
              <Status status={item?.status} />
            </TableCell>

            {/* <TableCell className="text-right">
              <Link
                to={`/payment/${item._id}`}
                className="flex justify-end text-gray-400 hover:text-green-600"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("View")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PaymentTable;

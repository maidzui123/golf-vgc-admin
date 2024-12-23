import { Badge } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

const Status = ({ status }) => {
  const { t } = useTranslation();

  return (
    <>
      <span className="font-serif">
        {(status === "PENDING" || status === "Inactive") && (
          <Badge type="warning">{t(status)}</Badge>
        )}

        {status === "Waiting for Password Reset" && (
          <Badge type="warning">{t(status)}</Badge>
        )}
        {status === "Processing" && <Badge>{t(status)}</Badge>}
        {(status === "Delivered" || status === "Active") && (
          <Badge type="success">{t(status)}</Badge>
        )}
        {status === "Cancel" && <Badge type="danger">{t(status)}</Badge>}
        {status === `POS-Completed` && (
          <Badge className="dark:bg-teal-900 bg-teal-100">{t(status)}</Badge>
        )}

        {status === "Approved" && <Badge type="success">{t(status)}</Badge>}

        {status === "APPROVED" && <Badge type="success">{t(status)}</Badge>}

        {status === "show" && <Badge type="success">{t(status)}</Badge>}

        {status === "REGISTERING" && <Badge type="success">{t(status)}</Badge>}
        {status === "PAID" && <Badge type="success">{t(status)}</Badge>}

        {status === "UNPAID" && <Badge type="warning">{t(status)}</Badge>}

        {status === "FAILED" && <Badge type="danger">{t(status)}</Badge>}

        {status === "FULL" && <Badge type="warning">{t(status)}</Badge>}

        {status === "ONGOING" && <Badge type="warning">{t(status)}</Badge>}

        {status === "CLOSED" && <Badge type="danger">{t(status)}</Badge>}

        {status === "REJECTED" && <Badge type="danger">{t(status)}</Badge>}

        {status === "COMPLETED" && <Badge type="success">{t(status)}</Badge>}
      </span>
    </>
  );
};

export default Status;

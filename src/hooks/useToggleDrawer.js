import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";
import { useTranslation } from "react-i18next";

const useToggleDrawer = () => {
    const [serviceId, setServiceId] = useState("");
    const [allId, setAllId] = useState([]);
    const [title, setTitle] = useState("");
    const {t} = useTranslation();
    const { toggleDrawer,
        isDrawerOpen,
        isModalOpen,
        toggleModal,
        toggleBulkDrawer,
        toggleAcceptTickModal,
        toggleRejectTickModal,
    } = useContext(SidebarContext);

    const handleUpdate = (id) => {
        setServiceId(id);
        toggleDrawer();
    };

    const handleUpdateMany = (id) => {
        setAllId(id);
        toggleBulkDrawer();
    };

    const handleModalOpen = (id, title) => {
        setServiceId(id);
        toggleModal();
        setTitle(title);
    };

    const handleAcceptTickModalOpen = (id) => {
        setServiceId(id);
        toggleAcceptTickModal()
    }

    const handleRejectTickModalOpen = (id) => {
        setServiceId(id);
        toggleRejectTickModal()
    }

    useEffect(() => {
        if (!isDrawerOpen) {
            setServiceId();
        }
    }, [isDrawerOpen]);
    // Reset ID to undefined when Delete
    useEffect(() => {
        if (!isModalOpen) {
            setServiceId();
        }
    }, [isModalOpen]);
    const handleDeleteMany = async (id, products) => {
        setAllId(id);
        toggleModal();
        setTitle(t("Selected Products"));
    };

    return {
        title,
        allId,
        serviceId,
        handleUpdate,
        setServiceId,
        handleModalOpen,
        handleAcceptTickModalOpen,
        handleRejectTickModalOpen,
        handleDeleteMany,
        handleUpdateMany,
    };
};

export default useToggleDrawer;

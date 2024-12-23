import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import { SidebarContext } from "context/SidebarContext";
import useToggleDrawer from "hooks/useToggleDrawer";
import { memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiX } from "react-icons/fi";
import TickRequestServices from "services/TickRequestServices";
import { notifyError, notifySuccess } from "utils/toast";

const AcceptTickModal = ({ id, isModalOpenProps }) => {
    const { isAcceptTickModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
    const { t } = useTranslation()

    const { setServiceId } = useToggleDrawer();

    const handleAcceptTick = () => {
        if (!id) return;

        TickRequestServices.approveRequest(id)
            .then((res) => {
                setIsUpdate(true);
                notifySuccess(res.message);
            })
            .catch((err) => notifyError(err.message));
        closeModal();
        setServiceId();
    };

    return (
        <>
            <Modal isOpen={isModalOpenProps || isAcceptTickModalOpen} onClose={closeModal}>
                <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
                    <span className="flex justify-center text-4xl mb-6 text-green-500">
                        <FiCheck />
                    </span>
                    <h2 className="text-lg font-semibold mb-1">
                        {t("Do you want to allow this customer to be ticked?")}
                    </h2>
                    <p className="text-sm mt-4">
                        {t(
                            "After accepting, this customer's account will be upgraded!"
                        )}
                    </p>
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button
                        className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
                        layout="outline"
                        onClick={closeModal}
                    >
                        No, Keep It
                    </Button>
                    <Button onClick={handleAcceptTick} className="w-full sm:w-auto">
                        <FiCheck className='mr-2 text-lg' />
                        {t("ACCEPT")}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default memo(AcceptTickModal)
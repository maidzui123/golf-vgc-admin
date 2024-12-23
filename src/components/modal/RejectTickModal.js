import { Button, Label, Modal, ModalBody, ModalFooter, Textarea } from "@windmill/react-ui";
import { SidebarContext } from "context/SidebarContext";
import useToggleDrawer from "hooks/useToggleDrawer";
import { memo, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiX } from "react-icons/fi";
import TickRequestServices from "services/TickRequestServices";
import { notifyError, notifySuccess } from "utils/toast";

const RejectTickModal = ({ id, isModalOpenProps }) => {
    const { isRejectTickModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
    const [description, setDescription] = useState("")
    const { t } = useTranslation()

    const { setServiceId } = useToggleDrawer();

    const handleRejectTick = () => {
        if (description === "") {
            notifyError("Please provide a reason!")
            return;
        }
        // if (!id) return;

        TickRequestServices.rejectRequest(id, { description: description })
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
            <Modal isOpen={isModalOpenProps || isRejectTickModalOpen} onClose={closeModal}>
                <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
                    <span className="flex justify-center text-4xl mb-6 text-red-600">
                        <FiX />
                    </span>
                    <h2 className="text-lg font-semibold mb-1">
                        {t("Do you want to allow this customer to be ticked?")}
                    </h2>
                    <p className="text-sm mt-4">
                        {t(
                            "After canceling the request, this customer's account will not be changed!"
                        )}
                    </p>

                    <Label className="text-left ml-2 my-4 font-semibold">Please provide a reason:</Label>
                    <Textarea
                        className="mx-2"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4">
                    </Textarea>
                </ModalBody>
                <ModalFooter className="justify-center">
                    <Button
                        className="w-full sm:w-auto hover:bg-white hover:border-gray-50"
                        layout="outline"
                        onClick={closeModal}
                    >
                        CANCEL
                    </Button>
                    <Button onClick={handleRejectTick} className="w-full sm:w-auto" layout='__dropdownItem'>
                        <FiCheck className='mr-2 text-lg' />
                        {t("REJECT")}
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default memo(RejectTickModal)
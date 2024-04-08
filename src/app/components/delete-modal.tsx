// Importing Modal related components and Button from NextUI library for UI rendering
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { DeleteProps } from "../../../interfaces";

// The Delete component is used to confirm the deletion action. It receives its props according to the DeleteProps interface.
export default function Delete({
  isOpen, 
  onClose, 
  onConfirm, 
  hasMessages, 
}: DeleteProps) {
  return (
    // Modal component from NextUI, used here to create a dialog box for confirmation
    <Modal
      backdrop="blur" 
      isOpen={isOpen} 
      onClose={onClose} 
      placement="center" 
      className="m-8 bg-gray-500/20 text-white/90 backdrop-blur-md" 
    >
      <ModalContent>
        {/*   Container for the content of the modal */}
        <ModalHeader className="flex flex-col gap-1">
          Confirm Action 
        </ModalHeader>
        <ModalBody>       
          <p>
            {hasMessages
              ? "Are you sure you want to delete the conversation?" 
              : "Nothing to delete."}
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose} className="text-white">
            Cancel 
          </Button>
          {hasMessages && ( 
            <Button color="danger" onPress={onConfirm} className="bg-red-500/70">
              Delete
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

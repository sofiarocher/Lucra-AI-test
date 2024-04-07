// Importing Modal related components and Button from NextUI library for UI rendering
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
// Importing the DeleteProps interface for TypeScript type checking
import { DeleteProps } from "../../../interfaces";

// The Delete component is used to confirm the deletion action. It receives its props according to the DeleteProps interface.
export default function Delete({
  isOpen, // Boolean to control the visibility of the modal
  onClose, // Function to call when the modal needs to be closed
  onConfirm, // Function to call when the deletion is confirmed
  hasMessages, // Boolean to check if there are messages to delete
}: DeleteProps) {
  return (
    // Modal component from NextUI, used here to create a dialog box for confirmation
    <Modal
      backdrop="blur" // Adds a blur effect to the background when the modal is open
      isOpen={isOpen} // Controls the visibility of the modal based on the isOpen prop
      onClose={onClose} // Specifies the function to call when the modal needs to be closed
      placement="center" // Centers the modal on the screen
      className="m-8" // Adds margin to the modal for styling
    >
      <ModalContent>
        {/*   Container for the content of the modal */}
        <ModalHeader className="flex flex-col gap-1">
          {" "}
          {/* Header section of the modal */}
          Confirm Action {/* // Title displayed in the modal header */}
        </ModalHeader>
        <ModalBody>
          {" "}
          {/* // Body section of the modal, contains main content or message */}
          <p>
            {hasMessages
              ? "Are you sure you want to delete the conversation?" // Message shown when there are messages to delete
              : "Nothing to delete."}{" "}
            {/* // Message shown when there are no messages to delete */}
          </p>
        </ModalBody>
        <ModalFooter>
          {" "}
          {/* // Footer section of the modal, typically contains action buttons */}
          <Button color="default" variant="light" onPress={onClose}>
            Cancel {/* // Button to cancel the action and close the modal */}
          </Button>
          {hasMessages && ( // Conditionally renders the Delete button if there are messages
            <Button color="danger" onPress={onConfirm}>
              Delete
              {/*  // Button that triggers the onConfirm function to delete the conversation */}
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

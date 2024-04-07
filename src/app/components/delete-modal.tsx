import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type DeleteProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hasMessages: boolean;
};

export default function Delete({ isOpen, onClose, onConfirm, hasMessages }: DeleteProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} placement="center" className="m-8">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Confirm Action</ModalHeader>
        <ModalBody>
          {hasMessages ? (
            <p>Are you sure you want to delete the conversation?</p>
          ) : (
            <p>Nothing to delete.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Cancel
          </Button>
          {hasMessages && (
            <Button color="danger" onPress={onConfirm}>
              Delete
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

import React from "react";
import {
  Box,
  Text,
  IconButton,
  VStack,
  HStack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

const NoteCard = ({ note, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  const handleDelete = async () => {
    await onDelete(note.id);
    onClose();
  };

  return (
    <>
      <Box
        p={4}
        boxShadow="md"
        borderRadius="md"
        borderWidth="1px"
        borderColor="gray.200"
        maxW="sm"
        mb={4}
      >
        <VStack align="start">
          <Text fontWeight="bold" fontSize="lg">
            {note.title}
          </Text>
          <Text>{note.description}</Text>
          <Text fontSize="sm" color="gray.500">
            {note.date}
          </Text>
        </VStack>
        <HStack justify="end" spacing={2} mt={2}>
          <IconButton
            aria-label="Delete note"
            icon={<DeleteIcon />}
            size="sm"
            onClick={onOpen}
          />
        </HStack>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Note
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

NoteCard.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default NoteCard;

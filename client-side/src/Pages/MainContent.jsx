import { useEffect, useState } from "react";
import { Box, Button, Center, Grid, Text } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import AddNote from "./AddNote";
import NoteCard from "./NoteCard";
import { db } from "../Components/firebaseConfig"; 
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function MainContent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    };

    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
    setNotes(notes.filter((note) => note.id !== id));
    toast.success("Note deleted successfully");
  };


  const handleSave = async (newNote) => {
    if (currentNote) {
      const noteRef = doc(db, "notes", currentNote.id);
      await updateDoc(noteRef, newNote);
      setNotes(notes.map((n) => (n.id === currentNote.id ? { ...n, ...newNote } : n)));
      toast.success("Note updated successfully");
    } else {
      const docRef = await addDoc(collection(db, "notes"), newNote);
      setNotes([...notes, { id: docRef.id, ...newNote }]);
      toast.success("Note added successfully");
    }
    setCurrentNote(null);
    onClose();
  };

  return (
    <Box className="main-content" p={4} position="relative">
      <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={4}>
        {notes.length === 0 ? (
          <Center>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              Please Add Some Notes by clicking the Add Note button!
            </Text>
          </Center>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={handleDelete}
            />
          ))
        )}
      </Grid>
      <Button
        colorScheme="teal"
        position="absolute"
        bottom="16px"
        right="16px"
        onClick={() => {
          setCurrentNote(null);
          onOpen();
        }}
      >
        Add Note
      </Button>
      <AddNote isOpen={isOpen} onClose={onClose} onSave={handleSave} initialData={currentNote} />
      <ToastContainer />
    </Box>
  );
}

export default MainContent;

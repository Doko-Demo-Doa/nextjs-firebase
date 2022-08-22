import { Container, LoadingOverlay, SimpleGrid } from "@mantine/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, deleteDoc, doc } from "firebase/firestore";

import { firestoreDB } from "../../firebase/client-app";

import AddNoteAction from "../add-note-action/add-note-action";
import NoteCard from "./note-card";

const NoteList = () => {
  const dbRef = collection(firestoreDB, "notes");
  const [values, loading, error, snapshot] = useCollectionData(dbRef, {
    snapshotListenOptions: { includeMetadataChanges: false },
  });

  async function delNote(docId: string) {
    await deleteDoc(doc(dbRef, docId));
  }

  return (
    <Container>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      {!loading && !error && (
        <SimpleGrid
          breakpoints={[
            { minWidth: "sm", cols: 2 },
            { minWidth: "md", cols: 2 },
            { minWidth: "lg", cols: 3 },
          ]}
        >
          <AddNoteAction />

          {snapshot?.docs?.map((n, idx) => (
            <NoteCard
              key={idx}
              title={n.data().title}
              content={n.data().content}
              onDelete={() => {
                delNote(n.id);
              }}
            />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default NoteList;

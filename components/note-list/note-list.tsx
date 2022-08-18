import {
  Container,
  Card,
  Image,
  Text,
  Button,
  Group,
  LoadingOverlay,
  SimpleGrid,
} from "@mantine/core";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";

import { firestoreDB } from "../../firebase/client-app";
import AddNoteAction from "../add-note-action/add-note-action";

const NoteList = () => {
  const [values, loading, error] = useCollectionData(
    collection(firestoreDB, "notes"),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  return (
    <Container>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      {!loading && !error && (
        <SimpleGrid cols={3}>
          <AddNoteAction />

          {values?.map((n, idx) => (
            <Card key={idx} shadow="sm" p="lg" radius="md" withBorder>
              <Card.Section>
                <Image
                  src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                  height={160}
                  alt="Norway"
                />
              </Card.Section>

              <Group position="apart" mt="md" mb="xs">
                <Text weight={600} size="lg">
                  {n.title}
                </Text>
              </Group>

              <Text
                size="sm"
                color="dimmed"
                align="match-parent"
                inline={false}
                lineClamp={5}
                sx={{ height: "6rem", textOverflow: "ellipsis" }}
              >
                {n.content}
              </Text>

              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Edit
              </Button>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export default NoteList;

import {
  Card,
  Text,
  Center,
  Stack,
  Modal,
  TextInput,
  Textarea,
  Button,
  Space,
  Group,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconPlaylistAdd } from "@tabler/icons";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

import { firestoreDB } from "../../firebase/client-app";

const postConverter: FirestoreDataConverter<PostType> = {
  toFirestore(post: WithFieldValue<PostType>): DocumentData {
    return { title: post.title, content: post.content };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PostType {
    const data = snapshot.data(options);
    return {
      title: data.title,
      content: data.content,
    };
  },
};

const AddNoteAction = () => {
  const [opened, handlers] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: "",
      content: "",
    },
    validate: {
      title: (value) => {
        if (!value) return true;
        if (value.length < 1) return true;
        return false;
      },
      content: (value) => {
        if (!value) return true;
        if (value.length < 1) return true;
        return false;
      },
    },
  });

  const ref = collection(firestoreDB, "notes").withConverter(postConverter);
  const [data, loading, error] = useCollectionData(ref);

  async function addNote(title: string, content?: string) {
    const docRef = await addDoc(ref, {
      title,
      content,
    });
    if (docRef.id) {
      handlers.close();
    }
  }

  return (
    <>
      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        sx={{ cursor: "pointer", userSelect: "none" }}
        onClick={handlers.open}
      >
        <Center>
          <Stack>
            <IconPlaylistAdd size={120} />
            <Text size="xl">Add new note</Text>
          </Stack>
        </Center>
      </Card>

      <Modal
        opened={opened}
        onClose={() => handlers.close()}
        title={<Text weight={"bold"}>Create/Edit note</Text>}
      >
        <form
          onSubmit={form.onSubmit((values) =>
            addNote(values.title, values.content)
          )}
        >
          <TextInput
            label="Note title"
            placeholder="Should be a quick description of your note"
            maxLength={120}
            disabled={loading}
            {...form.getInputProps("title")}
          />
          <Textarea
            mt="md"
            label="Content"
            placeholder="Your note content here"
            maxLength={2000}
            maxRows={8}
            autosize
            disabled={loading}
            {...form.getInputProps("content")}
          />

          <Space h="lg" />
          <Group>
            <Button
              fullWidth
              variant="gradient"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              type="submit"
              loading={loading}
            >
              Save
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddNoteAction;

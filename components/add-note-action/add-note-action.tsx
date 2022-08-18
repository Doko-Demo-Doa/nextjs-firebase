import { Card, Text, Center, Stack } from "@mantine/core";
import { IconPlaylistAdd } from "@tabler/icons";

const AddNoteAction = () => {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder sx={{ cursor: "pointer" }}>
      <Center>
        <Stack>
          <IconPlaylistAdd size={120} />
          <Text size="xl">Add new note</Text>
        </Stack>
      </Center>
    </Card>
  );
};

export default AddNoteAction;

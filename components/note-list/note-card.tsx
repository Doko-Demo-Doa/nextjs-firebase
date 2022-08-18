import {
  Card,
  Image,
  Text,
  Button,
  Group,
  Popover,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons";

interface Props {
  title: string;
  content?: string;
  onDelete?: (docId: string) => void | undefined;
}

const NoteCard: React.FC<Props> = ({ title, content, onDelete }) => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={600} size="lg">
          {title}
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
        {content}
      </Text>

      <Group align="center" position="center" grow>
        <Button variant="light" color="blue" radius="md">
          Edit
        </Button>

        <Popover
          opened={opened}
          width={280}
          position="bottom"
          withArrow
          shadow="md"
        >
          <Popover.Target>
            <Button
              variant="gradient"
              gradient={{ from: "orange", to: "red" }}
              leftIcon={<IconTrash />}
              onClick={handlers.open}
            >
              Delete
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Stack>
              <Text size="sm">Are you sure you want to delete this note?</Text>

              <Group>
                <Button
                  variant="light"
                  radius="md"
                  color="red"
                  onClick={() => {
                    handlers.close();
                  }}
                >
                  No, wait
                </Button>

                <Button
                  variant="light"
                  color="blue"
                  radius="md"
                  onClick={() => {
                    handlers.close();
                    onDelete?.("");
                  }}
                >
                  Go on, delete
                </Button>
              </Group>
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Card>
  );
};

export default NoteCard;

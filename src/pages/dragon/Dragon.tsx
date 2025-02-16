import { ReactNode, useEffect } from "react";
import { useAppStore } from "../../store/app.store";
import { Box, Button, Card, Container, Image, Loader, SimpleGrid, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

const Dragon = () => {
  const { dragons, isLoading, error, fetchDragons } = useAppStore();

  useEffect(() => {
    fetchDragons();
  }, [fetchDragons]);
  let content: ReactNode;
  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <Text c="red">{error}</Text>;
  } else {
    content = dragons?.map((dragon) => {
      return (
        <Card shadow="sm" padding="lg" radius="md" withBorder key={dragon.id}>
          <Card.Section>
            <Image src={dragon.flickr_images[0]} height={250} alt="dragon" />
          </Card.Section>

          <Text size="sm" color="dimmed" lineClamp={3}>
            {dragon.description}
          </Text>

          <Button
            component={Link}
            to={`/dragons/${dragon.id}`}
            fullWidth
            mt="md"
            radius="md"
          >
            Learn more
          </Button>
        </Card>
      );
    });
  }

   return (
      <Container size="xl" py="xl">
        <Box
          sx={(theme) => ({
            textAlign: "center",
            padding: theme.spacing.xl,
          })}
        >
          <Title order={1} size={"4rem"} weight={400} transform="uppercase">
            Dragons
          </Title>
        </Box>
        <SimpleGrid
          cols={2}
          breakpoints={[
            { maxWidth: "md", cols: 2 }, // 2 columns on medium screens
            { maxWidth: "sm", cols: 1 }, // 1 column on small screens
          ]}
        >
          {content}
        </SimpleGrid>
      </Container>
    );
};

export default Dragon;

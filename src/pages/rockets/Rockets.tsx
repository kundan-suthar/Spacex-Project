import {
  Box,
  Container,
  Loader,
  Text,
  Title,
  Button,
  Group,
  Card,
  Image,
  SimpleGrid,
} from "@mantine/core";
import { ReactNode, useEffect } from "react";
import { useAppStore } from "../../store/app.store";
import { Link } from "react-router-dom";

const Rockets = () => {
  const { rockets, isLoading, error, fetchRockets } = useAppStore();

  useEffect(() => {
    fetchRockets();
  }, [fetchRockets]);
  let content: ReactNode;

  if (isLoading){
    content =  <Loader />;
  }else if (error) {
    content = <Text c="red">{error}</Text>;
  }else{
    content = rockets?.map((rocket) => {
      return (
        <Card shadow="sm" padding="lg" radius="md" withBorder key={rocket.id}>
          <Card.Section>
            <Image
              src={rocket.flickr_images[0]}
              height={250}
              alt="Norway"
            />
          </Card.Section>
  
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{rocket.name}</Text>
          </Group>
  
          <Text size="sm" color="dimmed" lineClamp={3}>
              {rocket.description}
          </Text>
  
          <Button component={Link} to={`/rockets/${rocket.id}`}   fullWidth mt="md" radius="md">
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
          Rockets
        </Title>
      </Box>
      <SimpleGrid
        cols={3}
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

export default Rockets;

import React, { useEffect } from "react";
import { useAppStore } from "../store/app.store";
import {
  Loader,
  Text,
  Container,
  Title,
  Box,
  Flex,
  Space,
  Button,
  rem,
} from "@mantine/core";
import { Link } from "react-router-dom";

const RocketList = () => {
  const { rockets, isLoading, error, fetchRockets } = useAppStore();

  useEffect(() => {
    fetchRockets();
  }, [fetchRockets]);
  console.log(rockets);

  if (isLoading) return <Loader />;
  if (error) return <Text c="red">{error}</Text>;
  let content = rockets?.[0] && (
    <Container size="xl" py="xl">
      <Box sx={(theme) => ({
            textAlign: "center",
            padding: theme.spacing.xl,
          })}>
        <Title order={1} size={"4rem"} weight={400} transform="uppercase">
          {rockets[0].name}
        </Title>
      </Box>
      <Flex direction="column" align="center" justify="space-between" gap="sm">
        <Box
          sx={(theme) => ({
            textAlign: "center",
            padding: theme.spacing.xl,
          })}
        >
          <Title order={1} size={"4rem"} weight={600} transform="uppercase">
            {rockets[0].diameter.meters} meter
          </Title>
          <Text size={"1.5rem"} weight={400} transform="uppercase">
            Diameter
          </Text>
        </Box>
        <Box
          sx={(theme) => ({
            textAlign: "center",
            padding: theme.spacing.xl,
          })}
        >
          <Title order={1} size={"4rem"} weight={600} transform="uppercase">
            {rockets[0].height.meters} meter
          </Title>
          <Text size={"2rem"} weight={400} transform="uppercase">
            Height
          </Text>
        </Box>
        <Box
          sx={(theme) => ({
            textAlign: "center",
            padding: theme.spacing.xl,
          })}
        >
          <Title order={1} size={"4rem"} weight={600} transform="uppercase">
            {rockets[0].first_flight}{" "}
          </Title>
          <Text size={"2rem"} weight={400} transform="uppercase">
            First Flight
          </Text>
        </Box>
      </Flex>
      <Space h="xl" />
      <Space h="xl" />
      <Flex direction="row" align="center" justify="space-between" gap="xl">
        <Box>
          <Text>{rockets[0].description}</Text>
          <Box
            sx={(theme) => ({
              textAlign: "left",
              marginTop: "1rem",
            })}
          >
            <Button
              component={Link}
              to="/rockets"
              styles={(theme) => ({
                root: {
                  backgroundColor: "#ffffff",
                  color: "#000",
                  border: 0,
                  height: rem(42),
                  paddingLeft: rem(20),
                  paddingRight: rem(20),
                  marginTop: rem(42),
                  "&:not([data-disabled])": theme.fn.hover({
                    backgroundColor: theme.fn.darken("#000", 0.05),
                    color: theme.fn.lighten("#fff", 0.05),
                    outline: `2px solid ${theme.fn.lighten("#000", 0.3)}`,
                  }),
                },
              })}
            >
              View more
            </Button>
          </Box>
        </Box>
        <Box>
          <img src={rockets[0].flickr_images[0]} alt="" />
        </Box>
      </Flex>
     
      
    </Container>
  );
  return content;
};

export default RocketList;

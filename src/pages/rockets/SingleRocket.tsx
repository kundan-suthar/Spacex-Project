import React, { useEffect, useState } from "react";
import { useAppStore } from "../../store/app.store";
import { IconArrowLeft } from "@tabler/icons-react";

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import RocketImageGallery from "../../components/RocketImageGallery";

const SingleRocket = () => {
  const { singleRocket, isLoading, error, fetchSingleRocket } = useAppStore();
  const { id } = useParams();
  const [imperialUnit, setImperialUnit] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      fetchSingleRocket(id);
    }
  }, [id]);
  if (isLoading) return <Loader />;
  if (error) return <Text c="red">{error}</Text>;
  const handleUnitChange = () => {
    setImperialUnit((prev) => !prev);
  };
  return (
    <Container size="lg" py="xl">
      <Flex direction={"row"} align={Center} justify={"space-around"}>
        <Box sx={(theme) => ({
            paddingRight:"1rem",
           width:"400px"
          })}>
          <Title>{singleRocket?.name}</Title>
          <Text>Type: {singleRocket?.type}</Text>
          <Text>First Flight: {singleRocket?.first_flight}</Text>
          <Space h={"lg"} />
          <Flex direction="column" gap="md">
            <Box>
            <Flex>
              <Box>
                <Text>Cost per launch: {singleRocket?.cost_per_launch} $</Text>
                <Text>Company: {singleRocket?.company}</Text>
                <Text>Success Rate: {singleRocket?.success_rate_pct} %</Text>
                <Text c={singleRocket?.active ? "green" : "red"}>
                  {singleRocket?.active ? "Active" : "Inactive"}
                </Text>
              </Box>
              <Box>
                <Text>Country: {singleRocket?.country}</Text>
                <Text>stages: {singleRocket?.stages}</Text>
                <Text>
                  Height:{" "}
                  {imperialUnit
                    ? `${singleRocket?.height.meters} m`
                    : `${singleRocket?.height.feet} ft`}
                </Text>
                <Text>
                  Height:{" "}
                  {imperialUnit
                    ? `${singleRocket?.diameter.meters} m`
                    : `${singleRocket?.height.feet} ft`}
                </Text>
                <Text>
                  Height:{" "}
                  {imperialUnit
                    ? `${singleRocket?.mass.kg} kg`
                    : `${singleRocket?.mass.lb} lb`}
                </Text>
              </Box>
            </Flex>
            <Space h={"lg"} />
            <Box>{singleRocket?.description}</Box>
            <Space h={"lg"} />
            <Box>
              <Group>
                <Button
                  component="a"
                  target="_blank"
                  href={singleRocket?.wikipedia}
                  variant="white"
                >
                  Wiki
                </Button>
                <Button onClick={handleUnitChange} variant="white">
                  Toggle Imperial unit
                </Button>
                <Button
                  leftIcon={<IconArrowLeft />}
                  onClick={() => navigate(-1)}
                  variant="white"
                >
                  Back
                </Button>
              </Group>
            </Box>
            </Box>
            
          </Flex>
        </Box>
        <Box>
          <RocketImageGallery images={singleRocket?.flickr_images || []} />
        </Box>
      </Flex>
    </Container>
  );
};

export default SingleRocket;

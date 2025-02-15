import {
  Container,
  Title,
  Text,
  Button,
  Card,
  Image,
  Loader,
  Flex,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SpaceImg from "../../assets/imgs/space.jpg";

const fetchUpcomingLaunch = async () => {
  const response = await fetch(
    "https://api.spacexdata.com/v5/launches/upcoming"
  );
  const launches = await response.json();
  return launches.length > 0 ? launches[0] : null;
};

const Landing = () => {
  const { data: launch, isLoading } = useQuery(
    ["upcomingLaunch"],
    fetchUpcomingLaunch
  );

  return (
    <div>
      <div
      // style={{
      //   backgroundImage: "url('../../assets/imgs/space3.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   height:"100vh"
      // }}
      >
        <Container size="xl" py="xl">
          <Flex direction="column" align="center" justify="center">
            <Text  size="2rem" align="center" color="neutral.1">
              TAKING HUMAN TO SPACE 
            </Text>
            <Text size="sm" mt="md" color="dimmed" align="center">
            In 2020, SpaceX returned America's ability to fly NASA astronauts to and from the International Space Station on American vehicles for the first time since 2011. In addition to flying astronauts to space for NASA, SpaceX's Dragon spacecraft can also carry commercial astronauts to Earth orbit, the ISS or beyond.
            </Text>
          </Flex>
        </Container>
      </div>
      <Container>
        {/* Featured Launch Section */}
        <Flex direction="column" align="center" justify="center">
          <Title order={2} size="2rem" mb="lg">
            Upcoming Mission
          </Title>
          {isLoading ? (
            <Loader />
          ) : launch ? (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              style={{ textAlign: "center" }}
            >
              <Card.Section>
                <Image
                  src={
                    launch.links.patch.small ||
                    "https://via.placeholder.com/150"
                  }
                  height={150}
                  alt="Mission Patch"
                />
              </Card.Section>
              <Title order={3}>{launch.name}</Title>
              <Text size="sm" color="dimmed">
                Launch Date: {new Date(launch.date_utc).toLocaleDateString()}
              </Text>
              <Text mt="md">{launch.details || "No details available"}</Text>
              <Button
                component={Link}
                to={`/launch/${launch.id}`}
                mt="md"
                color="blue"
              >
                View Details
              </Button>
            </Card>
          ) : (
            <Text>No upcoming launches found.</Text>
          )}
        </Flex>
      </Container>
    </div>
  );
};

export default Landing;

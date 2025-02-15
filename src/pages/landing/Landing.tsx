import {
  Container,
  Title,
  Text,
  Button,
  Flex,
  Box,
  rem,
  MediaQuery,
} from "@mantine/core";

import { Link } from "react-router-dom";

import Starlink from "../../../public/assets/imgs/starlink.png";
import Astro from "../../../public/assets/imgs/astro3.png";
import classes from "../../styles/Landing.module.css";
import RocketList from "../../components/Rocketsection";

const Landing = () => {
  return (
    <main className={classes.hero}>
      <div
      // style={{
      //   backgroundImage: "url('../../assets/imgs/space3.jpg')",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   height:"100vh"
      // }}
      >
        <Container size="xl" py="xl">
          <Flex direction="row" align="center" justify="space-between" gap="xl">
            <Box
              sx={(theme) => ({
                maxWidth: "500px",
              })}
            >
              <Title size="2.5rem" order={2} align="left" color="neutral.1">
                TAKING HUMAN TO SPACE
              </Title>
              <Text size="sm" mt="md" color="dimmed" align="left">
                In 2020, SpaceX returned America's ability to fly NASA
                astronauts to and from the International Space Station on
                American vehicles for the first time since 2011. In addition to
                flying astronauts to space for NASA, SpaceX's Dragon spacecraft
                can also carry commercial astronauts to Earth orbit, the ISS or
                beyond.
              </Text>
              <Button
                component={Link}
                to={"/Launches"}
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
                Read More
              </Button>
            </Box>
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Box
                sx={{
                  position: "relative",
                  display: "inline-block", // Adjust based on layout needs
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "40%", // Adjust the height of the gradient effect
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.8) 100%)",
                    pointerEvents: "none", // Prevent interference with clicks
                  },
                }}
              >
                <img src={Astro} alt="astonaut" />
              </Box>
            </MediaQuery>
          </Flex>
        </Container>
      </div>
      <Container>
        {/* Featured Launch Section */}
        {/* <Flex direction="column" align="center" justify="center">
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
                {/* <Image
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
        </Flex> */}
      </Container>
      <Container size="xl" py="xl">
        <MediaQuery smallerThan="sm" styles={{ flexDirection: "column" }}>

        <Flex direction="row" align="center" justify="space-between" gap="xl">
          <Box>
            <img
              src={Starlink}
              alt="satelite starlink"
              width="100%"
              height="100%"
            />
          </Box>
          <Box>
            <Title size="2.5rem" order={2} align="left" color="neutral.1">
              STARLINK MISSION
            </Title>
            <Text size="sm" mt="md" color="dimmed" align="left">
              On Friday, March 24 at 11:33 a.m. ET, Falcon 9 launched 56
              Starlink satellites to low-Earth orbit from Space Launch Complex
              40 at Cape Canaveral Space Force Station, Florida.
            </Text>
            <Button
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
              Read More
            </Button>
          </Box>
        </Flex>
        </MediaQuery>
      </Container>
      <RocketList />
    </main>
  );
};

export default Landing;

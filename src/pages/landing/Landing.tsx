import { Container, Title, Text, Button, Card, Image, Loader, Flex } from "@mantine/core";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SpaceImg from '../../assets/imgs/space.jpg'

const fetchUpcomingLaunch = async () => {
  const response = await fetch("https://api.spacexdata.com/v5/launches/upcoming");
  const launches = await response.json();
  return launches.length > 0 ? launches[0] : null;
};

const Landing = () => {
  const { data: launch, isLoading } = useQuery(["upcomingLaunch"], fetchUpcomingLaunch);

  return (
    <div>
    <div 
    style={{
      backgroundImage: "url('../../assets/imgs/space3.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height:"100vh"
    }}>
      <Container  
        size="xl"
        py="xl">
        <Flex direction="column" align="center" justify="center">
    <Title order={1} size="3rem" align="center" color="primary.6">
      Your Ultimate Guide to SpaceX Launches 🚀
    </Title>
    <Text size="lg" mt="md" color="dimmed" align="center">
      Struggling to find accurate & real-time SpaceX launch information?
    </Text>
    <Text size="md" mt="sm" color="dimmed" align="center">
      Our website provides <b>real-time updates, mission details, and schedules</b> for all SpaceX launches. Get access to launch history, rocket details, and upcoming missions—all in one place.
    </Text>
    <Button component={Link} to="/launches" size="lg" mt="lg" color="blue">
      Explore Launches
    </Button>
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
      <Card shadow="sm" padding="lg" radius="md" style={{ textAlign: "center" }}>
        <Card.Section>
          <Image
            src={launch.links.patch.small || "https://via.placeholder.com/150"}
            height={150}
            alt="Mission Patch"
          />
        </Card.Section>
        <Title order={3}>{launch.name}</Title>
        <Text size="sm" color="dimmed">
          Launch Date: {new Date(launch.date_utc).toLocaleDateString()}
        </Text>
        <Text mt="md">{launch.details || "No details available"}</Text>
        <Button component={Link} to={`/launch/${launch.id}`} mt="md" color="blue">
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

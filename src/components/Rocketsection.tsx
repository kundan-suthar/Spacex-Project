import React, { useEffect } from "react";
import { useAppStore } from "../store/app.store";
import { Loader, Text, Container, Title } from "@mantine/core";

const RocketList = () => {
  const {rockets, isLoading, error, fetchRockets} = useAppStore()

  useEffect(() => {
    fetchRockets();
    
    
  }, [fetchRockets]);
  console.log(rockets);

  if (isLoading) return <Loader />;
  if (error) return <Text c="red">{error}</Text>;

  return (
    <Container>
      <Title order={2}>SpaceX Rockets</Title>
      {rockets?.map((rocket) => (
        <Text key={rocket.id}>{rocket.name}</Text>
      ))}
    </Container>
  );
};

export default RocketList;

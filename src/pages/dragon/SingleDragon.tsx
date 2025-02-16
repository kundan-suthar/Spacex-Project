import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/app.store';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Center, Container, Flex, Group, Loader, Space, Text, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import RocketImageGallery from '../../components/RocketImageGallery';

const SingleDragon = () => {

     const { singleDragon, isLoading, error, fetchSingleDragon } = useAppStore();
      const { id } = useParams();
      const [imperialUnit, setImperialUnit] = useState<boolean>(false);
      const navigate = useNavigate();
      useEffect(() => {
        if (id) {
            fetchSingleDragon(id);
        }
      }, [id]);

      if (isLoading) return <Loader />;
        if (error) return <Text c="red">{error}</Text>;
        const handleUnitChange = () => {
          setImperialUnit((prev) => !prev);
        };
        return (
            <Container size="lg" py="xl">
              <Flex
                direction={"row"}
                align={Center}
                justify={"space-around"}
                sx={(theme) => ({
                  [theme.fn.smallerThan("sm")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Box
                  sx={(theme) => ({
                    paddingRight: "1rem",
                    width: "400px",
                  })}
                >
                  <Title>{singleDragon?.name}</Title>
                  <Text>First Flight Date: {singleDragon?.first_flight}</Text>
                  {/* <Text>Dry Mass: {singleDragon?.dry_mass_kg}</Text> */}
                  <Space h={"lg"} />
                  <Flex direction="column" gap="md">
                    <Box>
                      <Flex
                        sx={(theme) => ({
                          [theme.fn.smallerThan("sm")]: {
                            flexDirection: "column",
                          },
                          justifyContent:"space-between"
                        })}
                      >
                        <Box>
                          <Text>
                            Type: {singleDragon?.type}
                          </Text>
                          <Text>Crew: {singleDragon?.crew_capacity}</Text>
                          <Text>Dry Mass: {singleDragon?.dry_mass_kg} kg</Text>
                          <Text c={singleDragon?.active ? "green" : "red"}>
                            {singleDragon?.active ? "Active" : "Inactive"}
                          </Text>
                        </Box>
                        <Box sx={(theme) => ({
                         
                          
                        })}>
                          <Text>Heat Shield Details</Text>
                          <Text>Material: {singleDragon?.heat_shield.material}</Text>
                          <Text>
                            Size: 
                            {singleDragon?.heat_shield.size_meters} m
                          </Text>
                          <Text>
                            Temprature:{" "}{singleDragon?.heat_shield.temp_degrees}
                          </Text>
                          <Text>
                            Dev Partner:{" "}{singleDragon?.heat_shield.dev_partner}
                          </Text>
                        </Box>
                      </Flex>
                      <Space h={"lg"} />
                      <Box>{singleDragon?.description}</Box>
                      <Space h={"lg"} />
                      <Box>
                        <Group>
                          <Button
                            component="a"
                            target="_blank"
                            href={singleDragon?.wikipedia}
                            variant="white"
                          >
                            Wiki
                          </Button>
                          {/* <Button onClick={handleUnitChange} variant="white">
                            Toggle Imperial unit
                          </Button> */}
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
                  <RocketImageGallery images={singleDragon?.flickr_images || []} />
                </Box>
              </Flex>
            </Container>
          );
  
}

export default SingleDragon

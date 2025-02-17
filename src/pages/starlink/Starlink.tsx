import React, { ReactNode, useEffect, useState } from 'react'
import { useAppStore } from '../../store/app.store';
import { Box, Container, Loader, Pagination, SimpleGrid, Text, Title } from '@mantine/core';

const Starlink = () => {
   const { starlinks, isLoading, error, fetchStarlinks } = useAppStore();

   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

   // Calculate pagination
   const totalPages = Math.ceil((starlinks?.length || 0) / itemsPerPage);
   const startIndex = (currentPage - 1) * itemsPerPage;
   const paginatedStarlinks = starlinks?.slice(startIndex, startIndex + itemsPerPage);
 
    useEffect(() => {
      fetchStarlinks();
    }, [fetchStarlinks]);
    let content: ReactNode;

     if (isLoading){
        content =  <Loader />;
      }else if (error) {
        content = <Text c="red">{error}</Text>;
      }else{
        content = paginatedStarlinks?.map((starlink)=>{
          const {id, version, spaceTrack} = starlink;
          return(
            <Box key={id}
            sx={(theme) => ({
              backgroundColor: theme.colors.gray[8],
              padding: theme.spacing.xl,
              color: theme.white,
              borderRadius: theme.radius.md, // Medium corner radius
              boxShadow: theme.shadows.md, // Adds some shadow for depth
            })}
            >
              
              <Title order={2} size={"1.5rem"}>{spaceTrack.OBJECT_NAME}, {version}</Title>
              <Text size={"1rem"}> Launch Date: {spaceTrack.LAUNCH_DATE}</Text>
              <Text size={"1rem"}>Launch Site: {spaceTrack.SITE}</Text>
            </Box>
          )
        })
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
                Starlinks
              </Title>
            </Box>
            <SimpleGrid
              cols={4}
              breakpoints={[
                { maxWidth: "md", cols: 2 }, // 2 columns on medium screens
                { maxWidth: "sm", cols: 1 }, // 1 column on small screens
              ]}
            >
              {content}
            </SimpleGrid>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Box mt="xl" sx={{ display: "flex", justifyContent: "center" }}>
                <Pagination total={totalPages} value={currentPage} onChange={setCurrentPage} />
              </Box>
            )}
          </Container>
        );
}

export default Starlink

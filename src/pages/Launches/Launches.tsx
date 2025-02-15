import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Center, Container, Pagination, Table, Title } from "@mantine/core";

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  links: {
    webcast: string;
  };
};

const fetchLaunches = async (): Promise<Launch[]> => {
  const { data } = await axios.get<Launch[]>(
    "https://api.spacexdata.com/v4/launches"
  );
  return data;
};

const Launches = () => {
  const { data, error, isLoading } = useQuery<Launch[]>({
    queryKey: ["launches"],
    queryFn: fetchLaunches,
  });
  const [activePage, setActivePage] = useState(1);
  const pageSize = 10;
   // Pagination Logic
   const startIndex = (activePage - 1) * pageSize;
   const endIndex = startIndex + pageSize;
   const paginatedData = data?.slice(startIndex, endIndex);

console.log(data);

  if (isLoading) return <p>Loading launches...</p>;
  if (error instanceof Error)
    return <p>Error fetching data: {error.message}</p>;
  const rows = paginatedData?.map((launch) => (
    <tr key={launch.id}>
      <td>{launch.name}</td>
      <td>{new Date(launch.date_utc).toLocaleDateString()}</td>
      <td>{launch.success ? "Success" : "Failure"}</td>
      <td>
        <a
          href={launch.links.webcast}
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Launch
        </a>
      </td>
    </tr>
  ));

  return (
    <Container>
      <Title order={1} ta="center" my={20}>
        SpaceX Launches
      </Title>
      <Table verticalSpacing={"lg"} striped={true} withBorder={true}>
        <thead>
          <tr>
            <th>Launch Name</th>
            <th>Launch Date</th>
            <th>Launch status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Center my={20}>
        <Pagination total={Math.ceil((data?.length || 0) / pageSize)} value={activePage} onChange={setActivePage} />
      </Center>
    </Container>
  );
};

export default Launches;

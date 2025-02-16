import { ReactNode, useEffect, useState } from "react";
import {
  Center,
  Container,
  Flex,
  Loader,
  Pagination,
  Select,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useAppStore } from "../../store/app.store";

const Launches = () => {
  const { launches, isLoading, error, fetchLaunches } = useAppStore();
    useEffect(() => {
      fetchLaunches();
    }, [fetchLaunches]);
    console.log(launches);
    
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("All");
console.log(searchQuery);
console.log(statusFilter);

  // Select options with "All"
  const statusOptions = ["All", "Success", "Failure"];
  // Apply Filters
  const filteredData = launches
    ?.filter((launch) =>
      launch.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((launch) =>
      statusFilter === "All"
        ? true
        : statusFilter === "Success"
        ? launch.success === true
        : launch.success === false
    );

  const [activePage, setActivePage] = useState(1);
  const pageSize = 10;
  // Pagination Logic
  const startIndex = (activePage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData?.slice(startIndex, endIndex);

  let content: ReactNode;

  if (isLoading) {
    content = <Loader />;
  } else if (error) {
    content = <Text c="red">{error}</Text>;
  } else {
    content = paginatedData?.map((launch) => (
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
  }

  return (
    <Container>
      <Title order={1} ta="center" my={20}>
        SpaceX Launches
      </Title>
      {/* Filters */}
      <Flex justify="start" wrap="wrap" mb={20} gap="md">
        <TextInput
          placeholder="Search by Launch Name"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <Select
          placeholder="Filter by Status"
          data={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
      </Flex>

      <Table verticalSpacing={"lg"} striped={true} withBorder={true}>
        <thead>
          <tr>
            <th>Launch Name</th>
            <th>Launch Date</th>
            <th>Launch status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
      <Center my={20}>
        <Pagination
          total={Math.ceil((filteredData?.length || 0) / pageSize)}
          value={activePage}
          onChange={setActivePage}
        />
      </Center>
    </Container>
  );
};

export default Launches;

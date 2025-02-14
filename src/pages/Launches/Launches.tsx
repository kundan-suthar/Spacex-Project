import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  links: {
    webcast: string;
  };
};

const fetchLaunches = async (): Promise<Launch[]> => {
  const { data } = await axios.get<Launch[]>("https://api.spacexdata.com/v4/launches");
  return data;
};

const Launches = () => {
  const { data, error, isLoading } = useQuery<Launch[]>({ queryKey: ["launches"], queryFn: fetchLaunches });

  if (isLoading) return <p>Loading launches...</p>;
  if (error instanceof Error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <ul>
        {data?.map((launch) => (
          <li key={launch.id}>
            <h3>{launch.name}</h3>
            <p>Date: {new Date(launch.date_utc).toLocaleDateString()}</p>
            <p>Rocket: {launch.rocket}</p>
            <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">Watch Launch</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Launches

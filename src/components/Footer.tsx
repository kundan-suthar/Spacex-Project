import { Anchor, Center, Container, Group, Space, Text } from '@mantine/core'
import React from 'react'
import SpaceXlogo from "../../public/assets/imgs/Group 2.svg"

import classes from "../styles/HeaderMegaMenu.module.css";
// / SpaceX Social Links
const socialLinks = [
  { name: "Twitter", url: "https://twitter.com/SpaceX" },
  { name: "YouTube", url: "https://www.youtube.com/spacex" },
  { name: "Instagram", url: "https://www.instagram.com/spacex/" },
  { name: "Website", url: "https://www.spacex.com/" }
];


const FooterPage = () => {
  return (
    <Container >
        <Space h="xl" />
        <Space h="xl" />
        <Center>
            <img src={SpaceXlogo} alt="Logo"
              width="100"
              height="90"
              className={classes.logofooter} />
        </Center>
        <Space h="xl" />
        <Space h="xl" />
        <Group align='center' position='center'>
            {socialLinks.map((link) => (
              <Anchor color='white' key={link.name} href={link.url} underline={false} target="_blank" rel="noopener noreferrer">
                {link.name}
              </Anchor>
            ))}
          </Group>
          <Space h="lg" />
          <Center mt={10}>
          <Text size="sm">&copy; {new Date().getFullYear()} SpaceX. All rights reserved.</Text>
        </Center>
        <Space h="xl" />
    </Container>
  )
}

export default FooterPage

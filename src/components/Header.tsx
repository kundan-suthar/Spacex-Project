import {
  Anchor,
  Box,
  Burger,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  MediaQuery,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/HeaderMegaMenu.module.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import SpaceXLogo from "../../public/assets/imgs/Group 2.svg";

export function HeaderMegaMenu() {
  // Disclosure hooks for the Drawer and links
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <Box>
      <header className={classes.header}>
        <Group
          position="apart"
          style={{ height: "100%", paddingLeft: "20px", paddingRight: "20px" }}
        >
          <Link to="/">
            <img
              src={SpaceXLogo}
              alt="Logo"
              width="100"
              height="10"
              className={classes.logo}
            />
          </Link>

          {/* Only show this Group on screens >= "sm" */}

          {/* Only show these buttons on screens >= "sm" */}
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group spacing={"lg"}>
              <Anchor
                component={Link}
                to="/Launches"
                className={classes.link}
                type="button"
                underline={false}
              >
                Launches
              </Anchor>
              <Anchor
                component={Link}
                to="/rockets"
                className={classes.link}
                type="button"
                underline={false}
              >
                Rockets
              </Anchor>
              <Anchor
                component={Link}
                to="/dragons"
                className={classes.link}
                type="button"
                underline={false}
              >
                Dragon
              </Anchor>
             
             
              <SignedOut>
                <SignInButton>
                  <Button variant="default">Log in</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Group>
          </MediaQuery>

          {/* Show Burger only on smaller screens (hide on "sm" and larger) */}
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger opened={drawerOpened} onClick={toggleDrawer} />
          </MediaQuery>
        </Group>
      </header>

      {/* Wrap Drawer with MediaQuery so it only shows on screens smaller than "sm" */}
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          zIndex={1000000}
        >
          {/* Use style prop for custom heights if shorthand “h” causes issues */}
          <ScrollArea style={{ height: "calc(100vh - 80px)" }} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            {/* Update "justify" to "position" */}
            <Group position="center" grow pb="xl" px="md">
              <Button variant="default">Log in</Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </MediaQuery>
    </Box>
  );
}

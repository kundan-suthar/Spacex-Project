import {
  Anchor,
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  MediaQuery,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "../styles/HeaderMegaMenu.module.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import SpaceXLogo from "../../public/assets/imgs/Group 2.svg";
import { useEffect, useState } from "react";

export function HeaderMegaMenu() {
  // Disclosure hooks for the Drawer and links
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  
    const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box>
      <header className={`${classes.header} ${isFixed ? classes.fixed : ""}`}>
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
              <Anchor
                component={Link}
                to="/starlink"
                className={classes.link}
                type="button"
                underline={false}
              >
                StarLink
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
          title="SpaceX"
          zIndex={1000000}
        >
          {/* Use style prop for custom heights if shorthand “h” causes issues */}
          <ScrollArea style={{ height: "calc(100vh - 80px)" }} mx="-md">
            <Divider my="sm" />

            <Anchor
              component={Link}
              to="/"
              className={classes.link}
              type="button"
              underline={false}
              onClick={closeDrawer}
            >
              Home
            </Anchor>
            <Anchor
              component={Link}
              to="/Launches"
              className={classes.link}
              type="button"
              underline={false}
              onClick={closeDrawer}
            >
              Launches
            </Anchor>
            <Anchor
              component={Link}
              to="/rockets"
              className={classes.link}
              type="button"
              underline={false}
              onClick={closeDrawer}
            >
              Rockets
            </Anchor>
            <Anchor
              component={Link}
              to="/dragons"
              className={classes.link}
              type="button"
              underline={false}
              onClick={closeDrawer}
            >
              Dragon
            </Anchor>
            <Anchor
              component={Link}
              to="/starlink"
              className={classes.link}
              type="button"
              underline={false}
              onClick={closeDrawer}
            >
              StarLink
            </Anchor>

            <Divider my="sm" />

            
            <Group position="left"  pb="xl" px="md">
            <SignedOut>
                <SignInButton>
                  <Button variant="default">Log in</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <SignOutButton />
              </SignedIn>
            </Group>
          
          </ScrollArea>
        </Drawer>
      </MediaQuery>
    </Box>
  );
}

"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { usePathname } from "next/navigation";
import { AppShell, Box, Burger, NavLink, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FiAperture } from "react-icons/fi";
import { FaHome, FaImages } from "react-icons/fa";
import { MdAddPhotoAlternate } from "react-icons/md";

const SpacesNavBar = () => {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure(true);
  return (
    <AppShell
      navbar={{
        width: "200px",
        breakpoint: 0,
        collapsed: { desktop: !opened },
      }}
      padding="md"
      header={{ height: "60px" }}
    >
      <AppShell.Header
        className={styles.appshellColor}
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Burger
          opened={opened}
          onClick={toggle}
          visibleFrom="sm"
          size="sm"
          color="gold"
        />
        <Box style={{ display: "flex", marginRight: "20px" }}>
          <FiAperture size={40} title="Picture" color="gold" />
          <Title order={3} style={{ color: "gold" }}>
            Image Saver
          </Title>
        </Box>
      </AppShell.Header>
      <AppShell.Navbar p="md" className={styles.appshellColor}>
        <NavLink
          label="Home"
          component={Link}
          href="/"
          leftSection={<FaHome />}
        />
        <NavLink
          label="My Images"
          component={Link}
          href="/spaces-home"
          active={pathname === "/spaces-home"}
          color="green"
          variant="filled"
          leftSection={<FaImages />}
        />
        <NavLink
          label="Create Image"
          component={Link}
          href="/spaces-home/create-space"
          active={pathname === "/spaces-home/create-space"}
          color="green"
          variant="filled"
          leftSection={<MdAddPhotoAlternate />}
        />
      </AppShell.Navbar>
    </AppShell>
  );
};

export default SpacesNavBar;

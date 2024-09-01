"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { usePathname } from "next/navigation";
import { AppShell, Burger, NavLink } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FiAperture } from "react-icons/fi";

const SpacesNavBar = () => {
  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      navbar={{
        width: "150px",
        breakpoint: 0,
        collapsed: { desktop: !opened },
      }}
      padding="md"
      header={{ height: "60px" }}
    >
      <AppShell.Header className={styles.appshellColor}>
        <Burger opened={opened} onClick={toggle} visibleFrom="sm" size="sm" />
        <FiAperture size={40} title="Picture" color="black" />
      </AppShell.Header>
      <AppShell.Navbar p="md" className={styles.appshellColor}>
        <Link href="/" className={styles.navbarlink}>
          Home
        </Link>
        <Link
          className={
            pathname === "/spaces-home" ? styles.activelink : styles.navbarlink
          }
          href="/spaces-home"
        >
          My Spaces
        </Link>
        <Link
          className={
            pathname === "/spaces-home/create-space"
              ? styles.activelink
              : styles.navbarlink
          }
          href="/spaces-home/create-space"
        >
          Create Space
        </Link>
      </AppShell.Navbar>
    </AppShell>
  );
};

export default SpacesNavBar;

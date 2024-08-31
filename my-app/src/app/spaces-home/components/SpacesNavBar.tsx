"use client";

import Link from "next/link";
import styles from "../styles.module.css";
import { usePathname } from "next/navigation";
import { FaHome } from "react-icons/fa";

const SpacesNavBar = () => {
  const pathname = usePathname();
  return (
    <div
      style={{
        backgroundColor: "rgb(36, 63, 92)",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        color: "white",
        height: "5%",
      }}
    >
      <Link href="/" className={styles.navbarlink}>
        <FaHome />
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
    </div>
  );
};

export default SpacesNavBar;

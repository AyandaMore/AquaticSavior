"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const navigateToStart = () => {
    router.push("/fishTank");
  };

  return (
    <main className={styles.main}>
      <button onClick={navigateToStart}>Start</button>
    </main>
  );
}

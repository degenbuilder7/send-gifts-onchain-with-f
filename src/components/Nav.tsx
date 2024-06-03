import Image from "next/image";
import Link from "next/link";
import styles from "./Nav.module.css";
import { useEffect } from "react";

import { ConnectKitButton } from "connectkit";

export function Navbar() {

  
  return (
    <div className={styles.navContainer}>
      <nav className={styles.nav}>
        <div className={styles.navLeft}>
          <Link href="/" className={`${styles.homeLink} ${styles.navLeft}`}>
            Send onchain Gifts on Farcaster
          </Link>

          </div>

          <div className={styles.navMiddle}>
              <Link href="/claim" className={`${styles.homeLink} ${styles.navMiddle}`}>
                Claim
              </Link>
          </div>

        <div className={styles.navRight}>
          <div className={styles.navConnect}>
          <ConnectKitButton.Custom>
      {({ isConnected, isConnecting, show, hide, address, ensName, chain }) => {
        return (
          <button onClick={show}>
            {isConnected ? address : "Connect Wallet"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
          
          </div>
        </div>
      </nav>
    </div>
  );
}
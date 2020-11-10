import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const styles = {
    footer: {
      height: "30px",
      backgroundColor: "rgba(50,50,52)",
      flexShrink: 0,
      fontFamily: "'Roboto', sans-serif",
      fontWeight: 300,
    },
    title: {
        position: "absolute",
        bottom: "3%",
        left: "150px",
        transform: "translate(-50%, -50%)",
      },
};

function Footer() {
  return (
    <footer className="App-footer" style={styles.footer}>
      <h6 style={styles.title}>Benoît Clemenceau & Marin Neyret</h6>
    </footer>
  );
}

export default Footer;

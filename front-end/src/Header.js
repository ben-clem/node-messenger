import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const styles = {
  header: {
    height: "60px",
    backgroundColor: "rgba(50,50,52)",
    flexShrink: 0,
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 800,
  },
  title: {
    position: "absolute",
    top: "7%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  headerLogIn: {
    backgroundColor: "red",
  },
  headerLogOut: {
    backgroundColor: "blue",
  },
};

function Header() {
  return (
    <header className="App-header" css={styles.header}>
      <h1 css={styles.title}>FireChat 🔥</h1>
    </header>
  );
}

export default Header;

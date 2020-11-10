import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgb(28, 28, 28)",
    padding: "50px",
    color: "#fff",
    position: "absolute",
    height: "100%",
    width: "100%",
  },
};

function App() {
  return (
    <div className="App" css={styles.root}>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

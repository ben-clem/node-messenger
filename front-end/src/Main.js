import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Channels from "./Channels.js";
import Channel from "./Channel.js";

const styles = {
  main: {
    backgroundColor: "#373B44",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
};

function Main() {
  return (
    <main className="App-main" css={styles.main}>
      <Channels />
      <Channel />
    </main>
  );
}

export default Main;

import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Messages from "./Messages.js";
import MessageSend from "./MessageSend";

const styles = {
  channel: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
};

function Channel() {
  const channel = {
    name: "Fake channel",
  };

  return (
    <div css={styles.channel}>
      <Messages />
      <MessageSend />
    </div>
  );
}

export default Channel;

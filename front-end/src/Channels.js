import { useState } from "react";
import Axios from "axios";
/** @jsx jsx */
import { jsx, withEmotionCache } from "@emotion/core";

const styles = {
  channels: {
    minWidth: "200px",
    //borderRightStyle: "solid",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 400,
  },
  title: {
    position: "relative",
    left: "125px",
    top: "10px",
    transform: "translate(-50%, -50%)",
    fontSize: 16
  },
};

function Channels() {
  const [channels, setChannels] = useState([
    { id: 1, name: "Channel 1" },
    { id: 2, name: "Channel 2" },
    { id: 3, name: "Channel 3" },
  ]);
  //const { data } = Axios.get("http://localhost:3001/channels/");
  //setChannels([...channels, data]);

  return (
    <div css={styles.channels}>
      <p style={styles.title}>Available channels:</p>
      <ul>
        {channels.map((channel) => (
          <li key={channel.id} css={styles.channel}>
            {channel.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;

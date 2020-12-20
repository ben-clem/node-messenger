import { useContext, useEffect } from "react";
import axios from "axios";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import Link from "@material-ui/core/Link";
import Context from "./Context";
import { useHistory } from "react-router-dom";
import { useTheme, withStyles } from "@material-ui/core/styles";

const styles = {
  // root: {
  //   minWidth: '200px',
  // },
  channel: {
    padding: ".5rem .2rem .0rem .5rem",
    whiteSpace: "nowrap",
    fontSize: "115%",
  },
};

const ColorLink = withStyles((theme) => ({
  root: {
    color: "rgb(20, 120, 255)",
    cursor: "pointer",
  },
}))(Link);

export default () => {
  const { oauth, channels, setChannels } = useContext(Context);
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data: channels } = await axios.get(
          "http://localhost:3001/channels",
          {
            headers: {
              Authorization: `Bearer ${oauth.access_token}`,
              email: oauth.email,
            },
          }
        );
        setChannels(channels);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [oauth, setChannels]);
  return (
    <ul style={styles.root}>
      {channels.map((channel, i) => (
        <li key={i} css={styles.channel}>
          <ColorLink
            component="button"
            variant="body1"
            color="textSecondary"
            href={`/channels/${channel.id}`}
            onClick={(e) => {
              e.preventDefault();
              history.push(`/channels/${channel.id}`);
            }}
          >
            {channel.name}
          </ColorLink>
        </li>
      ))}
    </ul>
  );
};

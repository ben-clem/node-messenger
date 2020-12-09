import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as ChannelIcon } from "./icons/channel.svg";
import { ReactComponent as FriendsIcon } from "./icons/friends.svg";
import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { Button } from "@material-ui/core";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { orange } from "@material-ui/core/colors";

const useStyles = (theme) => ({
  root: {
    height: "100%",
    flex: "1 1 auto",
    display: "flex",
    // background: 'rgba(0,0,0,.2)',
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  card: {
    textAlign: "center",
  },
  icon: {
    width: "30%",
    fill: "#fff",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700],
    },
  },
}))(Button);

const ColorTextField = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: orange[500],
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: orange[500],
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: orange[500],
      },
    },
  },
}))(TextField);

export default () => {
  const styles = useStyles(useTheme());
  const [newChannelFormOpen, setNewChannelFormOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");

  const openForm = () => {
    setNewChannelFormOpen(true);
  };

  const createChannel = async () => {
    setNewChannelFormOpen(false);

    await axios.post(`http://localhost:3001/channels`, {
      name: newChannelName,
    });

    //setNewChannelName("");
    window.location.reload(false);
  };

  return (
    <div css={styles.root}>
      {/* New Channel Form */}
      <Dialog
        open={newChannelFormOpen}
        onClose={() => {
          setNewChannelFormOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Please enter the name of the new channel:
        </DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createChannel();
          }}
        >
          <DialogContent>
            <ColorTextField
              autoFocus
              id="name"
              label="Name"
              type="text"
              fullWidth
              color="primary"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setNewChannelFormOpen(false);
              }}
              color="error"
            >
              Cancel
            </Button>
            <ColorButton type="submit" color="primary">
              Add channel
            </ColorButton>
          </DialogActions>
        </form>
      </Dialog>

      {/* Buttons */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <Button onClick={openForm}>
              <div css={styles.card}>
                <ChannelIcon css={styles.icon} />
                <Typography color="textPrimary">Create channel</Typography>
              </div>
            </Button>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">Invite friends</Typography>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <SettingsIcon css={styles.icon} />
            <Typography color="textPrimary">Settings</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

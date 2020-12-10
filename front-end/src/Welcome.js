import React, { useState, useContext } from "react";
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
import Context from "./Context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import { blue } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";

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
  listItemDone: {
    borderRadius: "1em",
    "&,&:focus": {
      backgroundColor: "rgb(20, 255, 120, 0.5) !important",
    },
    "&:hover": {
      backgroundColor: "rgb(20, 255, 120, 0.35) !important",
    },
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
  const { oauth, setOauth } = useContext(Context);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const openForm = () => {
    setNewChannelFormOpen(true);
    //console.log("oauth.email = " + oauth.email);

    getUsers();
  };

  const createChannel = async () => {
    setNewChannelFormOpen(false);

    await axios.post(`http://localhost:3001/channels`, {
      name: newChannelName,
      owner: oauth.email,
      members: selectedUsers,
    });

    //setNewChannelName("");
    window.location.reload(false);
  };

  const getUsers = async () => {
    const { data: users } = await axios.get(`http://localhost:3001/users`);
    setUsers(users);
  };

  const handleListItemClick = (user) => {
    // Toggle: si l'user est déja séléctionné, le retirer, sinon, l'ajouter
    if (selectedUsers.includes(user.username)) {
      setSelectedUsers(
        selectedUsers.filter(function (value, index, arr) {
          return value !== user.username;
        })
      );
    } else {
      setSelectedUsers([...selectedUsers, user.username]);
    }
    setUsers(users);
  };

  const handleInviteMemberClick = () => {
    setInviteMemberOpen(true);
  };

  const inviteMember = () => {
    setInviteMemberOpen(false);

    if (selectedUsers.includes(newEmail)) {
      // do nothing
    } else {
      setSelectedUsers([...selectedUsers, newEmail]);
    }

    //setNewEmail("");
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createChannel();
          }}
        >
          <DialogContent>
            <DialogTitle id="form-dialog-title">
              Please enter the name of the new channel:
            </DialogTitle>
            <ColorTextField
              autoFocus
              id="name"
              label="Channel name"
              type="text"
              fullWidth
              color="primary"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              required
            />

            <DialogTitle id="form-dialog-title-2">
              <br></br>
              And select its members:
            </DialogTitle>

            <List>
              {users.map(
                (user) => {
                  /* if (user.username != oauth.email) { */
                  return (
                    <ListItem
                      button
                      onClick={() => handleListItemClick(user)}
                      key={user.id}
                      css={
                        selectedUsers.includes(user.username)
                          ? styles.listItemDone
                          : styles.listItem
                      }
                    >
                      {" "}
                      {console.log(
                        "selectedUsers.includes(user.username): " +
                          selectedUsers.includes(user.username)
                      )}
                      {console.log("selectedUsers: " + selectedUsers)}
                      <ListItemAvatar>
                        <Avatar className={styles.avatar}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                    </ListItem>
                  );
                }
                /* } */
              )}

              {/* Invite a member who is not in DB */}
              <ListItem autoFocus button onClick={handleInviteMemberClick}>
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Invite member" />
              </ListItem>
            </List>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                setNewChannelFormOpen(false);
                setSelectedUsers([]);
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

      {/* Second dialog for entering inviting member email */}
      <Dialog
        open={inviteMemberOpen}
        onClose={() => {
          setInviteMemberOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inviteMember();
          }}
        >
          <DialogContent>
          <DialogTitle>
            Please enter the email of the user you want to invite:
          </DialogTitle>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            {
              <Button
                onClick={() => {
                  setInviteMemberOpen(false);
                  setNewEmail("");
                }}
                color="error"
              >
                Cancel
              </Button>
            }
            <ColorButton type="submit" color="primary">
              Invite member
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
        {/* To be placed inside channel
        <Grid item xs>
          <div css={styles.card}>
            <FriendsIcon css={styles.icon} />
            <Typography color="textPrimary">Invite friends</Typography>
          </div>
        </Grid> */}
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

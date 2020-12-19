import { useState, useContext } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { ReactComponent as ChannelIcon } from "./icons/channel.svg";
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
import Avatar from "@material-ui/core/Avatar";
import { v4 as uuid } from "uuid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DialogContentText from "@material-ui/core/DialogContentText";
import Link from "@material-ui/core/Link";
import Gravatar from "react-gravatar";

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

const BorderColorButton = withStyles((theme) => ({
  root: {
    color: "white",
    borderColor: orange[500],
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

const ColorLink = withStyles((theme) => ({
  root: {
    color: orange[500],
    cursor: "pointer",
  },
}))(Link);

export default () => {
  const styles = useStyles(useTheme());

  const { oauth } = useContext(Context);

  const [newChannelFormOpen, setNewChannelFormOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [inviteMemberOpen, setInviteMemberOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [avatarButtonSelected, setAvatarButtonSelected] = useState(1); // 1: Gravatar, 2: selected avatar, 3: custom avatar

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
    //setUsers(users);
  };

  return (
    <div css={styles.root}>
      {/* Buttons */}

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        {/* Create Channel */}

        <Grid item xs>
          <div css={styles.card}>
            <Button
              onClick={async () => {
                setNewChannelFormOpen(true);

                const { data: users } = await axios.get(
                  `http://localhost:3001/users`,
                  {
                    headers: {
                      Authorization: `Bearer ${oauth.access_token}`,
                      email: oauth.email,
                    },
                  }
                );

                setUsers(users);
              }}
            >
              <div css={styles.card}>
                <ChannelIcon css={styles.icon} />
                <Typography color="textPrimary">Create channel</Typography>
              </div>
            </Button>
          </div>
        </Grid>

        {/* New Channel Dialog Form */}
        <Dialog
          open={newChannelFormOpen}
          onClose={() => {
            setNewChannelFormOpen(false);
            setNewChannelName("");
            setUsers([]);
            setSelectedUsers([]);
            setInviteMemberOpen(false);
            setNewEmail("");
          }}
          aria-labelledby="form-dialog-title"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setNewChannelFormOpen(false);

              await axios.post(
                `http://localhost:3001/channels`,
                {
                  name: newChannelName,
                  owner: oauth.email,
                  members: [oauth.email, ...selectedUsers],
                },
                {
                  headers: {
                    Authorization: `Bearer ${oauth.access_token}`,
                    email: oauth.email,
                  },
                }
              );

              window.location.reload(false);
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
                {users.map((user) => {
                  if (user.username !== oauth.email) {
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
                        <ListItemAvatar>
                          <Avatar className={styles.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.username} />
                      </ListItem>
                    );
                  } else {
                    return null;
                  }
                })}

                {/* Invite a member who is not in DB */}
                <ListItem
                  autoFocus
                  button
                  onClick={() => {
                    setInviteMemberOpen(true);
                  }}
                >
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
                  setNewChannelName("");
                  setUsers([]);
                  setSelectedUsers([]);
                  setInviteMemberOpen(false);
                  setNewEmail("");
                }}
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
            setNewEmail("");
          }}
          aria-labelledby="form-dialog-title"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedUsers.includes(newEmail)) {
                // do nothing
              } else {
                setSelectedUsers([...selectedUsers, newEmail]);
                setUsers([...users, { username: newEmail, id: uuid() }]);
              }

              setInviteMemberOpen(false);
              setNewEmail("");
            }}
          >
            <DialogContent>
              <DialogTitle>
                Please enter the email of the user you want to invite:
              </DialogTitle>
              <ColorTextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setInviteMemberOpen(false);
                  setNewEmail("");
                }}
              >
                Cancel
              </Button>

              <ColorButton type="submit" color="primary">
                Invite member
              </ColorButton>
            </DialogActions>
          </form>
        </Dialog>

        {/* Settings */}

        <Grid item xs>
          <div css={styles.card}>
            <Button
              onClick={() => {
                setSettingsOpen(true);
              }}
            >
              <div css={styles.card}>
                <SettingsIcon css={styles.icon} />
                <Typography color="textPrimary">Settings</Typography>
              </div>
            </Button>
          </div>
        </Grid>

        {/* Settings Dialog */}

        <Dialog
          open={settingsOpen}
          onClose={() => {
            setSettingsOpen(false);
          }}
          aria-labelledby="form-dialog-title"
          fullWidth="true"
          maxWidth="md"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSettingsOpen(false);
            }}
          >
            <DialogTitle>
              <Typography
                component="h5"
                variant="h5"
                align="center"
                color="initial"
              >
                Settings
              </Typography>
            </DialogTitle>

            <DialogTitle>Personal avatar:</DialogTitle>

            <DialogContent>
              <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
                fullWidth
              >
                {avatarButtonSelected === 1 ? ( // Gravatar
                  <ColorButton>Use Gravatar</ColorButton>
                ) : (
                  <BorderColorButton
                    onClick={() => {
                      setAvatarButtonSelected(1);
                    }}
                  >
                    Use Gravatar
                  </BorderColorButton>
                )}

                {avatarButtonSelected === 2 ? ( // selected avatar
                  <ColorButton>Select from list</ColorButton>
                ) : (
                  <BorderColorButton
                    onClick={() => {
                      setAvatarButtonSelected(2);
                    }}
                  >
                    Select from list
                  </BorderColorButton>
                )}

                {avatarButtonSelected === 3 ? ( // custom avatar
                  <ColorButton>Upload an image</ColorButton>
                ) : (
                  <BorderColorButton
                    onClick={() => {
                      setAvatarButtonSelected(3);
                    }}
                  >
                    Upload an image
                  </BorderColorButton>
                )}
              </ButtonGroup>

              {avatarButtonSelected === 1 && ( // Gravatar
                <div>
                  <DialogContentText>
                    <br></br>
                    Your avatar will be automatically fetched from{" "}
                    <ColorLink href="https://en.gravatar.com/" target="_blank">
                      gravatar.com
                    </ColorLink>
                    . You can go there to update it.<br></br>
                    If you don't set any, a default one will be provided based
                    on your email.
                    <br></br>
                    Your current Gravatar:
                  </DialogContentText>
                  <Gravatar
                    email={oauth.email}
                    default="identicon"
                    size={100}
                    style={{ marginLeft: "10px", marginTop: "5px" }}
                  />
                </div>
              )}
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => {
                  setSettingsOpen(false);
                }}
              >
                Cancel
              </Button>

              <ColorButton type="submit" color="primary">
                Save settings
              </ColorButton>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
    </div>
  );
};

import { useState, useContext, useEffect } from "react";
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
import * as locales from "@material-ui/core/locale";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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

const BorderColorButton2 = withStyles((theme) => ({
  root: {
    color: "white",
    borderColor: orange[500],
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

const ColorAutocomplete = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: orange[500],
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: orange[500],
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: orange[500],
      },
    },
  },
}))(Autocomplete);

const ColorSwitch = withStyles({
  switchBase: {
    color: orange[300],
    "&$checked": {
      color: orange[500],
    },
    "&$checked + $track": {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

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
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("username");
  const [avatarButtonSelected, setAvatarButtonSelected] = useState(1); // 1: Gravatar, 2: selected avatar, 3: custom avatar
  const [avatarSelected, setAvatarSelected] = useState(0); // 1 to 6
  const [locale, setLocale] = useState("enUS");
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: users } = await axios.get(`http://localhost:3001/users`, {
        headers: {
          Authorization: `Bearer ${oauth.access_token}`,
        },
      });
      const usr = users.filter((user) => user.email === oauth.email);
      setCurrentUser(usr[0]);
    };
    getCurrentUser();
  }, []);

  const handleListItemClick = (user) => {
    // Toggle: si l'user est déja séléctionné, le retirer, sinon, l'ajouter
    if (selectedUsers.includes(user.email)) {
      setSelectedUsers(
        selectedUsers.filter(function (value, index, arr) {
          return value !== user.email;
        })
      );
    } else {
      setSelectedUsers([...selectedUsers, user.email]);
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
                  if (user.email !== oauth.email) {
                    return (
                      <ListItem
                        button
                        onClick={() => handleListItemClick(user)}
                        key={user.id}
                        css={
                          selectedUsers.includes(user.email)
                            ? styles.listItemDone
                            : styles.listItem
                        }
                      >
                        <ListItemAvatar>
                          <Avatar className={styles.avatar}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={user.email} />
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
                setUsers([...users, { email: newEmail, id: uuid() }]);
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
          onEnter={() => {
            setUsername(currentUser.username);
            setAvatarButtonSelected(currentUser.avatarChoice);
            setAvatarSelected(currentUser.avatarSelected);
            setLocale(currentUser.locale);
            setDarkTheme(currentUser.darkTheme);
          }}
          onClose={() => {
            setSettingsOpen(false);
          }}
          aria-labelledby="form-dialog-title"
          fullWidth
          maxWidth="md"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const newUser = {
                email: currentUser.email,
                username: username,
                id: currentUser.id,
                avatarChoice: avatarButtonSelected,
                avatarSelected: avatarSelected,
                locale: locale,
                darkTheme: darkTheme,
              };

              await axios.put(
                `http://localhost:3001/users/${currentUser.id}`,
                newUser,
                {
                  headers: {
                    Authorization: `Bearer ${oauth.access_token}`,
                    email: oauth.email,
                  },
                }
              );

              setSettingsOpen(false);
              window.location.reload(false);
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

            <DialogContent>
              <DialogTitle>Username:</DialogTitle>
              <ColorTextField
                id="username"
                label="Username"
                type="text"
                color="primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </DialogContent>

            <DialogContent>
              <DialogTitle>Personal avatar:</DialogTitle>
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
              {avatarButtonSelected === 2 && ( // Select from list
                <div>
                  <br></br>
                  <GridList cols={6}>
                    <BorderColorButton2
                      variant={avatarSelected === 1 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(1);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/avatar.png" />
                      </GridListTile>
                    </BorderColorButton2>
                    <BorderColorButton2
                      variant={avatarSelected === 2 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(2);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/jake.png" />
                      </GridListTile>
                    </BorderColorButton2>
                    <BorderColorButton2
                      variant={avatarSelected === 3 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(3);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/futurama-bender.png" />
                      </GridListTile>
                    </BorderColorButton2>
                    <BorderColorButton2
                      variant={avatarSelected === 4 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(4);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/super-mario.png" />
                      </GridListTile>
                    </BorderColorButton2>
                    <BorderColorButton2
                      variant={avatarSelected === 5 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(5);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/fortnite-llama.png" />
                      </GridListTile>
                    </BorderColorButton2>
                    <BorderColorButton2
                      variant={avatarSelected === 6 ? "outlined" : "default"}
                      onClick={() => {
                        setAvatarSelected(6);
                      }}
                    >
                      <GridListTile>
                        <img src="https://img.icons8.com/officel/80/000000/anonymous-mask.png" />
                      </GridListTile>
                    </BorderColorButton2>
                  </GridList>
                </div>
              )}
              {avatarButtonSelected === 3 && ( // Upload avatar
                <DialogContentText>
                  <br></br>
                  WIP
                </DialogContentText>
              )}
            </DialogContent>

            <DialogContent>
              <DialogTitle>Language:</DialogTitle>
              <ColorAutocomplete
                options={Object.keys(locales)}
                getOptionLabel={(key) =>
                  `${key.substring(0, 2)}-${key.substring(2, 4)}`
                }
                style={{ width: 300 }}
                value={locale}
                disableClearable
                onChange={(event, newValue) => {
                  setLocale(newValue);
                }}
                renderInput={(params) => (
                  <ColorTextField {...params} label="Language" fullWidth />
                )}
              />
            </DialogContent>

            <DialogContent>
              <DialogTitle>Theme:</DialogTitle>
              <FormControlLabel
                control={
                  <ColorSwitch
                    checked={darkTheme}
                    onClick={() => {
                      darkTheme ? setDarkTheme(false) : setDarkTheme(true);
                    }}
                    name="darktheme"
                  />
                }
                label="Dark Theme"
                labelPlacement="start"
              />
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

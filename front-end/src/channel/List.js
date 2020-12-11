import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme, withStyles } from "@material-ui/core/styles";
// Markdown
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
// Time
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { orange } from "@material-ui/core/colors";
import axios from "axios";
import { merge } from "mixme";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";

const useStyles = (theme) => ({
  root: {
    position: "relative",
    flex: "1 1 auto",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    pre: {
      overflowY: "auto",
    },
    "& ul": {
      margin: 0,
      padding: 0,
      textIndent: 0,
      listStyleType: 0,
    },
  },
  title: {
    margin: "0px",
    padding: "0px 20px",
    border: "solid 1px rgb(255, 255, 255, 0.2)",
  },
  message: {
    padding: ".2rem .5rem",
    ":hover": {
      backgroundColor: "rgba(255,255,255,.05)",
    },
  },
  fabWrapper: {
    position: "absolute",
    right: 0,
    top: 0,
    width: "50px",
  },
  fab: {
    position: "fixed !important",
    top: 0,
    width: "50px",
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

dayjs.extend(calendar);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  calendar: {
    sameElse: "DD/MM/YYYY hh:mm A",
  },
});

export default forwardRef(({ channel, messages, onScrollDown }, ref) => {
  const styles = useStyles(useTheme());

  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll,
  }));
  const rootEl = useRef(null);
  const scrollEl = useRef(null);
  const scroll = () => {
    scrollEl.current.scrollIntoView();
  };

  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null); // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current; // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null;
          const { scrollTop, offsetHeight, scrollHeight } = rootNode; // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight);
        }, 200);
      }
    };
    handleScroll();
    rootNode.addEventListener("scroll", handleScroll);
    return () => rootNode.removeEventListener("scroll", handleScroll);
  });

  /* ----------------------------------------------------------------------- */

  const [channelData, setChannelData] = useState({});
  const [members, setMembers] = useState([]);
  const [owner, setOwner] = useState("");

  const [membersDialogOpen, setMembersDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);

  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      const queryString = window.location.pathname;
      const channelID = queryString.slice(10);

      const { data: channel } = await axios.get(
        `http://localhost:3001/channels/${channelID}`
      );

      setChannelData(channel);
      setMembers(channel.members);
      setOwner(channel.owner);
    };
    getUsers();
  }, [membersDialogOpen]);


  const inviteMember = async () => {
    if (members.includes(inviteEmail)) {
      
      setInviteEmail("! User already in channel !");

    } else {

      await axios.put(
        `http://127.0.01:3001/channels/${channelData.id}`, {
          name: channelData.name,
          owner: channelData.owner,
          members: [inviteEmail, ...members],
          id: channelData.id,
        }
      );

      setInviteEmail("");
      setChannelData({});
      setInviteDialogOpen(false);

      setMembersDialogOpen(false);
      setMembersDialogOpen(true);

    }

    
  };

  return (
    <div css={styles.root} ref={rootEl}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        css={styles.title}
      >
        <Grid item>
          <h1>{channel.name}</h1>
        </Grid>
        <Grid item>
          <ColorButton
            onClick={() => {
              setMembersDialogOpen(true);
            }}
          >
            Members
          </ColorButton>
        </Grid>
      </Grid>

      <ul>
        {messages.map((message, i) => {
          const { contents: content } = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
          return (
            <li key={i} css={styles.message}>
              <p>
                <span>{message.author}</span>
                {" - "}
                <span>{dayjs().calendar(message.creation)}</span>
              </p>
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
            </li>
          );
        })}
      </ul>
      <div ref={scrollEl} />

      <Dialog
        open={membersDialogOpen}
        onClose={() => {
          setMembersDialogOpen(false);
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <List>
            {console.log("members: " + members)}

            {members.map((member) => {
              return (
                <ListItem button key={member}>
                  <ListItemAvatar>
                    <Avatar className={styles.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  {member === owner ? (
                    <ListItemText primary={`${member} (owner)`} />
                  ) : (
                    <ListItemText primary={member} />
                  )}
                </ListItem>
              );
            })}

            <ListItem
              autoFocus
              button
              onClick={() => {
                setInviteDialogOpen(true);
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
              setMembersDialogOpen(false);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Second dialog for inviting member */}
      <Dialog
        open={inviteDialogOpen}
        onClose={() => {
          setInviteDialogOpen(false);
          setInviteEmail("");
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
            <ColorTextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            {
              <Button
                onClick={() => {
                  setInviteDialogOpen(false);
                  setInviteEmail("");
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
    </div>
  );
});

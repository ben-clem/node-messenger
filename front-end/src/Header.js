import { useContext } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import Context from "./Context";
import {
  Card,
  CardContent,
  makeStyles,
  Typography,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = (theme) => ({
  header: {
    padding: theme.spacing(1),
    backgroundColor: "rgba(65,65,65)",
  },
  menu: {
    [theme.breakpoints.up("sm")]: {
      display: "none !important",
    },
  },
  email: {
    marginBottom: "0",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "",
    },
  },
  title: {
    cursor: "pointer",
  },
  logout: {
    cursor: "pointer",
  },
});

export default ({ drawerToggleListener }) => {
  const styles = useStyles(useTheme());
  const { oauth, setOauth, drawerVisible, setDrawerVisible } = useContext(
    Context
  );
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible);
  };
  const onClickLogout = (e) => {
    e.stopPropagation();
    setOauth(null);
  };
  const history = useHistory();

  return (
    <Card css={styles.header} square variant="outlined">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          
          <Link
            href="#"
            component="h3"
            variant="h3"
            align="center"
            color="initial"
            underline="none"
            css={styles.title}
            onClick={(e) => {
              e.preventDefault();
              history.push("/channels");
            }}
          >
            
              FireChat <span>🔥</span>
            
          </Link>

        </Grid>

        {oauth ? (
          <Grid container spacing={0}>
            <Grid item xs={2} sm={false}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerToggle}
                css={styles.menu}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={10} sm={12}>
              <p css={styles.email}>
                {oauth.email}{" "}
                <Link onClick={onClickLogout} color="error" underline="none" css={styles.logout}>
                  (logout)
                </Link>
              </p>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Card>
  );
};

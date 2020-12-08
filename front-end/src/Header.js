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
  return (
    <Card css={styles.header} square variant="outlined">
      <Grid container spacing="0">
        <Grid item xs={12} justify="center">
          <Typography variant="h3" component="h3" align="center">
            FireChat 🔥
          </Typography>
        </Grid>

        {oauth ? (
          <Grid container spacing="0">
            <Grid item xs={2} sm={0}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={drawerToggle}
                css={styles.menu}
              >
                <MenuIcon />
              </IconButton>
            </Grid>

            <Grid item xs={10} sm={12} alignContent="center" justify="center">
              <p css={styles.email}>
                {oauth.email} <Link onClick={onClickLogout} color="error">(logout)</Link>
              </p>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </Card>
  );
};

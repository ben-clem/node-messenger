import "./App.css";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";

const styles = makeStyles({
  header: {
    height: "75px",
  },
  title: {
    textAlign: "center",
    transform: "translate(0px, -7%)",
  },
});

export default () => {

  const classes = styles();
  
  return (
    <Card className={classes.header}>
      <CardContent>
        <Typography variant="h3" component="h3" className={classes.title}>
          FireChat 🔥
        </Typography>
      </CardContent>
    </Card>
  );
};

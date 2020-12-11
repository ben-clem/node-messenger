/** @jsx jsx */
import { jsx } from '@emotion/core'
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

const styles = {
  footer: {
    position: "fixed",
    bottom: "0",
    left: "0",
    width: "100%",
    height: '25px',
    textAlign: "center",
    
  },
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/benzinho75/node-messenger">
        benzinho & mnyrt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default () => {
  return (
    <footer style={styles.footer}>
      <Box>
        <Copyright />
      </Box>
    </footer>
  );
}


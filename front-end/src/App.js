import { useContext, useState } from 'react'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Oups from './Oups'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import Context from './Context'
import { useTheme } from "@material-ui/core/styles";
// Rooter
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom"

const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'rgb(48, 48, 47)',
    padding: '30px',
    [theme.breakpoints.down("xs")]: {
      padding: '0px',
    },
  },

});

export default () => {

  const styles = useStyles(useTheme());

  const location = useLocation()
  const {oauth} = useContext(Context)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      <Switch>
        <Route exact path="/">
          {
            oauth ? (
              <Redirect
                to={{
                  pathname: "/channels",
                  state: { from: location }
                }}
              />
            ) : (
              <Login />
            )
          }
        </Route>
        <Route path="/channels">
          {
            oauth ? (
              <Main />
            ) : (
              <Redirect
                to={{
                  pathname: "/",
                  state: { from: location }
                }}
              />
            )
          }
        </Route>
        <Route path="/Oups">
          <Oups />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

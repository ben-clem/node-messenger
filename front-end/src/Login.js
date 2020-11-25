import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme } from "@material-ui/core/styles";
//import { set } from "../../back-end/lib/app";
const axios = require("axios");
const qs = require("qs");

const useStyles = (theme) => ({
  root: {
    flex: "1 1 auto",
    background: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "& > div": {
      margin: `${theme.spacing(1)}`,
      marginLeft: "auto",
      marginRight: "auto",
    },
    "& fieldset": {
      border: "none",
      "& label": {
        marginBottom: theme.spacing(0.5),
        display: "block",
      },
    },
  },
});

const crypto = require("crypto");

const base64URLEncode = (str) =>
  str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest();

const redirect_url = function (
  authorization_endpoint,
  client_id,
  redirect_uri,
  scope
) {
  const code_verifier = base64URLEncode(crypto.randomBytes(32));
  const code_challenge = base64URLEncode(sha256(code_verifier));
  const url = [
    `${authorization_endpoint}?`,
    `client_id=${client_id}&`,
    `scope=${scope}&`,
    "response_type=code&",
    `redirect_uri=${redirect_uri}&`,
    `code_challenge=${code_challenge}&`,
    "code_challenge_method=S256",
  ].join("");
  const data = {
    code_verifier,
    url,
  };
  console.log(JSON.stringify(data, null, 2));

  return data.code_verifier;
};

const code_grant = async function (code_verifier) {
  // If this is a callback, POST code_grant
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const code = urlParams.get("code");

  if (code !== null && code !== "") {
    try {
      const requestBody = qs.stringify({
        grant_type: "authorization_code",
        client_id: "node-messenger",
        redirect_uri: 'http://127.0.0.1:3000/callback',
        client_secret: "ZXhhbXBsZS1hcHAtc2VjcmV0",
        code_verifier: code_verifier,
        code: code,
      }, { encode: false });
      console.log(requestBody);

      const { data: message } = await axios.post(
        "http://127.0.0.1:5556/dex/token",
        requestBody
      );
      console.log(JSON.stringify(message, null, 2));
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
    }
  }
};

export default ({ onUser }) => {
  const styles = useStyles(useTheme());
  const [codeVerifier, setCodeVerifier] = useState("");

  code_grant(codeVerifier);

  return (
    <div css={styles.root}>
      <div>
        {/* <fieldset>
          <label htmlFor="username">username: </label>
          <input id="username" name="username" />
        </fieldset>
        <fieldset>
          <label htmlFor="password">password:</label>
          <input id="password" name="password" type="password" />
        </fieldset> */}
        <fieldset>
          <input
            type="submit"
            value="login"
            onClick={(e) => {
              e.stopPropagation();

              setCodeVerifier(
                redirect_url(
                  "http://127.0.0.1:5556/dex/auth",
                  "node-messenger",
                  "http://127.0.0.1:3000/callback",
                  "openid%20email%20offline_access"
                )
              );

              //onUser({username: 'david'})
            }}
          />
        </fieldset>
        {/* <fieldset>
          <input type="submit" value="login" onClick={ (e) => {
            e.stopPropagation()
            onUser({username: 'david'})
          }} />
        </fieldset> */}
      </div>
    </div>
  );
};

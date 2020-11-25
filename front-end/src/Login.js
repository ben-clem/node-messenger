import { useState } from "react";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// Layout
import { useTheme } from "@material-ui/core/styles";
//import { set } from "../../back-end/lib/app";
import { useCookies } from "react-cookie";

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

  //window.location.href = url;

  return data;
};

export default ({ onUser }) => {
  const styles = useStyles(useTheme());
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const code_grant = async function (codeVerifier) {
    // If this is a callback, POST code_grant
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const code = urlParams.get("code");

    if (code !== null && code !== "") {
      try {
        console.log("codeVerifier: ", codeVerifier);

        const requestBody = qs.stringify(
          {
            grant_type: "authorization_code",
            client_id: "node-messenger",
            code_verifier: `${codeVerifier}`,
            redirect_uri: "http://127.0.0.1:3000/callback",
            code: code,
          },
          null,
          2
        );
        console.log(requestBody);

        const { data: oauth } = await axios.post(
          "http://127.0.0.1:5556/dex/token",
          requestBody
        );
        console.log(JSON.stringify(oauth, null, 2));
        setCookie("oauth", oauth);
        window.location = "/";
      } catch (err) {
        console.error(err);
      }
    }
  };

  console.log("222 codeVerifier: ", cookies.code_verifier);
  code_grant(cookies.code_verifier);

  var printEmail;
  if (cookies.oauth) {
    const { id_token } = cookies.oauth;
    const id_payload = id_token.split(".")[1];
    const { email } = JSON.parse(atob(id_payload));

    printEmail = (
      <p>
        Bienvenue {email}
        {/* access_token: {cookies.oauth.access_token}
        <br></br>
        token_type: {cookies.oauth.token_type}
        <br></br>
        expires_in: {cookies.oauth.expires_in}
        <br></br>
        refresh_token: {cookies.oauth.refresh_token}
        <br></br>
        id_token: {cookies.oauth.id_token}
        <br></br> */}
      </p>
    );
  } else {
    printEmail = <p>Déconnecté</p>;
  }

  return (
    <div css={styles.root}>
      <div>
        {printEmail}
        <fieldset>
          {!cookies.oauth ? (
            <input
              type="submit"
              value="login"
              onClick={(e) => {
                e.stopPropagation();

                const data = redirect_url(
                  "http://127.0.0.1:5556/dex/auth",
                  "node-messenger",
                  "http://127.0.0.1:3000/callback",
                  "openid%20email%20offline_access"
                );
                console.log("111 codeVerifier: ", data.code_verifier);

                setCookie("code_verifier", data.code_verifier);

                window.location.href = data.url;

                //onUser({username: 'david'})
              }}
            />
          ) : (
            <input
              type="submit"
              value="logout"
              onClick={(e) => {
                e.stopPropagation();

                removeCookie("oauth");

                window.location.href = "/";

                //onUser({username: 'david'})
              }}
            />
          )}
        </fieldset>
      </div>
    </div>
  );
};

import React, { useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const styles = {
  root: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#373B44",
    padding: "50px",
    margin: "0px",
  },
  header: {
    height: "100px",
  },
  headerLogIn: {
    backgroundColor: "red",
  },
  headerLogOut: {
    backgroundColor: "blue",
  },
  footer: {
    height: "60px",
  },
  main: {
    backgroundColor: "#565E71",
    flex: "1 1 auto",
  },
  message: {
    margin: "0 200px 0 0",
    backgroundColor: "#66728E",
  },
  input: {
    margin: "0 0 0 1rem"
  },
  send: {
    backgroundColor: "#D6DDEC",
    border: "1px solid #fff",
    margin: "1rem",
    padding: ".2rem .5rem",
    border: "none",
    "&:hover": {
      backgroundColor: "#2A4B99",
      cursor: "pointer",
      color: "#fff",
    },
  },
};

function App() {
  const [messages, setMessages] = useState([
    { content: "First message" },
    { content: "Second message" },
    { content: "Third message" },
  ]);

  const addMessage = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setMessages([...messages, { content: data.get("content") }]);
    e.target.elements.content.value = ""; // resetting the input field through the DOM
  };

  document.body.style.margin = "0";
  return (
        <div className="App" css={styles.root}>
          <header className="App-header" css={styles.header}>
            header
          </header>
          <main className="App-main" css={styles.main}>
            <ul>
              {messages.map((message, i) => (
                <li key={i} css={styles.message}>
                  {message.content}
                </li>
              ))}
            </ul>
            <form onSubmit={addMessage}>
              <input type="input" name="content" css={styles.input}/>
              <input type="submit" value="Send" css={styles.send} />
            </form>
          </main>
          <footer className="App-footer" css={styles.footer}>
            footer
          </footer>
        </div>
  );
}

export default App;

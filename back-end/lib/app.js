const db = require("./db");
const express = require("express");
const cors = require("cors");
const authenticator = require("./authenticator");

const app = express();

const authenticate = authenticator({
  jwks_uri: "http://127.0.0.1:5556/dex/keys",
});

app.use(require("body-parser").json());

/* WORKING CORS (including preflight) */
app.use(cors({credentials: true, origin: true}))
app.options('*', cors({credentials: true, origin: true})) // include before other routes


app.get("/", authenticate, (req, res) => {
  res.send(["<h1>ECE DevOps Chat</h1>"].join(""));
});

//////////////
// Channels //
//////////////

/* Get channels without authentication for debugging */
/* app.get("/channels", async (req, res) => {
  const channels = await db.channels.list();
  res.json(channels);
}); */
/* --- */

/* get channels => db list channels */
app.get("/channels", authenticate, async (req, res) => {
  const channels = await db.channels.list();
  // TODO faire le tri entre les channels que l'user a le droit de voir
  res.json(channels);
});

/* post channels => db create channel */
app.post("/channels", authenticate, async (req, res) => {
  const channel = await db.channels.create(req.body);
  res.status(201).json(channel);
});

/* get channels:id => db get channel */
app.get("/channels/:id", authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id);
  // TODO check si l'user a le droit de voir cette channel
  res.json(channel);
});

/* put channels:id => db update channel */
app.put("/channels/:id", authenticate, async (req, res) => {
  const channel = await db.channels.update(req.body);
  res.json(channel);
});

//////////////
// Messages //
//////////////

app.get("/channels/:id/messages", authenticate, async (req, res) => {
  const messages = await db.messages.list(req.params.id);
  res.json(messages);
});

app.post("/channels/:id/messages", authenticate, async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body);
  res.status(201).json(message);
});

///////////
// Users //
///////////

app.get("/users", authenticate, async (req, res) => {
  const users = await db.users.list();
  res.json(users);
});

/* post users => db create user */
app.post("/users", authenticate, async (req, res) => {
  const user = await db.users.create(req.body);
  res.status(201).json(user);
});

app.get("/users/:id", authenticate, async (req, res) => {
  const user = await db.users.get(req.params.id);
  res.json(user);
});

app.put("/users/:id", authenticate, async (req, res) => {
  const user = await db.users.update(req.body);
  res.json(user);
});

module.exports = app;

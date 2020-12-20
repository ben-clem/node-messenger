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
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors({ credentials: true, origin: true })); // include before other routes

app.get("/", (req, res) => {
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
/* */

/* get channels => db list channels */
app.get("/channels", authenticate, async (req, res) => {
  let channels = await db.channels.list(); // get every channel from DB
  const reqEmail = req.headers["email"]; // get email of user asking for channels
  // filter channels on user is the owner or one of the members
  channels = channels.filter(
    (channel) =>
      channel.owner === reqEmail || channel.members.includes(reqEmail)
  );
  // sending back the filtered channels
  if (!Array.isArray(channels) || !channels.length) {
    // array does not exist, is not an array, or is empty
    res.status(204); // No Content
  } else {
    res.status(200).json(channels); // OK
  }
});

/* post channels => db create channel */
app.post("/channels", authenticate, async (req, res) => {
  const channel = await db.channels.create(req.body);
  res.status(201).json(channel); // Created
});

/* get channels:id => db get channel */
app.get("/channels/:id", authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id);
  // check si l'user a le droit de voir cette channel
  const reqEmail = req.headers["email"];
  if (channel.owner === reqEmail || channel.members.includes(reqEmail)) {
    res.status(200).json(channel); // OK
  } else {
    res.status(403); // Forbidden
  }
});

/* put channels:id => db update channel */
app.put("/channels/:id", authenticate, async (req, res) => {
  let channel = await db.channels.get(req.params.id);
  const reqEmail = req.headers["email"];
  if (channel.owner === reqEmail || channel.members.includes(reqEmail)) {
    channel = await db.channels.update(req.body);
    res.status(201).json(channel); // Created
  } else {
    res.status(403); // Forbidden
  }
});

//////////////
// Messages //
//////////////

/* DEBUG */
/* app.get("/channels/:id/messages", async (req, res) => {
  const messages = await db.messages.list(req.params.id);
  res.status(200).json(messages); // OK
}); */
/*  */

app.get("/channels/:id/messages", authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id);
  const reqEmail = req.headers["email"];
  if (channel.owner === reqEmail || channel.members.includes(reqEmail)) {
    const messages = await db.messages.list(req.params.id);
    res.status(200).json(messages); // OK
  } else {
    res.status(403); // Forbidden
  }
});

app.post("/channels/:id/messages", authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id);
  const reqEmail = req.headers["email"];
  if (channel.owner === reqEmail || channel.members.includes(reqEmail)) {
    const message = await db.messages.create(req.params.id, req.body);
    res.status(201).json(message); // Created
  } else {
    res.status(403); // Forbidden
  }
});

app.put("/channels/:id/messages", authenticate, async (req, res) => {
  const user = await db.messages.update(req.params.id, req.body);
  res.status(201).json(user);
});

app.delete("/channels/:id/messages", authenticate, async (req, res) => {
  const user = await db.messages.delete(req.params.id, req.body);
  res.status(200).json(user);
});

///////////
// Users //
///////////

/* DEBUG */
/* app.get("/users", async (req, res) => {
  const users = await db.users.list();
  res.json(users);
}); */
/*  */

app.get("/users", authenticate, async (req, res) => {
  const users = await db.users.list();
  res.status(200).json(users);
});

/* post users => db create user */
app.post("/users", authenticate, async (req, res) => {
  const user = await db.users.create(req.body);
  res.status(201).json(user);
});

app.get("/users/:id", authenticate, async (req, res) => {
  const user = await db.users.get(req.params.id);
  res.status(200).json(user);
});

app.put("/users/:id", authenticate, async (req, res) => {
  const user = await db.users.update(req.body);
  res.status(201).json(user);
});

module.exports = app;

import React, { useState, useContext, useEffect } from "react";
import Gravatar from "react-gravatar";

export default ({ user, email }) => {

    console.log(user);
    console.log(email);

  if (user === undefined || user.avatarChoice === undefined || user.avatarSelected === undefined) {
    user = { avatarChoice: 1, avatarSelected: 6, email: email };
  }

  return user.avatarChoice === 1 ? (
    <Gravatar
      email={user.email}
      default="identicon"
      size={40}
      style={{ marginLeft: "0px", marginTop: "0px" }}
    />
  ) : user.avatarSelected === 1 ? (
    <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
  ) : user.avatarSelected === 2 ? (
    <img src="https://img.icons8.com/officel/40/000000/jake.png" />
  ) : user.avatarSelected === 3 ? (
    <img src="https://img.icons8.com/officel/40/000000/futurama-bender.png" />
  ) : user.avatarSelected === 4 ? (
    <img src="https://img.icons8.com/officel/40/000000/super-mario.png" />
  ) : user.avatarSelected === 5 ? (
    <img src="https://img.icons8.com/officel/40/000000/fortnite-llama.png" />
  ) : (
    <img src="https://img.icons8.com/officel/40/000000/anonymous-mask.png" />
  );
};

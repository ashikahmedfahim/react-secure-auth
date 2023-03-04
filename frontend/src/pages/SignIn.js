import React, { useState } from "react";
import Axios from "../utilities/Axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signedIn = async () => {
    try {
      const response = await Axios.post('users/login',{
        username,
        password,
      });
      console.log(response)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signedIn}>Sign In</button>
    </div>
  );
};

export default SignIn;

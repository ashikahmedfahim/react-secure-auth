import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "../utilities/Axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const signedIn = async () => {
    try {
      const response = await Axios.post("users/login", {
        username,
        password,
      });
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        navigate("/users");
      }
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

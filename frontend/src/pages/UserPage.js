import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Axios from "../utilities/Axios";

const UserPage = () => {
  const { accessToken, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await Axios.get("/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        logout();
        navigate("/sign-in");
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.username}</h3>
        </div>
      ))}
    </div>
  );
};

export default UserPage;

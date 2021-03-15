import React from "react";
import axios from "axios";
import { useState } from "react";

const Login = ({setToken}) => {
  const [data, setData] = useState({
    user: '',
    password: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const apiUrl = "http://localhost:4010/v1";
      const res = await axios({
        method: "post",
        url: `${apiUrl}/admin/login`,
        data: data
      });
      console.log(res.data)
      setToken(res.data.token);
    } catch (error) {
      console.error(error);
      setToken(null);
    }
  }

  return (
    <form className="login__wrapper" onSubmit={handleSubmit}>
      <label>
        <p>User</p>
        <input type="text"
          value={data.user}
          onChange={(e) => setData({
            ...data,
            user: e.target.value
          })}
        />
      </label>
      <label>
        <p>Password</p>
        <input type="password"
          value={data.password}
          onChange={(e) => setData({
            ...data,
            password: e.target.value
          })}
        />
      </label>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  )
};

export default Login;

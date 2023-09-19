import React, { useState } from "react";
import "./navbar.scss";

import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const handleLogin = () => {
    const usernameInput = document.getElementById("username-form-input") as HTMLInputElement | null;;
    const passwordInput = document.getElementById("password-form-input") as HTMLInputElement | null;;

    if (usernameInput !== null && passwordInput !== null) {
      const username = usernameInput.value;
      const password = passwordInput.value;

      const payload = {
        username,
        password,
      };

      fetch('http://localhost:5004/api/v1/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user': username,
          'password': password,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('user', username);
            localStorage.setItem('password', password);
            
            return response.json();
          } else {
            console.error('Login failed');
            alert('Login failed');
            throw new Error('Login failed');
          }
        }).then((data) => {
          const userId = data.id;
          localStorage.setItem('userId', userId)
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error occurred during login:', error);
        });
    }


  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('userId');
    window.location.reload();
  };

  return (
    <div className="navbarContainer">
      <div className="wrapper">


        <div className="items">
          {isLoggedIn ? (
            <div className="item">
              <span className="usernameDisplay">HOWDY, {user}!</span>
              <div onClick={handleLogout}>
                <ExitToAppOutlinedIcon className="icon" />
              </div>
            </div>
          ) : (
            <div className="item">
              <input
                id="username-form-input"
                className="loginInput form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                id="password-form-input"
                className="loginInput form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-info btn-sm" onClick={handleLogin}>Login</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
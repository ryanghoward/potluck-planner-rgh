import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import styled from "styled-components";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

const initialState = {
  username: "",
  password: "",
};

const StyledBackground = styled.div`
  background-image: url("https://images.unsplash.com/photo-1475869430886-fb14585f7443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  height: 100vh;
  background-size: cover;
  border: 1px solid black;
  margin-top: 4rem;
`;

const Login = (props) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");

  const { push } = useHistory();

  const logMeIn = (credentials) => {
    axios
      .post(
        "https://potluck-planner-rgh.herokuapp.com/api/users/login",
        credentials
      )
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        push("/events");
      })
      .catch((err) => {
        setError("Username and/or Password is invalid");
        setState(initialState);
      });
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    logMeIn(state);
  };

  const handleSignUpClick = (event) => {
    event.preventDefault();
    push("/register");
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "6rem auto",
    boxShadow: "1px 1px 2px black, 0 0 25px black, 0 0 5px black",
  };

  const avatarStyle = {
    backgroundColor: "#540804",
    width: "4rem",
    height: "4rem",
  };

  const buttonStyle = {
    margin: "0.8rem 0",
    color: "#fff",
    backgroundColor: "#540804",
    fontFamily: "Outfit, sans-serif",
  };

  const textboxStyle = { margin: "0.8rem 0" };
  const headerStyle = { fontFamily: "Outfit, sans-serif", color: "#540804" };
  const linkStyle = { fontFamily: "Outfit, sans-serif", margin: "0 0.4rem" };
  const iconStyle = { fontSize: "3rem" };

  return (
    <StyledBackground>
      <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align='center'>
            <Avatar style={avatarStyle}>
              {" "}
              <LockOutlinedIcon style={iconStyle} />{" "}
            </Avatar>
            <h1 style={headerStyle}>Sign In</h1>
          </Grid>

          <div className='login-form'>
            <form onSubmit={handleLogin}>
              <TextField
                style={textboxStyle}
                label='Username'
                variant='outlined'
                type='text'
                placeholder='Enter Username'
                name='username'
                value={state.username}
                onChange={handleChange}
                fullWidth
              />

              <TextField
                style={textboxStyle}
                label='Password'
                variant='outlined'
                type='password'
                placeholder='Enter Password'
                name='password'
                value={state.password}
                onChange={handleChange}
                fullWidth
              />

              {error ? <p style={{ color: "red" }}>{error}</p> : null}

              <Button
                variant='contained'
                type='submit'
                style={buttonStyle}
                fullWidth
              >
                Log In
              </Button>

              <Typography style={headerStyle}>
                {" "}
                Don't have an account?
                <Link onClick={handleSignUpClick} style={linkStyle} href='#'>
                  Sign Up!
                </Link>
              </Typography>
            </form>
          </div>
        </Paper>
      </Grid>
    </StyledBackground>
  );
};

export default Login;

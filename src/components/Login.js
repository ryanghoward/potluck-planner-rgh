import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

// import { connect } from 'react-redux';
// import { userLogin } from './../actions/userActions'

const initialState = {
  username: "",
  password: "",
};

const Login = (props) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");

  const { push } = useHistory();

  const logMeIn = (credentials) => {
    axios
      .post(
        // Login API endpoint will go here,
        credentials
      )
      .then((res) => {
        // console.log(credentials)
        window.localStorage.setItem("token", res.data.token);
        push("/events");
      })
      .catch((err) => {
        setError("Username/Password Invalid");
        // console.log(err.message)
        // console.log(message)
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

    // props.userLogin(state)
    // push('/newevent');
    //lets push this to the /events page when that is set up
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
  };

  const avatarStyle = {
    backgroundColor: "#626262",
    width: "4rem",
    height: "4rem",
  };

  const buttonStyle = {
    margin: "0.8rem 0",
    color: "#fff",
    backgroundColor: "#808000",
    fontFamily: "Outfit, sans-serif",
  };

  const textboxStyle = { margin: "0.8rem 0" };
  const headerStyle = { fontFamily: "Outfit, sans-serif", color: "#808000" };
  const linkStyle = { fontFamily: "Outfit, sans-serif", margin: "0 0.4rem" };
  const iconStyle = { fontSize: "3rem" };

  return (
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
              Sign In
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
  );
};

// const mapStateToProps = (state) =>{
//     return {
//         user: state.userReducer.user
//     }
// }

export default /* connect(mapStateToProps, { userLogin })( */ Login;
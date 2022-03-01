import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const Register = () => {
  const { push } = useHistory();
  const [state, setState] = useState(initialState);
  const [error, setError] = useState("");

  const handleChanges = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username: state.username,
      password: state.password,
    };
    axios
      .post(
        // Register API endpoint will go here,
        user
      )
      .then((res) => {
        // console.log(res)
        push("/login");
      })
      .catch((err) => {
        // console.log(err.response.data.message)
        setError(err.response.data.message);
      });
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
    color: "#fff",
    backgroundColor: "#808000",
    fontFamily: "Outfit, sans-serif",
    margin: "0.8rem 0",
  };

  const headerStyle = {
    margin: "2rem 0",
    fontFamily: "Outfit, sans-serif",
    color: "#808000",
  };

  const textboxStyle = { margin: "0.8rem 0" };
  const iconStyle = { fontSize: "3rem" };

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}>
            {" "}
            <PersonIcon style={iconStyle} />{" "}
          </Avatar>
          <h1 style={headerStyle}>Create Account</h1>
        </Grid>

        <form onSubmit={handleSubmit}>
          <TextField
            style={textboxStyle}
            label='Username'
            type='text'
            placeholder='Enter Username'
            name='username'
            value={state.username}
            onChange={handleChanges}
            fullWidth
          />

          <TextField
            style={textboxStyle}
            label='Password'
            type='password'
            placeholder='Enter Password'
            name='password'
            value={state.password}
            onChange={handleChanges}
            fullWidth
          />

          <TextField
            style={textboxStyle}
            label='Email (optional)'
            type='email'
            placeholder='Enter Email'
            name='email'
            value={state.email}
            onChange={handleChanges}
            fullWidth
          />

          {error ? <p style={{ color: "red" }}>{error}</p> : null}

          <Button
            type='submit'
            style={buttonStyle}
            variant='contained'
            fullWidth
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Register;
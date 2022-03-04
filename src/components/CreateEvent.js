import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledBackground = styled.div`
  background-image: url("https://images.unsplash.com/photo-1475869430886-fb14585f7443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4rem auto;
`;

const StyledForm = styled.form`
  font-family: "Kaushan Script, cursive",
  display: flex;
  flex-direction: column;
  padding: 4rem;
  margin: 4rem auto 0;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 3rem;
  color: #540804;
  height: auto;
  box-shadow: 1px 1px 2px black, 0 0 25px black, 0 0 5px black;
  @media (max-width: 1000px) {
    margin: 4rem auto;
    padding: 2rem;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: row;
  margin: 5px;
  justify-content: space-between;
  height: auto;
  border-radius: 15px;
  @media (max-width: 400px) {
    flex-direction: column;
  }
`;

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px;
  justify-content: center;
  height: 20px;
`;

const CreateEvent = () => {
  const { push } = useHistory();
  const [formValues, setFromValues] = useState({
    name: "",
    organizer: "",
    date: "",
    location: "",
    guests: "",
    food: "",
  });
  const [error, setError] = useState("");

  const sendItems = (newPotluck) => {
    axiosWithAuth()
      .post(
        "https://potluck-planner-rgh.herokuapp.com/api/potlucks",
        newPotluck
      )
      .then((res) => {
        push("/events");
      })
      .catch((err) => {
        setError("There was an error");
      });
  };

  const submit = (evt) => {
    evt.preventDefault();
    const newPotluck = {
      name: formValues.name,
      organizer: formValues.organizer,
      date: formValues.date,
      location: formValues.location,
      guests: formValues.guests,
      food: formValues.food,
    };
    sendItems(newPotluck);
  };

  const handleClick = () => {
    push("/events");
  };

  const change = (evt) => {
    const { name, value } = evt.target;
    setFromValues({ ...formValues, [name]: value });
  };

  return (
    <StyledBackground>
      <StyledDiv>
        <StyledForm onSubmit={submit}>
          <h2>Start Planning</h2>
          <StyledLabel>
            <p>Name: </p>
            <input
              value={formValues.name}
              name='name'
              type='text'
              onChange={change}
              placeholder='What is your name?'
            />
          </StyledLabel>
          <StyledLabel>
            <p>Organizer: </p>
            <input
              value={formValues.organizer}
              name='organizer'
              type='text'
              onChange={change}
              placeholder='Who is organizing?'
            />
          </StyledLabel>
          <StyledLabel>
            <p>Date:</p>
            <input
              value={formValues.date}
              name='date'
              type='text'
              onChange={change}
              placeholder='What day?'
            />
          </StyledLabel>
          <StyledLabel>
            <p>Location:</p>
            <input
              value={formValues.location}
              name='location'
              type='text'
              onChange={change}
              placeholder='Where will we meet?'
            />
          </StyledLabel>
          <StyledLabel>
            <p>Add Guests: </p>
            <input
              value={formValues.guests}
              name='guests'
              type='text'
              onChange={change}
              placeholder='Who are you inviting?'
            />
          </StyledLabel>
          <StyledLabel>
            <p>Food Items:</p>
            <input
              value={formValues.food}
              name='food'
              type='text'
              onChange={change}
              placeholder='What will you bring?'
            />
          </StyledLabel>
          <StyledButton>
            <input type='submit' value='Add a Potluck' />
          </StyledButton>
          {error ? (
            <>
              <p style={{ color: "red" }}>{error}</p>
              <button onClick={handleClick}>View Events anyway</button>
            </>
          ) : null}
        </StyledForm>
      </StyledDiv>
    </StyledBackground>
  );
};

export default CreateEvent;

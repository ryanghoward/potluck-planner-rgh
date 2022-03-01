import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledBackground = styled.div`
  background-image: url("https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/Dishes_at_Potluck.jpg");
  height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 50px;
  margin: 50px auto 0;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 15px;
  color: #808000;
  height: auto;
  border: black solid 1.5px;
  @media (max-width: 1200px) {
    margin: 50px auto;
    padding: 30px;
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
      .post("", newPotluck) // Potluck API endpoint will go here
      .then((res) => {
        push("/events");
        // setFromValues({
        //     name: '',
        //     organizer: '',
        //     date: '',
        //     location: '',
        //     guests: formValues.guests,
        //     food: formValues.food,
        // })
      })
      .catch((err) => {
        setError("ya fucked up boi");
        // console.log(err)
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
    // setPotluck(potluck.concat(newPotluck))
    // setPotluck(...potluck, newPotluck)
    // setFromValues({name: '', organizer: '', date: '', location: '', guests: '', food: ''})
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

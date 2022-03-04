import React from "react";
import styled from "styled-components";
import "../App.css";

const StyledBackground = styled.div`
  background-image: url("https://images.unsplash.com/photo-1475869430886-fb14585f7443?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80");
  height: 100vh;
  background-size: cover;
  margin-top: 4rem;
`;

const StyledText = styled.div`
  color: #540804;
  width: 50vw;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5rem;
  box-shadow: 1px 1px 2px black, 0 0 25px black, 0 0 5px black;
`;

const HomePage = () => {
  return (
    <StyledBackground>
      <div className='textContainer'>
        <StyledText>
          <h1>Potluck Planner</h1>
          <p>Plan & organize your next potluck with friends & family</p>
        </StyledText>
      </div>
    </StyledBackground>
  );
};

export default HomePage;

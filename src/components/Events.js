import React, { useState, useEffect } from "react";
import axiosWithAuth from "./../utils/axiosWithAuth";
import styled from "styled-components";

import ViewEvent from "./ViewEvent";

const StyledContainer = styled.div`
  font-size: 62.5%;
  h1,
  h2,
  h3 {
    font-family: "Kaushan Script", cursive;
    color: #808000;
    padding-bottom: 10px;
  }
  p {
    font-family: "Antic", sans-serif;
  }
  padding-top: 80px;
  padding-bottom: 120px;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-color: #fbfbfb;
  background-image: url("https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2018/11/Dishes_at_Potluck.jpg");
`;

const EventsContainer = styled.div`
  width: 80%;
  padding: 3% 0;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 4rem;
  box-shadow: 1px 1px 2px black, 0 0 25px black, 0 0 5px black;
  margin: 1.5% 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
`;

const UpcomingEvents = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  text-shadow: 0px 0px 40px #ffffff;
  margin-bottom: 25px;
`;

const BasicInfo = styled.div`
  width: 30%;
  margin-left: 3%;
  text-align: left;
`;

const MoreInfo = styled.div`
  width: 60%;
  margin-right: 3%;
`;

const EventTitle = styled.h3`
  font-size: 1.8rem;
`;

const EventInfo = styled.p`
  font-size: 1.2rem;
`;

const LocationText = styled.span`
  color: grey;
  font-style: italic;
`;

const Events = () => {
  const initialEvents = [];
  const [events, setEvents] = useState(initialEvents);

  const getEvents = () => {
    axiosWithAuth()
      .get("") // Potlucks API endpoint will go here
      .then((res) => {
        // console.log(res);
        setEvents(res.data);
      })
      .catch((err) => {
        // console.log(err.response);
      });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <StyledContainer className='eventList'>
      <UpcomingEvents>Upcoming Events</UpcomingEvents>
      {events.map((event) => {
        return (
          <EventsContainer className='events'>
            <BasicInfo className='basic-info'>
              <EventTitle>{event.potluck_name}</EventTitle>
              <EventInfo>
                <b>Date: {event.date}</b>
              </EventInfo>
              <EventInfo>
                <LocationText>{event.location}</LocationText>
              </EventInfo>
            </BasicInfo>
            <MoreInfo className='more-info'>
              {<ViewEvent event={event} />}
            </MoreInfo>
          </EventsContainer>
        );
      })}
    </StyledContainer>
  );
};

export default Events;

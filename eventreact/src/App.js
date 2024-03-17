import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getAllEvents() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/event/');
        console.log(response.data); // Log the response to check data
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    getAllEvents();
  }, []);
  const csrftoken = document.cookie.match(/csrftoken=([^ ;]+)/)[1];

  const axiosInstance = axios.create({
    headers: {
      'X-CSRFToken': csrftoken,
    },
  });
  const handleLikeClick = (event, eventId) => {
    event.preventDefault();
    const updatedEvents = events.map(evt =>
      evt.id === eventId ? { ...evt, isLiked: !evt.isLiked } : evt
    );
    setEvents(updatedEvents);
  };
  

  return (
    <div className='App'>
      <h1>Event List</h1>
      {events.map(event => (
        <div key={event.id}>
          <h3>{event.event_name}</h3>
          <p>Date: {event.date}</p>
          <p>Time: {event.time}</p>
          <p>Location: {event.location}</p>
          <img src={event.image} alt="Event" />
          <FontAwesomeIcon
            icon={event.isLiked ? fasHeart : faHeart}
            style={{ color: event.isLiked ? 'red' : 'black' }}
            onClick={(e) => handleLikeClick(e, event.id)}
          />


        </div>
      ))}
    </div>
  );
}

export default App;

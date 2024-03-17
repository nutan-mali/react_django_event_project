import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Import CSS file

function App() {
  // Define state using useState hook to manage events data
  const [events, setEvents] = useState([]);
  // Use useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function to fetch all events from the API
    async function getAllEvents() {
      try {
        // Send GET request to the specified API endpoint
        const response = await axios.get('http://127.0.0.1:8000/api/event/');
        // Log the response data to the console
        console.log(response.data);
        // Update the events state with the fetched data
        setEvents(response.data);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error('Error fetching events:', error);
      }
    }

    // Call the async function to fetch events when the component mounts
    getAllEvents();
  }, []); // Empty dependency array ensures the effect runs only once

  // Define a function to handle like button click events
  const handleLikeClick = (event, eventId) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Update the events state based on the clicked event's ID
    const updatedEvents = events.map(evt =>
      evt.id === eventId ? { ...evt, isLiked: !evt.isLiked } : evt
    );
    // Update the events state with the updated data
    setEvents(updatedEvents);
  };

  // Return the JSX content of the component
  return (
    <div className='App'>
      <h1>Event List</h1> 
      {/* Map through the events array and render event cards */}
      {events.map(event => (
        <div key={event.id} className='event-card'> 
          <h3 className='event-name'>{event.event_name}</h3> 
          <p className='event-details'>Date: {event.date}</p>
          <p className='event-details'>Time: {event.time}</p>
          <p className='event-details'>Location: {event.location}</p>
          
          <FontAwesomeIcon
            icon={event.isLiked ? fasHeart : faHeart} // Use solid or regular heart icon based on isLiked state
            className='like-icon' // Apply 'like-icon' class for styling
            style={{ color: event.isLiked ? 'red' : 'black' }} // Apply red color if liked, black otherwise
            onClick={(e) => handleLikeClick(e, event.id)} // Handle click event for like button
          />
        </div>
      ))}
    </div> 
  );
}

// Export the App component as the default export
export default App;
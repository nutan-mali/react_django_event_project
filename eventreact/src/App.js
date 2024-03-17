import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className='App'>
      <h1>Event List</h1>
     {events.map(event => (
        <div>
        <h1>{event.event_name}</h1>
        <p>Date: {event.date}</p>
        <p>Time: {event.time}</p>
        <p>Location: {event.location}</p>
        <img src={event.image} alt="Event" />
        {event.is_liked ? (
          <img src="path_to_redHeart.svg" alt="Liked" className="heartIcon" />
        ) : (
          <img src="path_to_whiteHeart.svg" alt="Not Liked" className="heartIcon" />
        )}
      </div>
      ))} 
    </div>
  );
}

export default App;













// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './MyComponent/Login'; // Update the import path if necessary

// function App() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     async function getAllEvents() {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/event/');
//         console.log(response.data); // Optional: Log the response to check data
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     }

//     getAllEvents();
//   }, []);

//   return (
//     <div className='App'>
//       <h1>Event List</h1>
//       {events.map(event => (
//         <div key={event.id}>
//           <h3>{event.event_name}</h3>
//           <p>Date: {event.date}</p>
//           <p>Time: {event.time}</p>
//           <p>Location: {event.location}</p>
//           {/* Display other event details as needed */}
//         </div>
//       ))}
//     </div>
//   );
// }

// const MainApp = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// };

// export default MainApp;

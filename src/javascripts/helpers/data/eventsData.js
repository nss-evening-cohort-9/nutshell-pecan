import axios from 'axios';
import apiKeys from '../apiKeys.json';


const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const addNewEvent = eventsObject => axios.post(`${firebaseUrl}/events.json`, eventsObject);

const getEventsByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const eventsResults = results.data;
      const events = [];
      Object.keys(eventsResults).forEach((eventId) => {
        eventsResults[eventId].id = eventId;
        events.push(eventsResults[eventId]);
      });
      resolve(events);
    })
    .catch(err => reject(err));
});

const deleteEvent = eventId => axios.delete(`${firebaseUrl}/events/${eventId}.json`);

export default { getEventsByUid, deleteEvent, addNewEvent };

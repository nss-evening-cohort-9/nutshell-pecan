import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import eventsData from '../../helpers/data/eventsData';

const createNewEvent = (e) => {
  e.preventDefault();
  const newEvent = {
    eventName: document.getElementById('name').value,
    imageUrl: document.getElementById('image').value,
    eventDate: document.getElementById('date').value,
    eventLocation: document.getElementById('location').value,
    uid: firebase.auth().currentUser.uid,
  };
  eventsData.addNewEvent(newEvent)
    .then(() => {
      document.getElementById('name').value = '';
      document.getElementById('image').value = '';
      document.getElementById('date').value = '';
      document.getElementById('location').value = '';
      getEvents(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no new events for you', err));
};

const deleteEvent = (e) => {
  const eventId = e.target.closest('.eventCard').id;
  console.error(eventId);
  eventsData.deleteEvent(eventId)
    .then(() => getEvents(firebase.auth().currentUser.uid)) // eslint-disable-line no-use-before-define
    .catch(err => console.error('no deletion', err));
};

const addEvents = () => {
  document.getElementById('post-event').addEventListener('click', createNewEvent);
  const deleteButtons = document.getElementsByClassName('deleteButton');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteEvent);
  }
};

const editEvent = (e) => {
  const getCurrentId = e.target.closest('.eventCard').id;
  console.error(getCurrentId);
  document.getElementById('newEventForm').classList.add('hide');
  const editString = `
<form>
      <div>
        <label>Date</label>
        <input type="text" id="date">
        <label>Event Name</label>
        <input type="text" id="name">
        <label>Location</label>
        <input type="text" id="location">
        <label>Image</label>
        <input id="image">
        <button id="post-event">Update Event</button>
      </div>
    </form>`;
  util.printToDom('editEvent', editString);
};

const button = () => {
  const editButtons = document.getElementsByClassName('editButton');
  for (let i = 0; i < editButtons.length; i += 1) {
    editButtons[i].addEventListener('click', editEvent);
  }
};

const eventStringBuilder = (events) => {
  let domString = ' ';
  events.forEach((event) => {
    domString += `<div class="card eventCard m-2" id=${event.id} style="width: 18rem;">`;
    domString += `<h5 class="card-title">${event.eventName}</h5>`;
    domString += `<img class="card-img-top" id="event-pic" src="${event.imageUrl}" alt="Card image cap" />`;
    domString += `<p class="card-text">${event.eventDate}</p>`;
    domString += `<p class="card-text"> Locations:${event.eventLocation}</p>`;
    domString += '<button type="button" id="clicks" class="btn btn-light editButton">edit</button>';
    domString += '<button type="button" id="click" class="btn btn-light deleteButton">delete</button>';
    domString += '</div>';
    // domString += '</div>';
  });

  util.printToDom('event', domString);
  button();
  addEvents();
};


const getEvents = (uid) => {
  eventsData.getEventsByUid(uid)
    .then((events) => {
      eventStringBuilder(events);
    })
    .catch(err => console.error('no events here', err));
};


export default { getEvents };

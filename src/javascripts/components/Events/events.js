import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';
import eventsData from '../../helpers/data/eventsData';

const createNewEvent = (e) => {
  e.preventDefault();
  const newEvent = {
    name: document.getElementById('name').value,
    imageUrl: document.getElementById('image').value,
    date: document.getElementById('date').value,
    location: document.getElementById('location').value,
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


const eventStringBuilder = (events) => {
  let domString = '';
  events.forEach((event) => {
    domString += `<div class="card eventCard" id=${event.id} style="width: 18rem;">`;
    domString += `<h5 class="card-title">${event.eventName}</h5>`;
    domString += `<img class="card-img-top" src="${event.imageUrl}" alt="Card image cap">`;
    domString += `<p class="card-text">${event.eventDate}</p>`;
    domString += `<p class="card-text"> Locations:${event.eventLocation}</p>`;
    domString += '<button type="button" id="clicks" class="btn btn-light">edit</button>';
    domString += '<button type="button" id="click" class="btn btn-light deleteButton">delete</button>';
    domString += '</div>';
    domString += '</div>';
  });

  util.printToDom('events-div', domString);
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

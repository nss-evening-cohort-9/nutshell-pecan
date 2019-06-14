import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getDiaryByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diary.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const diaryData = results.data;
      const diaryArray = [];
      Object.keys(diaryData).forEach((diaryId) => {
        diaryData[diaryId].id = diaryId;
        diaryArray.push(diaryData[diaryId]);
      });
      resolve(diaryArray);
      console.error(diaryArray);
    })
    .catch(err => reject(err));
});

const addNewEntry = diaryObject => axios.post(`${firebaseUrl}/diary.json`, diaryObject);

const deleteEntry = diaryId => axios.delete(`${firebaseUrl}/diary/${diaryId}.json`);

export default { getDiaryByUid, addNewEntry, deleteEntry };

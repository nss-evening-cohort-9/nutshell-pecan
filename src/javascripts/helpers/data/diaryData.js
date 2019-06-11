import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getDiaryByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diary.json`)
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

export default { getDiaryByUid };
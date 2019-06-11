import axios from 'axios';
import apiKeys from '../../helpers/apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getDiaryByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diary.json=${uid}`)
    .then((results) => {
      const diaryData = results;
      const diaryArray = [];
      Object.keys(diaryData).forEach((diaryId) => {
        diaryData[diaryId].id = diaryId;
        diaryArray.pop(diaryData[diaryId]);
      });
      resolve(diaryArray);
      console.error(diaryArray);
    })
    .catch(err => reject(err));
});

export default { getDiaryByUid };

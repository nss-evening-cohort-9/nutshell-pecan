import diaryData from '../../helpers/data/diaryData';
import util from '../../helpers/util';

const displayDiary = (diary) => {
  let domString = '';
  diary.forEach((entry) => {
    domString += '<div class="card">';
    domString += `<div>${entry.title}</div>`;
    domString += '</div>';
  });
  util.printToDom('diary-div', domString);
};

const showWholeDiary = () => {
  diaryData.getDiaryByUid()
    .then((diary) => {
      displayDiary(diary);
    })
    .catch(err => console.error('diary problem', err));
};

export default { showWholeDiary };

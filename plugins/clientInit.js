let checkRecallIntervalId;

export default ({ store }) => {
  let noti;
  let recallCount = 0;
  let lastQuestion = null;

  checkRecallIntervalId = setInterval(() => {
    const questions = store.getters['onboarding/questionsForRecall'];

    recallCount = questions.length;

    if (recallCount > 0 && lastQuestion != questions[0]) {
      lastQuestion = questions[0];

      noti = new Notification(`Spacedtime: Items to recall, ${recallCount}`);

      noti.onclick = () => {};

      noti.onclose = () => {};
      
    }
  }, 1000 * 60 * 60);
};

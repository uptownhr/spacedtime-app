const fakeQuestions = [
  {
    question: "When is my mother's birthday?",
    answer: "1"
  },
  {
    question: 'When is my anniversary?',
    answer: "2"
  },
  {
    question: "When is my mother's birthday?",
    answer: "3"
  },
  {
    question: 'When is my anniversary?',
    answer: "4"
  },
  {
    question: "When is my mother's birthday?",
    answer: "5"
  },
  {
    question: 'When is my anniversary?',
    answer: "6"
  }
];

function createQuestion(question) {
  return {
    question: question.question,
    answer: question.answer || '',
    streak: 1
  };
}

export const state = {
  questionsAdded: fakeQuestions.map(q => createQuestion(q))
};

export const mutations = {
  addQuestions(state, questions) {
    const newQuestions = questions.map(q => createQuestion(q));

    state.questionsAdded = [...state.questionsAdded, ...newQuestions];
  },

  saveAnswer(state, { question, answer }) {
    question.answer = answer;
  },

  setQuestionStreak(state, { question, streak }) {
    question.streak = streak;
  }
};

export const getters = {
  questionsAdded(state) {
    return state.questionsAdded;
  }
};

export const actions = {
  addQuestions({ commit }, questions) {
    commit('addQuestions', questions);
  },

  saveAnswer({ commit }, { question, answer }) {
    commit('saveAnswer', { question, answer });
  },

  setQuestionStreak({ commit }, { question, streak }) {
    commit('setQuestionStreak', { question, streak });
  }
};

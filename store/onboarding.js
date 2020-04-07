function createQuestion(question) {
  return {
    question: question.question,
    answer: '',
  };
}

export const state = {
  questionsAdded: [],
};

export const mutations = {
  addQuestions(state, questions) {
    const newQuestions = questions.map((q) => createQuestion(q));

    state.questionsAdded = [...state.questionsAdded, ...newQuestions];
  },

  saveAnswer(state, { question, answer }) {
    question.answer = answer;
  },
};

export const getters = {
  questionsAdded(state) {
    return state.questionsAdded;
  },
};

export const actions = {
  addQuestions({ commit }, questions) {
    commit('addQuestions', questions);
  },

  saveAnswer({ commit }, { question, answer }) {
    commit('saveAnswer', { question, answer });
  },
};

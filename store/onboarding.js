import fibonacci from 'fibonacci';
import add from 'date-fns/add';

const storedQuestionsString = localStorage.getItem('questionsAdded');

const storedQuestions = storedQuestionsString
  ? JSON.parse(storedQuestionsString)
  : [];

function createQuestion(question) {
  return {
    question: question.question,
    answer: question.answer || '',
    streak: question.streak || 1,
    askAgainDate: question.askAgainDate || null
  };
}

export const state = {
  questionsAdded: storedQuestions.map(q => createQuestion(q))
};

export const mutations = {
  addQuestions(state, questions) {
    const newQuestions = questions.map(q => createQuestion(q));

    state.questionsAdded = [...state.questionsAdded, ...newQuestions];
  },

  saveAnswer(state, { question, answer }) {
    question.answer = answer;
  },

  setQuestionStreak(state, { question, streak, askAgainDate }) {
    question.streak = streak;
    question.askAgainDate = askAgainDate;
  }
};

export const getters = {
  questionsAdded(state) {
    return state.questionsAdded;
  },

  questionsForRecall(state, getters) {
    console.log('getters', getters);
    return getters['questionsAdded']
      .filter(q => q.answer)
      .filter(q => {
        if (!q.askAgainDate) return true;

        return new Date(q.askAgainDate).getTime() < Date.now();
      });
  },

  questionAnswerNeeded(state, getters) {
    return getters['questionsAdded'].filter(q => !q.answer);
  },

  nextQuestion(state, getters) {
    return getters['questionsAdded']
      .filter(q => q.answer)
      .reduce((first, q) => {
        if (!first) return q;

        return q.askAgainDate < first.askAgainDate ? q : first;
      }, null);
  }
};

export const actions = {
  addQuestions({ commit, state }, questions) {
    commit('addQuestions', questions);

    const { questionsAdded } = state;

    saveToLocalStorage(questionsAdded);
  },

  saveAnswer({ commit, state }, { question, answer }) {
    commit('saveAnswer', { question, answer });

    const { questionsAdded } = state;

    saveToLocalStorage(questionsAdded);
  },

  setQuestionStreak({ commit, state }, { question, streak }) {
    const { number } = fibonacci.iterate(streak || 1);
    const askAgainDate = add(Date.now(), { minutes: number });

    commit('setQuestionStreak', { question, streak, askAgainDate });

    const { questionsAdded } = state;

    saveToLocalStorage(questionsAdded);
  }
};

function saveToLocalStorage(questions) {
  localStorage.setItem('questionsAdded', JSON.stringify(questions));
}

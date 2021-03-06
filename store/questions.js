import fibonacci from 'fibonacci';
import add from 'date-fns/add';
import uuid from 'uuid/v4'

function getLocalStorageQuestions () {
  const data = localStorage.getItem('questionsAdded');

  if (!data) return []

  let json

  try {
    json = JSON.parse(data)
  } catch (e) {
    console.log('e', e, data)
    json = []
  }

  return json
}

const storedQuestions = getLocalStorageQuestions()

const createdQuestions = storedQuestions.map(createQuestion)
const byId = createdQuestions.reduce((byId, q) => {
  if (byId[q.id]) {
    //duplicate, recreate uuid
    q.id = uuid()
  }
  
  byId[q.id] = q

  return byId
}, {})

function createQuestion(question) {
  const id = question.id ? question.id : uuid()

  return {
    id,
    question: question.question,
    answer: question.answer || '',
    streak: question.streak || 1,
    askAgainDate: question.askAgainDate || null,
  };
}

export const state = () => ({
  _byId: byId,
  questions: createdQuestions,
});

export const mutations = {
  delete (state, id) {
    delete state._byId[id]

    const index = state.questions.findIndex(q => q.id == id)
    state.questions.splice(index, 1)
  },

  addQuestions(state, questions) {
    const newQuestions = questions.map((q) => createQuestion(q));
    console.log(...newQuestions)
    state.questions.push(...newQuestions)

    newQuestions.forEach((q) => {
      state._byId[q.id] = q;
    });
  },
  
  saveQuestionAnswer(state, {id, question, answer}){
    const q = state._byId[id]

    q.question = question
    q.answer = answer
  },

  saveAnswer(state, { id, answer }) {
    console.log('saving', id)
    const question = state._byId[id];
    console.log('q', question)
    question.answer = answer;

    console.log('saved', question)
  },

  setQuestionStreak(state, { id, streak, askAgainDate }) {
    console.log('streak', id)
    const question = state._byId[id];
    console.log('q', question)
    question.streak = streak;
    question.askAgainDate = askAgainDate;
  },
};

export const getters = {
  byId (state) {
    return (id) => {
      return state._byId[id]
    }
  },

  questionsAdded(state) {
    return state.questions;
  },

  questionsForRecall(state, getters) {
    return getters['questionsAdded']
      .filter((q) => q.answer)
      .filter((q) => {
        if (!q.askAgainDate) return true;

        return new Date(q.askAgainDate).getTime() < Date.now();
      });
  },

  questionAnswerNeeded(state, getters) {
    return getters['questionsAdded'].filter((q) => !q.answer);
  },

  nextQuestion(state, getters) {
    return getters['questionsAdded']
      .filter((q) => q.answer)
      .reduce((first, q) => {
        if (!first) return q;

        return q.askAgainDate < first.askAgainDate ? q : first;
      }, null);
  },
};

export const actions = {
  addQuestions({ commit, state }, questions) {
    commit('addQuestions', questions);

    saveToLocalStorage(state.questions);
  },

  saveQuestionAnswer({commit, state}, {id, question, answer}) {
    commit('saveQuestionAnswer', {id, question, answer})

    saveToLocalStorage(state.questions);
  },

  saveAnswer({ commit, state }, { id, answer }) {
    commit('saveAnswer', { id, answer });
    
    saveToLocalStorage(state.questions);
  },

  setQuestionStreak({ commit, state }, { id, streak }) {
    const { number } = fibonacci.iterate(streak || 1);
    const askAgainDate = add(Date.now(), { minutes: number });

    commit('setQuestionStreak', { id, streak, askAgainDate });

    saveToLocalStorage(state.questions);
  },

  delete ({commit}, {id}) {
    commit('delete', id)

    saveToLocalStorage(state.questions);
  }
};

function saveToLocalStorage(questions) {
  localStorage.setItem('questionsAdded', JSON.stringify(questions));
}
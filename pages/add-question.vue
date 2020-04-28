<template>
  <div>
    <h1>Add a question</h1>

    <form @submit.prevent="submit(form)">
      <label>Question</label>
      <input v-model="form.question" type="quesiton" />
      <label>Answer</label>
      <input v-model="form.answer" type="answer" />
      <button>Add</button>
    </form>
  </div>
</template>


<script>
export default {
  data () {
    return {
      form: {
        question: '',
        answer: ''
      }
    }
  },

  methods: {
    submit ({question, answer}) {
      this.$store.dispatch('questions/addQuestions', [{question, answer}])
      this.$router.push('/')
    }
  }
}
</script>
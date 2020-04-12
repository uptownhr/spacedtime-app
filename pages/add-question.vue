<template>
  <div>
    <h1>Add a question</h1>

    <form @submit.prevent="submit(form)">
      <input v-model="form.question" type="quesiton" />
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
      this.$store.dispatch('onboarding/addQuestions', [{question, answer}])
      this.$router.push('/')
    }
  }
}
</script>
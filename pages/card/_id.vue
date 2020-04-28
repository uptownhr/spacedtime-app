<template>
  <section>
    <header>
      <h1>Edit Card</h1>
    </header>

    <form @submit.prevent="submit(form)">
      <label>Question</label>
      <input v-model="form.question" type="quesiton" />
      <label>Answer</label>
      <input v-model="form.answer" type="answer" />
      <button>Save</button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      form: {
        question: '',
        answer: '',
      },
    };
  },

  mounted() {
    const question = this.$store.getters['questions/byId'](
      this.$route.params.id
    );
    this.form.question = question.question;
    this.form.answer = question.answer;
  },

  methods: {
    submit({ question, answer }) {
      this.$store.dispatch('questions/saveQuestionAnswer', {
        question,
        answer,
        id: this.$route.params.id,
      })
      .then(res => {
        alert('Saved')
        this.$router.go(-1)
      })
    },
  },
};
</script>

<template>
  <section>
    <table>
      <thead>
        <tr>
          <th>Question</th>
          <th>Streak</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" :key="question.id">
          <td>{{ question.question }}</td>
          <td>{{ question.streak }}</td>
          <td>
            <nuxt-link :to="`/card/${question.id}`"><b>Edit</b></nuxt-link>
            <a @click="deleteQuestion(question.id)"><em>Delete</em></a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import CardQuestion from '@/components/CardQuestion.vue';

export default {
  components: { CardQuestion },

  computed: {
    questions() {
      return this.$store.getters['questions/questionsAdded'];
    },
  },

  methods: {
    deleteQuestion(id) {
      this.$store.dispatch('questions/delete', {id})
    }
  }
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
}
</style>
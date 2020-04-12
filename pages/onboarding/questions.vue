<template>
  <section>
    <h1>What would you like to remember?</h1>

    <div class="card-container">
      <CardQuestion
        v-for="(question, index) in questionTemplates"
        :key="index"
        :question="question"
        :disabled="cardAdded(question)"
        @added="addCard"
      />
    </div>

    <div v-if="cardsAdded.length > 0" class="footer-fixed">
      <button @click="next">Fill out answers ({{cardsAdded.length}})</button>
    </div>
  </section>
</template>

<script>
import CardQuestion from '@/components/CardQuestion';

export default {
  components: { CardQuestion },
  data() {
    return {
      questionTemplates: [
        {
          question: "When is my mother's birthday?",
        },
        {
          question: 'When is my anniversary?',
        },
        {
          question: "When is my mother's birthday?",
        },
        {
          question: 'When is my anniversary?',
        },
        {
          question: "When is my mother's birthday?",
        },
        {
          question: 'When is my anniversary?',
        },
      ],

      cardsAdded: [],
    };
  },

  methods: {
    addCard(card) {
        console.log('addCard', card)
      this.cardsAdded.push(card);
    },

    cardAdded(card) {
      return this.cardsAdded.some((c) => c == card);
    },

    next() {
        this.$store.dispatch('onboarding/addQuestions', this.cardsAdded)
        this.$router.push('answers')
    },
  },
};
</script>

<style scoped>
.footer-fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: white;
}
</style>
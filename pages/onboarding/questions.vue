<template>
  <div>
    <section>
      <header>
        <h2>What would you like to remember?</h2>
      </header>

      <CardQuestion
        v-for="(question, index) in questionTemplates"
        :key="index"
        :question="question"
        :disabled="cardAdded(question)"
        @added="addCard"
      />
    </section>

    <section v-if="cardsAdded.length > 0" class="footer-fixed">
      <button @click="next">Fill out answers ({{ cardsAdded.length }})</button>
    </section>
  </div>
</template>

<script>
import CardQuestion from '@/components/CardQuestion';
import questionTemplates from '@/lib/questionTemplates'
import {track} from '@/lib/track'

export default {
  components: { CardQuestion },
  data() {
    return {
      questionTemplates,
      cardsAdded: []
    };
  },

  mounted() {
    if (this.$store.getters['onboarding/questionsAdded'].length > 0)
      return this.$router.push('/');
  },

  methods: {
    addCard(card) {
      console.log('addCard', card);
      this.cardsAdded.push(card);
      
      track('question-added', card.question)
    },

    cardAdded(card) {
      return this.cardsAdded.some(c => c == card);
    },

    next() {
      this.$store.dispatch('onboarding/addQuestions', this.cardsAdded);
      this.$router.push('./answers');
    }
  }
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

<template>
  <div>
    <section>
      <card-recall-summary 
        :itemCount="questions.length" 
        :nextRecallDate="nextRecallDate"
      />
    </section>

<section>
  <nuxt-link tag="button" to="/add-question">Add Custom Question</nuxt-link>
</section>

    <hr />

    <section>
      <header>
        <h2>Choose more questions from the marketplace</h2>
      </header>
      <CardQuestion
        v-for="(question, index) in questionTemplates"
        :key="index"
        :question="question"
        :disabled="cardAdded(question)"
        @added="addCard"
      />
    </section>
  </div>
</template>

<script>
import CardRecallSummary from '@/components/CardRecallSummary.vue';
import CardQuestion from '@/components/CardQuestion.vue'

export default {
  components: { CardRecallSummary, CardQuestion },

  data () {
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
    }
  },

  computed: {
    questions() {
      return this.$store.getters['onboarding/questionsForRecall']
    },

    nextRecallDate () {
      console.log(this.$store.getters['onboarding/nextQuestion'])


      
      return new Date(this.$store.getters['onboarding/nextQuestion'].askAgainDate)
    }
  },

  methods: {
    addCard (question) {
      this.$store.dispatch('onboarding/addQuestions', [question])
      this.$router.push('/onboarding/answers')
    },

    cardAdded (question) {
      return false
    }
  }
};
</script>

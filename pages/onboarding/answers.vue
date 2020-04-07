<template>
  <div>
    <span>{{ questionIndex + 1 }}/{{ questions.length }}</span>

    <CardAnswer
      :key="questionIndex"
      :question="questions[questionIndex]"
      @answer="handleNext"
    />
  </div>
</template>

<script>
import CardAnswer from '@/components/CardAnswer';

export default {
  components: { CardAnswer },
  data() {
    return {
      questionIndex: 0,
    };
  },

  computed: {
    questions() {
      return this.$store.getters['onboarding/questionsAdded'];
    },
  },

  methods: {
    handleNext({ question, answer }) {
      this.$store.dispatch('onboarding/saveAnswer', { question, answer });
    
      if (this.questionIndex < this.questions.length - 1) return this.questionIndex++;

      this.$router.push('./')
    },
  },
};
</script>

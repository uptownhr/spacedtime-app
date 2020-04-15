<template>
  <section>
    <header>
      <span>{{ questionIndex + 1 }}/{{ questions.length }}</span>
    </header>

    <CardAnswer
      v-if="mounted"
      :key="questionIndex"
      :question="questions[questionIndex]"
      @answer="handleNext"
    />
  </section>
</template>

<script>
import CardAnswer from '@/components/CardAnswer';

export default {
  components: { CardAnswer },
  data() {
    return {
      questionIndex: 0,
      questions: [],
      mounted: false
    };
  },

  mounted () {
    this.mounted = true
    this.questions = this.$store.getters['onboarding/questionAnswerNeeded'];
  },

  methods: {
    handleNext({ question, answer }) {
      this.$store.dispatch('onboarding/saveAnswer', { question, answer });
    
      if (this.questionIndex < this.questions.length - 1) return this.questionIndex++;

      this.$router.push('/')
    },
  },
};
</script>

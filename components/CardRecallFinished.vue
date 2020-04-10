<template>
  <div>
    <h1>You're all caught up</h1>
    <button @click="$router.push('/')">Done</button>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    currentIndex: Number,
    totalRecallCount: Number
  },

  data() {
    return {
      reveal: false,
      submitted: false
    };
  },

  methods: {
    handleResult(result) {
      const streakModifier = result ? 1 : -1

      this.submitted = true

      this.$store.dispatch('onboarding/setQuestionStreak', {
        question: this.question,
        streak: this.question.streak + streakModifier
      });
    }
  }
};
</script>

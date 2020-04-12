<template>
  <aside>
    <span>{{ currentIndex + 1 }} / {{ totalRecallCount }}</span>
    
    <h1 v-if="!reveal">{{ question.question }}</h1>
    <h1 v-else>{{ question.answer }}</h1>

    <button v-if="!reveal" @click="reveal = true">Reveal</button>
    <template v-else-if="!submitted">
      <button :disabled="submitted" @click="handleResult(false)">No</button>
      <button :disabled="submitted" @click="handleResult(true)">Yes</button>
    </template>
    <button v-else @click="$emit('next')">
      Next
    </button>
  </aside>
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

<template>
  <div class="card">
    <h2>{{ question.question }}</h2>
    
    <input v-model="answer" type="text" />

    <button :disabled="!answer" @click="handleNext(question, answer)">Next</button>
  </div>
</template>

<script>
export default {
    props: {
        question: Object
    },

    data () {
      return {
        answer: ''
      }
    },

    methods: {
      handleNext (question, answer) {
        this.$emit('answer', {question, answer})
      }
    }
}
</script>
<template>
  <section>
    <card-recall 
      v-for="(question, index) in questions"
      v-show="index === currentIndex"
      :key="index"
      :question="question"
      :totalRecallCount="questions.length"
      :currentIndex="index"
      @next="handleNext"
    />

    <card-recall-finished 
      v-if="currentIndex == questions.length"
    />
  </section>
</template>

<script>
import CardRecall from '@/components/CardRecall'
import CardRecallFinished from '@/components/CardRecallFinished'

export default {
  components: {CardRecall, CardRecallFinished},

  data () {
    return {
      currentIndex: 0,
      questions: []
    }
  },

  mounted () {
    this.questions = this.$store.getters['questions/questionsForRecall']
  },

  methods: {
    handleNext () {
      this.currentIndex++
    }
  }
}
</script>
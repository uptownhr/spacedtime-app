<template>
  <div>
    reaclling xxxx {{questions}}
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
  </div>
</template>

<script>
import CardRecall from '@/components/CardRecall'
import CardRecallFinished from '@/components/CardRecallFinished'

export default {
  components: {CardRecall, CardRecallFinished},

  data () {
    return {
      currentIndex: 0
    }
  },

  computed: {
    questions () {
      return this.$store.getters['onboarding/questionsAdded']
    }
  },

  methods: {
    handleNext () {
      this.currentIndex++
    }
  }
}
</script>
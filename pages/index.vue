<template>
  <div>
    <h1>new index</h1>
    <card-recall-summary :itemCount="2" />
  </div>
</template>

<script>
import CardRecallSummary from '@/components/CardRecallSummary.vue';

export default {
  components: { CardRecallSummary }
};
</script>

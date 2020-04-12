<template>
  <aside>
    <h3>You have {{ itemCount }} cards to recall</h3>

    <p v-if="itemCount > 0">
      Start your recall session now.
      <button v-if="itemCount !== 0" @click="$router.push('/recall-cards')">
        Go Recall
      </button>
    </p>

    <p v-else>
      All your cards have been recalled. You'll be notified to recall again in {{againIn}}
    </p>
  </aside>
</template>

<script>
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default {
  props: {
    itemCount: Number,
    nextRecallDate: Date
  },

  computed: {
    againIn() {
      return formatDistanceToNow(this.nextRecallDate)
    }

  }
};
</script>

<template>
  <div class="card">
    <h2>{{ question.question }}</h2>
    <button @click="$emit('added', question)" :disabled="disabled">
      Add
    </button>
  </div>
</template>

<script>
export default {
    props: {
        question: Object,
        disabled: Boolean
    }
}
</script>
<template>
  <aside>
    <h2>{{ question.question }}</h2>
    <button @click="$emit('added', question)" :disabled="disabled">
      Add
    </button>
  </aside>
</template>

<script>
export default {
    props: {
        question: Object,
        disabled: Boolean
    }
}
</script>

<style scoped>
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>
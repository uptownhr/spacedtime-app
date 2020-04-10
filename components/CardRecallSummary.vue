<template>
  <div style="border: 1px solid green">
    items to recall {{itemCount}}

    <button @click="$router.push('/recall-cards')">Go Recall</button>
  </div>
</template>

<script>
export default {
  props: {
    itemCount: Number
  }
}
</script>
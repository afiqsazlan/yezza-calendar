<template>
  <v-container class="px-8 pt-10">

    <v-row class="align-center justify-space-between">
      <h1>
        {{ pageTitle }}
      </h1>
      <slot name="upperRightCorner"></slot>
    </v-row>

    <div class="pt-6">
      <slot></slot>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AppLayout",
  props: {
    pageTitle: {
      type: String,
      required: false
    }
  }
}
</script>

<style scoped>

</style>

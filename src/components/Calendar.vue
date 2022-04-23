<template>
  <v-container>
    <v-row class="align-center mb-4">
      <v-select></v-select>
      <v-btn text small>
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn text small>
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-sheet>
      <v-calendar
          ref="calendar"
          v-model="selectedDate"
          :weekdays="weekdaysFormat"
          type="month"
          color="blue"
      ></v-calendar>
    </v-sheet>
  </v-container>

</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      selectedDate: null,
      weekdaysFormat: [1, 2, 3, 4, 5, 6, 0]
    }
  }
}
</script>

<style scoped>

</style>

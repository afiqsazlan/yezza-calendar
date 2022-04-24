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
    <v-sheet height="300"
             color="#F4F4F4"
             id="v-sheet-calendar"
    >
      <v-calendar
          ref="calendar"
          v-model="selectedDate"
          :weekdays="weekdaysFormat"
          type="month"
          :color=selectedDateColor
          :show-month-on-first="false"
      >

        <template v-slot:day="{date}">
          <template v-if="isBlockedDate(date)">
            <v-row class="v-blocked-date  py-1   justify-center">
              <div>.</div>
            </v-row>
          </template>
          <template v-if="isReservedDate(date)">
            <v-row class="v-reserved-date py-1  justify-center">
              <v-icon>mdi-circle-small</v-icon>
            </v-row>
          </template>
        </template>

        <!--
        <template v-slot:event="{event}">
                  <v-row class="fill-height justify-center"
                         :class="event.class"
                  >
                    <template  v-if="event.name === 'reserved'">
                      <v-icon>mdi-circle-small</v-icon>
                    </template>
                  </v-row>
                </template>
                -->

      </v-calendar>
    </v-sheet>
  </v-container>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "Calendar",
  computed: {
    ...mapState('calendar', [
        'selectedDateColor',
        'weekdaysFormat',
        'selectedDate'
    ]),
    events() {
      return this.$store.getters["calendar/events"];
    }
  },

  mounted() {
    this.$store.dispatch('calendar/fetchBlockedDates');
    this.$store.dispatch('calendar/fetchReservedDates');

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'calendar/updateReservedDates') {
        this.addClassToReservedDateCards()
      }
      if (mutation.type === 'calendar/updateBlockedDates') {
        this.addClassToBlockedDateCards()
      }
    })

  },

  methods: {
    isBlockedDate(date) {
      return this.$store.state.calendar.blockedDates.includes(date);
    },
    isReservedDate(date) {
      return this.$store.state.calendar.reservedDates.includes(date);
    },
    async addClassToReservedDateCards() {
      const reservedDates = document.getElementsByClassName('v-reserved-date')

      for (let i = 0; i < reservedDates.length; i++) {
        const date = reservedDates[i];
        const parent = date.closest('.v-calendar-weekly__day');
        parent.className += ' v-reserved-date-card'
        console.log({parent})
      }
      console.log({reservedDates})
    },
    async addClassToBlockedDateCards() {
      const blockedDates = document.getElementsByClassName('v-blocked-date')

      for (let i = 0; i < blockedDates.length; i++) {
        const date = blockedDates[i];
        const parent = date.closest('.v-calendar-weekly__day');
        parent.className += ' v-blocked-date-card'
        console.log({parent})
      }
      console.log({blockedDates})
    }
  },
}
</script>

<style>

.theme--light.v-calendar-weekly {
  border: none !important;
}

div.v-blocked-date-card {
  background-color: #EAEAEA;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__head-weekday {
  background-color: #F4F4F4 !important;
  border-right: none !important;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day {
  border-right: 0 !important;
}
.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside button {
  color: #C1C1C1;
  font-weight: lighter;
}




.slashed{
  border-bottom: 1px solid red;
  width: 50%;
  transform: rotate(45deg);
  transform-origin: top left;
}
</style>

<template>
  <v-container>
    <v-row class="mb-5 align-center  justify-space-between ">
      <div class=" ml-5 font-weight-bold">
        {{ currentMonthName }} {{ currentYear }}
      </div>
      <div class="right-text mr-2">
        <v-btn @click="$refs.calendar.prev()"
               class="calendar-navigation-arrow"
               text
               small
        >
          <v-icon color="#3E3E3E" dense>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn @click="$refs.calendar.next()"
               class="calendar-navigation-arrow"
               text
               small
        >
          <v-icon color="#3E3E3E" dense>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </v-row>

    <v-sheet height="270"
             color="#F4F4F4"
             id="v-sheet-calendar"
    >
      <v-calendar
          ref="calendar"
          v-model="presentViewDate"
          :weekdays="weekdays"
          :weekday-format="getFormattedWeekday"
          type="month"
          :color="todayColor"
          :show-month-on-first="false"
          @change="onCalendarChanged"
          @click:date="onDateClicked"
      >

        <template v-slot:day="{date}">
          <template v-if="isBlockedDate(date)">
            <v-row class="v-blocked-date justify-center">
              <div class="fill-height"></div>
            </v-row>
          </template>
          <template v-if="isReservedDate(date)">
            <v-row class="v-reserved-date py-1  justify-center">
              <v-icon>mdi-circle-small</v-icon>
            </v-row>
          </template>
          <template v-if="isSelectedDate(date)">
            <v-row class="v-selected-date justify-center">
              <div class="fill-height"></div>
            </v-row>
          </template>
        </template>

      </v-calendar>
    </v-sheet>
  </v-container>

</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "Calendar",
  data() {
    return {
      presentViewDate: null
    }
  },
  computed: {
    ...mapState('calendar', [
      'todayColor',
      'weekdays',
      'currentMonthName',
      'currentYear',
      'selectedDate'
    ]),
    ...mapGetters('calendar', [
      'getFormattedWeekday'
    ]),
    events() {
      return this.$store.getters["calendar/events"];
    }
  },

  mounted() {
    this.$store.dispatch('calendar/fetchBlockedDates');
    this.$store.dispatch('calendar/fetchReservedDates');
    this.$store.dispatch('calendar/setSelectedDateFromLocalStorage')

    this.$refs.calendar.checkChange();

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'calendar/updateReservedDates') {
        this.addClassToReservedDateCards()
      }
      if (mutation.type === 'calendar/updateBlockedDates') {
        this.addClassToBlockedDateCards()
      }
      if (mutation.type === 'calendar/updateSelectedDate') {
        this.updateSelectedDateCardClassList()
      }
    })
  },

  updated() {
    this.addClassToBlockedDateCards()
    this.updateSelectedDateCardClassList()
  },

  methods: {
    isBlockedDate(date) {
      return this.$store.state.calendar.blockedDates.includes(date);
    },
    isReservedDate(date) {
      return this.$store.state.calendar.reservedDates.includes(date);
    },
    isSelectedDate(date) {
      return this.$store.state.calendar.selectedDate === date;
    },
    async addClassToReservedDateCards() {
      const reservedDateElements = document.getElementsByClassName('v-reserved-date')

      for (let i = 0; i < reservedDateElements.length; i++) {
        const date = reservedDateElements[i];
        const parent = date.closest('.v-calendar-weekly__day');
        parent.classList.add('v-reserved-date-card');
      }
    },
    async addClassToBlockedDateCards() {
      const blockedDateElements = document.getElementsByClassName('v-blocked-date')

      for (let i = 0; i < blockedDateElements.length; i++) {
        const date = blockedDateElements[i];
        const parent = date.closest('.v-calendar-weekly__day');
        parent.classList.add('v-blocked-date-card');
      }
    },

    async updateSelectedDateCardClassList() {

      const selectedDateCardElements = document.getElementsByClassName('v-selected-date-card');

      for (let i = 0; i < selectedDateCardElements.length; i++) {
        const element = selectedDateCardElements[i];
        element.classList.remove('v-selected-date-card');
      }

      const selectedDateElement = document.getElementsByClassName('v-selected-date')[0];

      if (selectedDateElement) {
        const parent = selectedDateElement.closest('.v-calendar-weekly__day');
        parent.classList.add('v-selected-date-card')
      }
    },

    onCalendarChanged(payload) {
      this.$store.dispatch('calendar/setCurrentMonth', payload.start.month)
      this.$store.dispatch('calendar/setCurrentYear', payload.start.year)
    },

    onDateClicked(payload) {
      this.$store.dispatch('calendar/setSelectedDate', payload.date);
    },
  },
}
</script>

<style>

.theme--light.v-calendar-weekly {
  border: none !important;
}

div.v-calendar-weekly__week {
  background-color: #F4F4F4;
}

div.v-calendar-weekly__head-weekday {
  background-color: #F4F4F4;
  color: #19181A !important;
  font-weight: bold;
  border-right: none !important;
  text-transform: capitalize;
  font-size: 13px;
}

div.v-calendar-weekly__head-weekday.v-outside {
  background-color: #F4F4F4;
  color: #19181A !important;
  font-weight: bold;
  border-right: none !important;
}

div.v-calendar-weekly__day-label {
  padding: 0;
}

button.v-btn--fab.v-size--small {
  height: 30px;
  width: 30px;
}

button.v-btn--active::before {
  background-color: transparent;
}

.theme--light.v-calendar-weekly.v-calendar-weekly__head-weekday {
  background-color: #F4F4F4 !important;
  border-right: none !important;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day {
  border-right: 0 !important;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside {
  background-color: #F4F4F4 !important;
}

.theme--light.v-calendar-weekly .v-calendar-weekly__day.v-outside button {
  color: #C1C1C1;
  font-weight: lighter;
}

div.v-calendar-weekly__day.v-present .v-calendar-weekly__day-label .v-btn__content {
  color: #6153FF;
}

.slashed {
  border-bottom: 1px solid red;
  width: 50%;
  transform: rotate(45deg);
  transform-origin: top left;
}

button.calendar-navigation-arrow::before {
  background-color: transparent;
}


div.v-calendar-weekly__day.v-blocked-date-card {
  background-color: #EAEAEA;
}

div.v-calendar-weekly__day.v-blocked-date-card .v-btn__content {
  color: #C1C1C1;
}

div.v-calendar-weekly__day .v-blocked-date {
  background-color: #EAEAEA;
}

div.v-calendar-weekly__day.v-selected-date-card .v-btn__content {
  background-color: #333333;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  color: #FFFFFF;
}

</style>

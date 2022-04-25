import axios from "axios";

const Calendar = {
    namespaced: true,
    state: () => ({
        todayColor: 'transparent',
        currentMonthName: null,
        currentYear: null,
        selectedDate: null,
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        weekdaysShortNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        reservedDates: [],
        blockedDates: []
    }),
    mutations: {
        updateReservedDates(state, dates) {
            state.reservedDates = dates;
        },
        updateBlockedDates(state, dates) {
            state.blockedDates = dates;
        },
        updateCurrentMonthName(state, monthName) {
            state.currentMonthName = monthName;
        },
        updateCurrentYear(state, year) {
            state.currentYear = year;
        },
        updateSelectedDate(state, date) {
            state.selectedDate = date;
            localStorage.setItem('selectedDate', date);
        }
    },
    actions: {
        async fetchReservedDates({commit}) {

            try {
                const response = await axios.get('https://interviewtest.free.beeceptor.com/calendar/reserved_dates')
                commit('updateReservedDates', response.data)
            } catch (e) {
                if (e.response.status === 429) {
                    const dates = [
                        "2022-04-07",
                        "2022-04-15",
                        "2022-05-08"
                    ]
                    commit('updateReservedDates', dates)
                }
            }
        },
        async fetchBlockedDates({commit}) {
            try {
                const response = await axios.get('https://interviewtest.free.beeceptor.com/calendar/blocked_dates')
                commit('updateBlockedDates', response.data)
            } catch (e) {
                if (e.response.status === 429) {
                    const dates = [
                        "2022-04-04",
                        "2022-04-05",
                        "2022-04-06",
                        "2022-04-30",
                        "2022-05-01",
                        "2022-05-02",
                        "2022-05-03"
                    ]
                    commit('updateBlockedDates', dates)
                }
            }
        },
        setCurrentMonth({state, commit}, monthIndex) {

            return new Promise((resolve, reject) => {
                const monthName = state.monthNames[monthIndex - 1];

                if (monthName) {
                    commit('updateCurrentMonthName', monthName)
                    resolve();
                } else {
                    reject();
                }
            });

        },
        setCurrentYear({commit}, year) {
            commit('updateCurrentYear', year)
        },
        setSelectedDate({commit}, date) {
            commit('updateSelectedDate', date)
        },
        setSelectedDateFromLocalStorage({commit}) {
            const date = localStorage.getItem('selectedDate');
            if (date !== 'undefined') commit('updateSelectedDate', date)
        }
    },
    getters: {
        getFormattedWeekday: (state) => ({date}) => {
            const dayIndex = new Date(date).getDay(date);
            return state.weekdaysShortNames[dayIndex];
        },
        events(state) {
            const events = [];

            for (let i = 0; i < state.reservedDates.length; i++) {
                events.push({
                    name: 'reserved',
                    class: 'reserved-date',
                    start: '2022-04-22 10:00:00',
                    end: '2022-04-22 10:00:00',
                    color: 'grey',
                })
            }

            return events;
        },
    }
}

export default Calendar;

import axios from "axios";

const Calendar = {
    namespaced: true,
    state: () => ({
        selectedDateColor: 'grey',
        selectedDate: null,
        weekdaysFormat: [1, 2, 3, 4, 5, 6, 0],
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
    },
    actions: {
        async fetchReservedDates({commit}) {
            console.log('fetching reserved date')

            try {
                const response = await axios.get('https://interviewtest.free.beeceptor.com/calendar/reserved_dates')
                commit('updateReservedDates', response.data)
            } catch (e) {
                if (e.response.status === 429) {
                    const dates = [
                        '2022-04-20'
                    ]
                    commit('updateReservedDates', dates)
                }
            }
        },
        async fetchBlockedDates({commit}) {
            console.log('fetching blocked date')

            try {
                const response = await axios.get('https://interviewtest.free.beeceptor.com/calendar/blocked_dates')
                commit('updateBlockedDates', response.data)
            } catch (e) {
                if (e.response.status === 429) {
                    const dates = [
                        '2022-04-15',
                        '2022-04-16',
                        '2022-04-17',
                    ]
                    commit('updateBlockedDates', dates)
                }
            }
        }
    },
    getters: {
        events(state) {
            const events = [];

            for (let  i = 0; i < state.reservedDates.length; i++) {
                events.push({
                    name: 'reserved',
                    class: 'reserved-date',
                    start: '2022-04-22 10:00:00',
                    end: '2022-04-22 10:00:00',
                    color: 'grey',
                })
            }

            return events;
        }
    }
}

export default Calendar;

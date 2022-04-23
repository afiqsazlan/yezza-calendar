<template>
  <v-container class="px-0 pt-0">
    <v-container class=" px-8 pt-10 grey lighten-3">

      <v-row class="align-center justify-space-between pb-8">
        <h1>
          Calendar
        </h1>
        <v-icon>mdi-cog-outline</v-icon>
      </v-row>

      <Calendar></Calendar>
    </v-container>
    <v-container class="px-10">
      <v-list>
        <template v-for="(item,index) in items">

          <v-list-item-group :key="index">
            <v-list-item class="px-0">
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold" v-text="item.name"></v-list-item-title>
              </v-list-item-content>
              <v-list-item-action>
                <v-list-item-action-text>
                  {{ item.isPaid ? 'Paid' : 'Unpaid' }}
                </v-list-item-action-text>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
          <v-divider :key="index"
          ></v-divider>
        </template>

      </v-list>
    </v-container>
  </v-container>


</template>

<script>
import AppLayout from "@/layout/AppLayout";
import Calendar from "@/components/Calendar";

export default {
  name: "CalendarView",
  data() {
    return {
      items: [
        {
          id: 1,
          name: 'Nestle - Milo',
          isPaid: false
        },
        {
          id: 2,
          name: 'Godiva Chocolatier',
          isPaid: false
        }
      ]
    }
  },
  components: {Calendar, AppLayout}
}
</script>

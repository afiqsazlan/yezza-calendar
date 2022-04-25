<template>
  <v-bottom-navigation v-model="value"
                       grow
                       id="bottom-nav"
                       class="elevation-0 light px-2"
  >
    <v-btn v-for="link in links"
           :key="link.label"
           v-on:click.prevent="goTo(link.route)"
           text
           :value="link.label"
           class="fill-height pt-5"
    >
      <span class="bottom-nav-menu-label pt-1">
         {{ link.label }}
      </span>

      <v-icon>${{ link.iconName }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>

export default {
  name: "BottomNav",
  data() {
    return {
      svg: require('@/assets/logo.svg'),
      value: 'Home',
      links: [
        {
          label: 'Home',
          route: '/',
          iconName: 'navHome'
        },
        {
          label: 'Calendar',
          route: '/calendar',
          iconName: 'navCalendar'
        },
        {
          label: 'Request',
          route: null,
          iconName: 'navRequest'
        },
        {
          label: 'Client',
          route: null,
          iconName: 'navClient'
        },
        {
          label: 'Menu',
          route: null,
          iconName: 'navMenu'
        },
      ]
    }
  },
  methods: {
    goTo(route) {

      if (this.$router.currentRoute.fullPath === route) return;

      this.$router.push(route).catch(failure => {
        console.log('Unable to navigate there.')
      })
    },
  }
}
</script>

<style scoped>
#bottom-nav {
  border-top: 1px solid #F4F4F4;
}

.bottom-nav-menu-label {
  font-size: 9px;
}
</style>
